import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { CreateContactSubmissionBody } from "@workspace/api-zod";
import { notifyContact, sendContactConfirmationToClient } from "../lib/notifications";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = CreateContactSubmissionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(contactSubmissionsTable)
    .values(parsed.data)
    .returning();
  req.log.info({ id: row.id }, "Contact submission saved");
  notifyContact({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    service: parsed.data.service,
    message: parsed.data.message,
  });
  sendContactConfirmationToClient({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    service: parsed.data.service,
  });
  res.status(201).json({ id: row.id, ok: true });
});

export default router;
