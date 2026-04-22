import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { desc, eq } from "drizzle-orm";
import {
  db,
  contactSubmissionsTable,
  enrollmentSubmissionsTable,
  testimonialsTable,
} from "@workspace/db";

const router: IRouter = Router();

function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) {
    res.status(500).json({ error: "Admin not configured" });
    return;
  }
  const provided = req.header("X-Admin-Password");
  if (provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.post("/admin/login", (req, res): void => {
  const expected = process.env["ADMIN_PASSWORD"];
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!expected || password !== expected) {
    res.status(401).json({ ok: false });
    return;
  }
  res.json({ ok: true });
});

router.get("/admin/submissions", adminAuth, async (_req, res): Promise<void> => {
  const [contacts, enrollments, testimonials] = await Promise.all([
    db.select().from(contactSubmissionsTable).orderBy(desc(contactSubmissionsTable.createdAt)),
    db.select().from(enrollmentSubmissionsTable).orderBy(desc(enrollmentSubmissionsTable.createdAt)),
    db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt)),
  ]);
  res.json({ contacts, enrollments, testimonials });
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

export default router;
