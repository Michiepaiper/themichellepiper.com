import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    slotStart: timestamp("slot_start", { withTimezone: true }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slotStartUnique: uniqueIndex("bookings_slot_start_unique").on(t.slotStart),
  }),
);

export type Booking = typeof bookingsTable.$inferSelect;
