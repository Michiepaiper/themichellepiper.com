import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const email = parsed.data.email.trim().toLowerCase();
  try {
    const [row] = await db
      .insert(newsletterSubscribersTable)
      .values({ email })
      .onConflictDoNothing({ target: newsletterSubscribersTable.email })
      .returning();
    if (row) {
      res.status(201).json({ id: row.id, ok: true });
      return;
    }
    res.status(201).json({ id: 0, ok: true });
  } catch (err) {
    req.log.error({ err }, "newsletter subscribe failed");
    res.status(500).json({ error: "Could not subscribe" });
  }
});

export default router;
