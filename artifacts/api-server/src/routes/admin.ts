import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { desc, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { logger } from "../lib/logger";
import {
  db,
  contactSubmissionsTable,
  enrollmentSubmissionsTable,
  testimonialsTable,
  newsletterSubscribersTable,
  bookingsTable,
} from "@workspace/db";

const router: IRouter = Router();

function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

// In-process lockout state: tracks per-IP failed attempts with exponential backoff.
// State is lost on restart (acceptable — provides defence-in-depth on top of the
// express-rate-limit sliding window which survives across the request lifecycle).
interface LockoutEntry {
  failures: number;
  lockedUntil: number; // unix ms, 0 = not locked
}

const loginAttempts = new Map<string, LockoutEntry>();

const MAX_FAILURES_BEFORE_LOCKOUT = 3;
const BASE_LOCKOUT_MS = 30_000; // 30 s for first lockout
const MAX_LOCKOUT_MS = 30 * 60_000; // 30 min ceiling

function getClientIp(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? "unknown";
}

function getLockoutEntry(ip: string): LockoutEntry {
  let entry = loginAttempts.get(ip);
  if (!entry) {
    entry = { failures: 0, lockedUntil: 0 };
    loginAttempts.set(ip, entry);
  }
  return entry;
}

function recordFailure(ip: string): { lockedUntil: number } {
  const entry = getLockoutEntry(ip);
  entry.failures += 1;
  if (entry.failures >= MAX_FAILURES_BEFORE_LOCKOUT) {
    const tier = entry.failures - MAX_FAILURES_BEFORE_LOCKOUT;
    const lockMs = Math.min(BASE_LOCKOUT_MS * Math.pow(2, tier), MAX_LOCKOUT_MS);
    entry.lockedUntil = Date.now() + lockMs;
  }
  return { lockedUntil: entry.lockedUntil };
}

function recordSuccess(ip: string): void {
  loginAttempts.delete(ip);
}

function checkLockout(ip: string): { locked: boolean; retryAfterSec: number } {
  const entry = loginAttempts.get(ip);
  if (!entry || entry.lockedUntil === 0) return { locked: false, retryAfterSec: 0 };
  const remaining = entry.lockedUntil - Date.now();
  if (remaining <= 0) return { locked: false, retryAfterSec: 0 };
  return { locked: true, retryAfterSec: Math.ceil(remaining / 1000) };
}

function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const secret = getJwtSecret();
    jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

router.post("/admin/login", (req, res): void => {
  const ip = getClientIp(req);

  const lockout = checkLockout(ip);
  if (lockout.locked) {
    logger.warn({ ip, retryAfterSec: lockout.retryAfterSec }, "admin login blocked — lockout active");
    res.setHeader("Retry-After", String(lockout.retryAfterSec));
    res.status(429).json({ error: `Too many failed attempts. Try again in ${lockout.retryAfterSec}s.` });
    return;
  }

  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) {
    res.status(500).json({ error: "Admin not configured" });
    return;
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (password !== expected) {
    const { lockedUntil } = recordFailure(ip);
    const entry = getLockoutEntry(ip);
    logger.warn({ ip, failures: entry.failures, lockedUntil }, "admin login failed");
    if (lockedUntil > Date.now()) {
      const retryAfterSec = Math.ceil((lockedUntil - Date.now()) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      res.status(429).json({ error: `Too many failed attempts. Try again in ${retryAfterSec}s.` });
    } else {
      res.status(401).json({ ok: false });
    }
    return;
  }

  try {
    const secret = getJwtSecret();
    const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "8h" });
    recordSuccess(ip);
    logger.info({ ip }, "admin login succeeded");
    res.json({ ok: true, token });
  } catch {
    res.status(500).json({ error: "Could not issue session token" });
  }
});

router.get("/admin/submissions", adminAuth, async (_req, res): Promise<void> => {
  const [contacts, enrollments, testimonials, subscribers, bookings] = await Promise.all([
    db.select().from(contactSubmissionsTable).orderBy(desc(contactSubmissionsTable.createdAt)),
    db.select().from(enrollmentSubmissionsTable).orderBy(desc(enrollmentSubmissionsTable.createdAt)),
    db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt)),
    db.select().from(newsletterSubscribersTable).orderBy(desc(newsletterSubscribersTable.createdAt)),
    db.select().from(bookingsTable).orderBy(desc(bookingsTable.slotStart)),
  ]);
  res.json({ contacts, enrollments, testimonials, subscribers, bookings });
});

router.patch("/admin/testimonials/:id/approve", adminAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw ?? "", 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const site = typeof req.body?.site === "string" ? req.body.site : null;
  const validSites = ["main", "recruitment", "both"];
  if (site && !validSites.includes(site)) {
    res.status(400).json({ error: "site must be 'main', 'recruitment', or 'both'" });
    return;
  }
  const [updated] = await db
    .update(testimonialsTable)
    .set({ approved: true, ...(site ? { site } : {}) })
    .where(eq(testimonialsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});

router.delete("/admin/testimonials/:id", adminAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw ?? "", 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deleted] = await db
    .delete(testimonialsTable)
    .where(eq(testimonialsTable.id, id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.sendStatus(204);
});

router.delete("/admin/bookings/:id", adminAuth, async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw ?? "", 10);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deleted] = await db
    .delete(bookingsTable)
    .where(eq(bookingsTable.id, id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
