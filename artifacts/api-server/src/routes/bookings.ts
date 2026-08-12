import { Router, type IRouter } from "express";
import { and, gte, isNull, lt, eq } from "drizzle-orm";
import { randomBytes } from "crypto";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import {
  notifyBookingMichelle,
  sendBookingConfirmationToClient,
  sendBookingVerificationEmail,
} from "../lib/notifications";

const router: IRouter = Router();

const SLOT_MINUTES = 15;
const MIN_LEAD_MINUTES = 60;
const MAX_DAYS_AHEAD = 30;
const UNVERIFIED_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

// Business hours: Monday–Friday, 09:00–17:00 Central Time (America/Chicago)
const BUSINESS_TZ = "America/Chicago";
const BUSINESS_HOUR_START = 9;
const BUSINESS_HOUR_END = 17;

function isWithinBusinessHours(date: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TZ,
    hour: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find(p => p.type === "hour")?.value ?? -1);
  const weekday = parts.find(p => p.type === "weekday")?.value ?? "";
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  return isWeekday && hour >= BUSINESS_HOUR_START && hour < BUSINESS_HOUR_END;
}

router.get("/bookings/taken", async (_req, res): Promise<void> => {
  const now = new Date();
  const expiryCutoff = new Date(Date.now() - UNVERIFIED_EXPIRY_MS);

  // Purge expired unverified holds so their slots are freed before responding.
  await db
    .delete(bookingsTable)
    .where(and(isNull(bookingsTable.verifiedAt), lt(bookingsTable.createdAt, expiryCutoff)));

  // Return verified bookings plus unverified bookings still within their hold window.
  // Expired unverified holds have been deleted above so they won't appear.
  const rows = await db
    .select({ slotStart: bookingsTable.slotStart })
    .from(bookingsTable)
    .where(gte(bookingsTable.slotStart, now));

  res.json(rows.map((r) => r.slotStart.toISOString()));
});

router.post("/bookings", async (req, res): Promise<void> => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const slotStart = new Date(parsed.data.slotStart);
  if (Number.isNaN(slotStart.getTime())) {
    res.status(400).json({ error: "Invalid slotStart" });
    return;
  }
  if (slotStart.getUTCMinutes() % SLOT_MINUTES !== 0 || slotStart.getUTCSeconds() !== 0) {
    res.status(400).json({ error: "Slot must align to a 15-minute boundary" });
    return;
  }
  const earliest = new Date(Date.now() + MIN_LEAD_MINUTES * 60_000);
  if (slotStart < earliest) {
    res.status(400).json({ error: "Slot is too soon — please pick at least 1 hour ahead" });
    return;
  }
  const latest = new Date(Date.now() + MAX_DAYS_AHEAD * 86_400_000);
  if (slotStart > latest) {
    res.status(400).json({ error: "Slot is too far ahead" });
    return;
  }
  if (!isWithinBusinessHours(slotStart)) {
    res.status(400).json({ error: "Slot must be on a weekday between 09:00 and 17:00 WAT" });
    return;
  }

  try {
    // Free any expired unverified bookings so their slots can be claimed again.
    const expiryCutoff = new Date(Date.now() - UNVERIFIED_EXPIRY_MS);
    await db
      .delete(bookingsTable)
      .where(and(isNull(bookingsTable.verifiedAt), lt(bookingsTable.createdAt, expiryCutoff)));

    const verificationToken = randomBytes(32).toString("hex");

    const [row] = await db
      .insert(bookingsTable)
      .values({
        fullName: parsed.data.fullName.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        phone: parsed.data.phone.trim(),
        slotStart,
        notes: parsed.data.notes?.trim() ?? null,
        verificationToken,
        verifiedAt: null,
      })
      .returning();

    // Only send a verification email — no confirmation or Michelle notification yet.
    // Both will fire once the owner proves they control this inbox.
    sendBookingVerificationEmail({
      fullName: row.fullName,
      email: row.email,
      slotStart: row.slotStart,
      verificationToken,
    });

    res.status(201).json({
      id: row.id,
      slotStart: row.slotStart.toISOString(),
      message:
        "A confirmation link has been sent to your email address. Please click it to finalise your booking.",
    });
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "23505") {
      res.status(409).json({ error: "That slot was just taken — please pick another." });
      return;
    }
    req.log.error({ err }, "booking failed");
    res.status(500).json({ error: "Could not save booking" });
  }
});

router.get("/bookings/verify/:token", async (req, res): Promise<void> => {
  const token = typeof req.params.token === "string" ? req.params.token : "";
  if (!token || !/^[0-9a-f]{64}$/.test(token)) {
    res.status(400).json({ error: "Invalid verification token" });
    return;
  }

  const [booking] = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.verificationToken, token))
    .limit(1);

  if (!booking) {
    res.status(404).json({ error: "Booking not found or link has expired" });
    return;
  }

  if (booking.verifiedAt !== null) {
    res.json({ message: "Your booking is already confirmed. See you then!" });
    return;
  }

  // Check the unverified booking has not expired.
  const expiryCutoff = new Date(Date.now() - UNVERIFIED_EXPIRY_MS);
  if (booking.createdAt < expiryCutoff) {
    await db.delete(bookingsTable).where(eq(bookingsTable.id, booking.id));
    res
      .status(410)
      .json({ error: "This verification link has expired. Please book again." });
    return;
  }

  const [verified] = await db
    .update(bookingsTable)
    .set({ verifiedAt: new Date() })
    .where(eq(bookingsTable.id, booking.id))
    .returning();

  if (!verified) {
    res.status(500).json({ error: "Could not confirm booking" });
    return;
  }

  // Now that email ownership is confirmed, fire both notifications.
  notifyBookingMichelle({
    fullName: verified.fullName,
    email: verified.email,
    phone: verified.phone,
    slotStart: verified.slotStart,
    notes: verified.notes,
  });
  sendBookingConfirmationToClient({
    fullName: verified.fullName,
    email: verified.email,
    slotStart: verified.slotStart,
  });

  res.json({
    message: "Your booking is confirmed! Check your inbox for the full details.",
    slotStart: verified.slotStart.toISOString(),
  });
});

export default router;
