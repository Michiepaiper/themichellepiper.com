import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  text: text("text").notNull(),
  approved: boolean("approved").notNull().default(false),
  site: text("site"), // "main" | "recruitment" | "both" | null (pending)
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Testimonial = typeof testimonialsTable.$inferSelect;
