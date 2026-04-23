import { Router, type IRouter } from "express";
import { gte } from "drizzle-orm";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import { notifyBookingMichelle, sendBookingConfirmationToClient } from "../lib/notifications";

const router: IRouter = Router();

const SLOT_MINUTES = 15;
const MIN_LEAD_MINUTES = 60;
const MAX_DAYS_AHEAD = 30;

router.get("/bookings/taken", async (_req, res): Promise<void> => {
  const now = new Date();
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

  try {
    const [row] = await db
      .insert(bookingsTable)
      .values({
        fullName: parsed.data.fullName.trim(),
        email: parsed.data.email.trim().toLowerCase(),
        phone: parsed.data.phone.trim(),
        slotStart,
        notes: parsed.data.notes?.trim() ?? null,
      })
      .returning();

    notifyBookingMichelle({
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      slotStart: row.slotStart,
      notes: row.notes,
    });
    sendBookingConfirmationToClient({
      fullName: row.fullName,
      email: row.email,
      slotStart: row.slotStart,
    });

    res.status(201).json({ id: row.id, slotStart: row.slotStart.toISOString() });
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

export default router;
