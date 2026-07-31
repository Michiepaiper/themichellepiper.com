import { Router, type IRouter } from "express";
import { desc, eq, and, or } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import { CreateTestimonialBody } from "@workspace/api-zod";
import { notifyTestimonial } from "../lib/notifications";

const router: IRouter = Router();

router.get("/testimonials", async (req, res): Promise<void> => {
  const site = typeof req.query.site === "string" ? req.query.site : null;

  let whereClause;
  if (site === "main") {
    whereClause = and(
      eq(testimonialsTable.approved, true),
      or(eq(testimonialsTable.site, "main"), eq(testimonialsTable.site, "both")),
    );
  } else if (site === "recruitment") {
    whereClause = and(
      eq(testimonialsTable.approved, true),
      or(eq(testimonialsTable.site, "recruitment"), eq(testimonialsTable.site, "both")),
    );
  } else {
    whereClause = eq(testimonialsTable.approved, true);
  }

  const rows = await db
    .select({
      id: testimonialsTable.id,
      name: testimonialsTable.name,
      role: testimonialsTable.role,
      text: testimonialsTable.text,
      createdAt: testimonialsTable.createdAt,
    })
    .from(testimonialsTable)
    .where(whereClause)
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
    .values({ ...parsed.data, approved: false })
    .returning();
  req.log.info({ id: row.id }, "Testimonial submitted");
  notifyTestimonial({ name: row.name, role: row.role, text: row.text });
  res.status(201).json({
    id: row.id,
    name: row.name,
    role: row.role,
    text: row.text,
    createdAt: row.createdAt,
  });
});

export default router;
