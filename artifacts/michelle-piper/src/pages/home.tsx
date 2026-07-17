import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/booking-dialog";
import heroImg from "@assets/a37a6281-35c5-43d1-afc8-d5b75f66a5c2_Original_1776848512649.jpeg";
import { ArrowRight, Star } from "lucide-react";
import { useListTestimonials } from "@workspace/api-client-react";

const fade = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

const PILLARS = [
  {
    label: "Communication Coaching",
    desc: "Develop the clarity, confidence, and presence to express yourself powerfully in any room.",
    href: "/services",
  },
  {
    label: "Public Speaking Training",
    desc: "From nervous beginner to commanding speaker — structured coaching that transforms how you show up.",
    href: "/speaking",
  },
  {
    label: "Digital Skills & Tech",
    desc: "Full-stack development, AI tools, and digital literacy programmes that prepare you for the modern world.",
    href: "/trainings",
  },
  {
    label: "Career Accelerator",
    desc: "Practical mentorship and career development for ambitious professionals ready to grow globally.",
    href: "/trainings",
  },
];

const STATS = [
  { n: "500+", label: "Lives Transformed" },
  { n: "10+", label: "Years of Experience" },
  { n: "3", label: "Core Disciplines" },
  { n: "Global", label: "Reach & Impact" },
];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: testimonials = [] } = useListTestimonials();

  return (
    <Layout>
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />

      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-end pb-20 md:items-center md:pb-0">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Michelle Piper"
            className="w-full h-full object-cover object-top md:object-[60%_15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-10 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs font-semibold mb-6">
              The Michelle Piper
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.04] mb-7 text-white">
              Empowering<br />
              Communication,<br />
              <span className="italic" style={{ color: "hsl(43 65% 55%)" }}>Confidence &</span><br />
              <span className="italic" style={{ color: "hsl(43 65% 55%)" }}>Digital Skills.</span>
            </h1>
            <p className="text-lg text-white/75 mb-10 leading-relaxed max-w-lg font-light">
              Communication coach, public speaking trainer, full-stack developer, and creative professional — dedicated to helping you speak powerfully, think clearly, and grow in the digital age.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/trainings">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 font-serif tracking-wide text-base"
                >
                  Explore Trainings
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-10 py-6 bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white font-serif tracking-wide text-base"
                onClick={() => setBookingOpen(true)}
              >
                Book a Free Call
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
        >
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-foreground text-white border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="py-10 px-8 text-center"
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">{s.n}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I DO ── */}
      <section className="py-28 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 max-w-xl">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">What I Do</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Four pillars.<br />One transformation.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="bg-background p-10 hover:bg-muted/30 transition-colors group"
              >
                <div className="text-primary font-mono text-xs tracking-widest mb-5">0{i + 1}</div>
                <h3 className="font-serif text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{p.label}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
                <Link href={p.href} className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="py-28 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Client Voices</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">What clients say.</h2>
              </motion.div>
              <Link href="/testimonials" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all shrink-0">
                Read all stories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {testimonials.slice(0, 4).map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  className="bg-background p-10 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-lg italic text-foreground/80 leading-relaxed mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-primary/50" />
                    <div>
                      <p className="font-bold text-sm tracking-wide">{t.name}</p>
                      <p className="text-primary text-xs uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MISSION QUOTE ── */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-8">The Mission</p>
            <blockquote className="font-serif text-3xl md:text-5xl font-bold leading-[1.15] text-white/90 mb-10">
              "Every person deserves to be heard. My job is to make sure you are."
            </blockquote>
            <p className="text-white/50 tracking-widest uppercase text-xs">— Michelle Piper</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA SPLIT ── */}
      <section className="grid md:grid-cols-2 border-t border-border">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="p-14 md:p-20 bg-background border-b md:border-b-0 md:border-r border-border flex flex-col justify-between gap-10"
        >
          <div>
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Ready to Grow?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight">Start with a free 1-to-1 call.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Not sure where to begin? A 30-minute call with Michelle is the best first step — no pressure, no obligation. Just clarity.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 font-serif tracking-wide text-base w-fit"
            onClick={() => setBookingOpen(true)}
          >
            Book a Free Call
          </Button>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-14 md:p-20 bg-foreground text-white flex flex-col justify-between gap-10"
        >
          <div>
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Looking to Hire?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-5 leading-tight text-white">
              The Michelle Piper Recruitment
            </h2>
            <p className="text-white/60 leading-relaxed">
              We help businesses across the USA, UK, Australia, UAE, and beyond hire exceptional Virtual Assistants and remote professionals from Africa's best talent.
            </p>
          </div>
          <a href="/recruitment/">
            <Button
              size="lg"
              variant="outline"
              className="rounded-none border-white/30 text-white hover:bg-white/10 hover:border-white px-10 py-6 font-serif tracking-wide text-base w-fit"
            >
              Visit Recruitment Site ↗
            </Button>
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}
