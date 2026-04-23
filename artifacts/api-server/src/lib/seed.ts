import { db, testimonialsTable } from "@workspace/db";
import { logger } from "./logger";

const SEED_TESTIMONIALS = [
  {
    name: "Adaeze O.",
    role: "Corporate Executive",
    text: "Michelle's elocution coaching completely changed how I present in board meetings. I speak with a clarity and confidence I never knew I had.",
    approved: true,
  },
  {
    name: "Tunde A.",
    role: "Startup Founder",
    text: "The public speaking mastery course helped me pitch to investors without the crippling stage fright. It's truly transformational work.",
    approved: true,
  },
  {
    name: "Chiamaka E.",
    role: "Frontend Developer",
    text: "Learning frontend from Michelle was incredible. She breaks down complex concepts effortlessly, and now I build sites I'm actually proud of.",
    approved: true,
  },
  {
    name: "David M.",
    role: "Event Organizer",
    text: "We booked Michelle for our annual summit and she commanded the room brilliantly. Engaging, articulate, and deeply inspiring.",
    approved: true,
  },
  {
    name: "Ohis King",
    role: "MD, Quare Global",
    text: "Working with Michelle was Life Changing. She has an impressive work ethics and is overly detailed yet patient to a fault.",
    approved: true,
  },
];

export async function seedTestimonialsIfEmpty(): Promise<void> {
  try {
    const existing = await db.select({ id: testimonialsTable.id }).from(testimonialsTable).limit(1);
    if (existing.length > 0) return;
    await db.insert(testimonialsTable).values(SEED_TESTIMONIALS);
    logger.info({ count: SEED_TESTIMONIALS.length }, "Seeded testimonials");
  } catch (err) {
    logger.error({ err }, "Failed to seed testimonials");
  }
}
