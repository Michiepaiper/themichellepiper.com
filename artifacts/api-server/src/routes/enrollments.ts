import { Router, type IRouter } from "express";
import { db, enrollmentSubmissionsTable } from "@workspace/db";
import { CreateEnrollmentBody } from "@workspace/api-zod";
import { notifyEnrollment } from "../lib/notifications";

const router: IRouter = Router();

router.post("/enrollments", async (req, res): Promise<void> => {
  const parsed = CreateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(enrollmentSubmissionsTable)
    .values(parsed.data)
    .returning();
  req.log.info({ id: row.id }, "Enrollment saved");
  notifyEnrollment({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    course: parsed.data.course,
  });
  res.status(201).json({ id: row.id, ok: true });
});

export default router;
