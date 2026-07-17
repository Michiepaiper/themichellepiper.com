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
  {
    name: "Ngozi F.",
    role: "HR Manager",
    text: "Michelle's confidence coaching gave me the courage to step into leadership. Within three months of working with her I was promoted to Head of HR. The impact has been extraordinary.",
    approved: true,
  },
  {
    name: "Emeka T.",
    role: "Medical Doctor",
    text: "As a doctor, communicating complex information clearly is critical. Michelle's sessions completely transformed how I speak to patients and present at medical conferences.",
    approved: true,
  },
  {
    name: "Sola B.",
    role: "Content Creator",
    text: "I was terrified of being on camera. Michelle worked with me week by week until presenting felt natural. My YouTube channel has grown by 200% since I started applying her techniques.",
    approved: true,
  },
  {
    name: "Kemi A.",
    role: "Brand Strategist",
    text: "The digital skills training was exactly what I needed to pivot my career. Michelle explains technology in a way that actually makes sense, and she follows through until you truly get it.",
    approved: true,
  },
  {
    name: "Chukwudi P.",
    role: "Business Development Manager",
    text: "I've attended many public speaking courses before — nothing compares to what Michelle delivers. She identifies your specific weaknesses and builds a personalised plan around them. Remarkable.",
    approved: true,
  },
  {
    name: "Dr. Peter",
    role: "Medical Professional",
    text: "Michelle's communication coaching transformed how I speak with patients and present research at conferences. Her ability to identify exactly where your communication breaks down — and fix it — is nothing short of remarkable.",
    approved: true,
  },
  {
    name: "Derrick",
    role: "Sales Executive",
    text: "I came to Michelle struggling with presenting in front of large groups. After just a few sessions, I delivered the best presentation of my career. She has a gift for bringing out confidence you didn't know you had.",
    approved: true,
  },
  {
    name: "Rex",
    role: "Entrepreneur",
    text: "Working with Michelle on my public speaking and digital presence completely changed how I show up professionally. The clarity she gives you — both in speech and strategy — is invaluable. I recommend her without reservation.",
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
