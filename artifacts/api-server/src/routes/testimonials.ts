import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import { CreateTestimonialBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: testimonialsTable.id,
      name: testimonialsTable.name,
      role: testimonialsTable.role,
      text: testimonialsTable.text,
      createdAt: testimonialsTable.createdAt,
    })
    .from(testimonialsTable)
    .where(eq(testimonialsTable.approved, true))
    .orderBy(desc(testimonialsTable.createdAt));
  res.json(rows);
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = CreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(testimonialsTable)
    .values({ ...parsed.data, approved: true })
    .returning();
  req.log.info({ id: row.id }, "Testimonial submitted");
  res.status(201).json({
    id: row.id,
    name: row.name,
    role: row.role,
    text: row.text,
    createdAt: row.createdAt,
  });
});

export default router;
