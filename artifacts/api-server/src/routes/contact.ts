import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { CreateContactSubmissionBody } from "@workspace/api-zod";

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
  res.status(201).json({ id: row.id, ok: true });
});

export default router;
