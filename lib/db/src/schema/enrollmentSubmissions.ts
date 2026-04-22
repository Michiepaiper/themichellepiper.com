import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const enrollmentSubmissionsTable = pgTable("enrollment_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  course: text("course").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type EnrollmentSubmission = typeof enrollmentSubmissionsTable.$inferSelect;
