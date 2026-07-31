import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useListTestimonials, useCreateTestimonial } from "@workspace/api-client-react";

import michelleImg from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_(2)_1784237988819.jpeg";
import michelle2Img from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_1784239737873.jpeg";
import michelle3Img from "@assets/a37a6281-35c5-43d1-afc8-d5b75f66a5c2_Original_1776848512649.jpeg";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const CATCHPHRASES = [
  "Precision Recruitment.",
  "Global-Ready Talent.",
  "The Highest Standard.",
  "Performance, Delivered.",
  "Excellence, Every Time.",
];

function MarqueeTicker({ phrases }: { phrases: string[] }) {
  const items = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: "hsl(43 65% 55% / 0.18)", background: "hsl(43 65% 55% / 0.03)" }}>
      <style>{`@keyframes mp-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      <div className="flex whitespace-nowrap" style={{ animation: "mp-marquee 22s linear infinite" }}>
        {items.map((phrase, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] shrink-0" style={{ color: "hsl(43 65% 55%)" }}>
            {phrase}
            <span className="opacity-35 text-base leading-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function RotatingText({ phrases, className }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % phrases.length), 2600);
    return () => clearInterval(t);
  }, [phrases.length]);
  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`} style={{ minHeight: "1.4em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          className="block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const STATS = [
  { n: "6", label: "African Countries" },
  { n: "10", label: "Global Markets Served" },
  { n: "100%", label: "Remote Talent" },
  { n: "1:1", label: "Dedicated Support" },
];

const WHY_ITEMS = [
  { title: "Structured Recruitment", desc: "A proven methodology designed to reduce hiring risk and improve long-term placement success." },
  { title: "Exceptional Remote Talent", desc: "Virtual Assistants, Executive Assistants, Customer Support — all meeting our rigorous quality standards." },
  { title: "Transparent Communication", desc: "You'll always know where you are in the process and exactly what happens next." },
  { title: "AI-Ready Professionals", desc: "We assess digital literacy and AI readiness as standard. Modern businesses need modern professionals." },
  { title: "Long-Term Partnerships", desc: "We don't make placements and move on. We become your trusted remote talent partner." },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "We learn your business, goals, culture, and operational needs." },
  { n: "02", title: "Define", desc: "We identify exactly what's needed for long-term success — not just today's vacancy." },
  { n: "03", title: "Assess", desc: "Candidates are evaluated using the Michelle Piper Talent Standard." },
  { n: "04", title: "Match", desc: "We present a curated shortlist aligned with your business objectives." },
  { n: "05", title: "Support", desc: "We remain involved beyond placement — because success doesn't end at an offer." },
];

const ROLES = [
  { title: "Virtual Assistants", desc: "Reliable administrative support that helps founders and growing businesses reclaim valuable time." },
  { title: "Executive Assistants", desc: "Strategic support for executives, business owners, and leadership teams." },
  { title: "Customer Support Specialists", desc: "Exceptional customer experiences across email, live chat, and phone." },
  { title: "Marketing Assistants", desc: "Digital marketing, content creation, email campaigns, and social media." },
  { title: "Sales Support Professionals", desc: "Lead generation, appointment setting, CRM management, and sales administration." },
  { title: "Operations Coordinators", desc: "Keep projects moving, improve processes, and strengthen day-to-day operations." },
];

const FAQS = [
  { q: "Why use a recruitment agency instead of hiring myself?", a: "Working with a specialist agency saves time, reduces hiring risk, and gives you access to pre-screened professionals assessed for communication, technical ability, professionalism, and remote work readiness." },
  { q: "Which countries do you recruit from?", a: "We recruit exceptional remote professionals from Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda for employers based in the United States, United Kingdom, Australia, Canada, France, UAE, Ireland, New Zealand, Netherlands, and Germany." },
  { q: "What roles do you recruit?", a: "Virtual Assistants, Executive Assistants, Customer Support Specialists, Marketing Assistants, Operations Coordinators, Sales Support Professionals, and other remote business support roles." },
  { q: "How do you assess candidates?", a: "Every candidate is assessed using our proprietary frameworks: the Michelle Piper Talent Standard, The Michelle Piper Approach, and Michelle Piper Readiness Index." },
  { q: "How long does recruitment take?", a: "Every role is different. During your consultation we'll provide realistic timelines based on your requirements and keep you informed throughout." },
];

const FALLBACK_TESTIMONIALS = [
  {
    text: "The Michelle Piper found us a Virtual Assistant who transformed our operations within the first month. The structured process gave us complete confidence from the very beginning.",
    name: "Sarah Mitchell",
    role: "CEO, TechStart · United Kingdom",
  },
  {
    text: "I was sceptical about remote hiring until I worked with The Michelle Piper. Our Executive Assistant from Nigeria is exceptional — professional, proactive, and completely AI-ready.",
    name: "James Okafor",
    role: "Founder, Apex Digital · United States",
  },
  {
    text: "Three placements in 18 months and every single one has worked out brilliantly. The quality of screening is unlike anything we have experienced with other agencies.",
    name: "Priya Naidoo",
    role: "Operations Manager, GrowthLab · Australia",
  },
  {
    text: "We spent months trying to hire independently with no success. The Michelle Piper did it properly in weeks. The difference was night and day.",
    name: "David Chen",
    role: "Managing Director, Horizon Ventures · France",
  },
];

function ReviewDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", role: "", reviewerType: "client", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateTestimonial();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      { name: form.name, role: form.role || (form.reviewerType === "client" ? "Client" : "Candidate"), text: form.text },
      {
        onSuccess: () => setSubmitted(true),
      }
    );
  }

  function handleClose() {
    setSubmitted(false);
    setForm({ name: "", role: "", reviewerType: "client", text: "" });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[hsl(40_28%_96%)] text-[hsl(0_0%_8%)] border-[hsl(40_20%_86%)] max-w-lg">
        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: "hsl(43 65% 38%)" }} />
            <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "hsl(0 0% 8%)" }}>Thank You</h3>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(0 0% 38%)" }}>
              Your review has been received and will appear on the site after a brief review. We appreciate you sharing your experience.
            </p>
            <Button onClick={handleClose} className="mt-6 btn-gold text-[hsl(0_0%_4%)] font-medium px-8">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl" style={{ color: "hsl(0 0% 8%)" }}>Share Your Experience</DialogTitle>
              <DialogDescription style={{ color: "hsl(0 0% 38%)" }}>
                Whether you hired through us or were placed by us — we'd love to hear from you.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, reviewerType: "client" }))}
                  className={`py-2.5 px-4 text-sm font-medium border transition-colors ${form.reviewerType === "client" ? "border-[hsl(43_65%_38%)] text-[hsl(43_65%_30%)] bg-[hsl(43_65%_48%_/_0.1)]" : "border-[hsl(40_20%_80%)] text-[hsl(0_0%_40%)]"}`}
                >
                  I'm a Client
                </button>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, reviewerType: "candidate" }))}
                  className={`py-2.5 px-4 text-sm font-medium border transition-colors ${form.reviewerType === "candidate" ? "border-[hsl(43_65%_38%)] text-[hsl(43_65%_30%)] bg-[hsl(43_65%_48%_/_0.1)]" : "border-[hsl(40_20%_80%)] text-[hsl(0_0%_40%)]"}`}
                >
                  I'm a Candidate
                </button>
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest font-medium mb-2 block" style={{ color: "hsl(0 0% 30%)" }}>Full Name *</Label>
                <Input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-[hsl(43_65%_48%)]"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest font-medium mb-2 block" style={{ color: "hsl(0 0% 30%)" }}>
                  {form.reviewerType === "client" ? "Title & Company" : "Role / Profession"}
                </Label>
                <Input
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  placeholder={form.reviewerType === "client" ? "e.g. CEO, Acme Ltd · UK" : "e.g. Executive Assistant · Nigeria"}
                  className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-[hsl(43_65%_48%)]"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest font-medium mb-2 block" style={{ color: "hsl(0 0% 30%)" }}>Your Review *</Label>
                <Textarea
                  required
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  placeholder="Tell us about your experience working with The Michelle Piper…"
                  rows={4}
                  className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-[hsl(43_65%_48%)] resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full btn-gold text-[hsl(0_0%_4%)] font-medium py-5 tracking-wide"
              >
                {mutation.isPending ? "Submitting…" : "Submit Review"}
              </Button>
              <p className="text-xs text-center" style={{ color: "hsl(0 0% 45%)" }}>
                Reviews are moderated and published within 1–2 business days.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function TestimonialsSection() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const { data: liveTestimonials } = useListTestimonials();

  // Only show testimonials tagged as recruitment reviews (submitted via this site).
  // Reviews from the main site (coaching, training, speaking) are filtered out.
  const recruitmentReviews = liveTestimonials?.filter(t =>
    t.role?.toLowerCase().includes("recruit") ||
    t.role?.toLowerCase().includes("client") ||
    t.role?.toLowerCase().includes("candidate") ||
    t.role?.toLowerCase().includes("employer") ||
    t.role?.toLowerCase().includes("placed") ||
    t.role?.toLowerCase().includes("hire") ||
    t.role?.toLowerCase().includes("virtual assistant") ||
    t.role?.toLowerCase().includes("executive assistant")
  ) ?? [];

  const items = recruitmentReviews.length > 0
    ? recruitmentReviews.map(t => ({ text: t.text, name: t.name, role: t.role }))
    : FALLBACK_TESTIMONIALS;

  return (
    <section className="section-cream py-28 border-b border-[hsl(40_20%_86%)]">
      <ReviewDialog open={reviewOpen} onClose={() => setReviewOpen(false)} />
      <div className="container mx-auto px-6">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] font-medium mb-4" style={{ color: "hsl(43 65% 38%)" }}>
            Client &amp; Candidate Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: "hsl(0 0% 8%)" }}>
            What People Say
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {items.map((t, i) => (
            <motion.div
              key={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-[hsl(40_20%_84%)] bg-white p-10 relative group hover:border-[hsl(43_65%_48%_/_0.4)] transition-colors shadow-sm"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: "hsl(43 65% 48%)" }} />
                ))}
              </div>
              <div className="font-serif text-7xl absolute top-4 left-8 leading-none select-none" style={{ color: "hsl(43 65% 48% / 0.12)" }}>"</div>
              <p className="font-serif text-lg italic leading-relaxed relative z-10 mb-8" style={{ color: "hsl(0 0% 12%)" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px" style={{ background: "hsl(43 65% 48% / 0.5)" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "hsl(0 0% 8%)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "hsl(0 0% 42%)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setReviewOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium border px-6 py-3 transition-colors"
            style={{
              borderColor: "hsl(43 65% 48% / 0.4)",
              color: "hsl(43 65% 32%)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(43 65% 48%)";
              (e.currentTarget as HTMLButtonElement).style.background = "hsl(43 65% 48% / 0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(43 65% 48% / 0.4)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            <MessageSquarePlus className="w-4 h-4" />
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroVariant = useMemo(() => Math.floor(Math.random() * 3), []);

  return (
    <Layout>

      {/* ─── HERO — random variant each load ─── */}

      {/* VARIANT 0 — Split: text left, green-blazer photo right */}
      {heroVariant === 0 && (
        <section className="min-h-screen grid md:grid-cols-2 items-center relative overflow-hidden">
          {/* Mobile background image */}
          <div className="md:hidden absolute inset-0 z-0">
            <img src={michelleImg} alt="Michelle Piper" className="w-full h-full object-cover object-[center_top]" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_40%,_hsl(43_65%_48%_/_0.07)_0%,_transparent_60%)] pointer-events-none" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 px-8 md:px-14 lg:px-20 py-28 md:py-0">
            <motion.p variants={fade} className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-8">
              Virtual Assistant &amp; Remote Talent Recruitment
            </motion.p>
            <motion.h1 variants={fade} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] mb-8">
              Build Your<br />Remote Team<br />
              <span className="italic text-gold-gradient">With Confidence.</span>
            </motion.h1>
            <motion.p variants={fade} className="font-sans text-sm font-semibold mb-8 uppercase tracking-widest" style={{ color: "hsl(43 65% 55%)" }}>
              <RotatingText phrases={CATCHPHRASES} />
            </motion.p>
            <motion.p variants={fade} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              We help companies in the USA, UK, Australia, Canada, France, UAE, Ireland, New Zealand, Netherlands, and Germany hire exceptional Virtual Assistants and remote professionals through a structured, evidence-based recruitment process.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">Book a Free Consultation</Button></Link>
              <Link href="/hire-talent"><Button size="lg" variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8 py-6 text-base gap-2">How We Recruit <ArrowRight className="w-4 h-4" /></Button></Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }} className="relative h-screen hidden md:block overflow-hidden">
            <img src={michelleImg} alt="Michelle Piper" className="absolute inset-0 w-full h-full object-cover object-[center_top]" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
          </motion.div>
        </section>
      )}

      {/* VARIANT 1 — Full-bleed dark, text bottom-anchored, cream blazer photo */}
      {heroVariant === 1 && (
        <section className="relative min-h-screen overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img src={michelle2Img} alt="Michelle Piper" className="w-full h-full object-cover object-[center_top] md:object-[78%_top]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          </div>
          <div className="relative z-10 min-h-screen flex items-end pb-20 md:pb-24">
            <div className="px-8 md:px-16 lg:px-24 text-white max-w-3xl">
              <motion.div initial="hidden" animate="show" variants={stagger}>
                <motion.p variants={fade} className="text-xs uppercase tracking-[0.35em] font-medium mb-8" style={{ color: "hsl(43 65% 55%)" }}>
                  The Michelle Piper Recruitment
                </motion.p>
                <motion.h1 variants={fade} className="font-serif text-6xl md:text-8xl font-bold leading-[0.96] mb-8 text-white">
                  Exceptional<br />Talent.<br />
                  <span className="italic" style={{ color: "hsl(43 65% 55%)" }}>Global Reach.</span>
                </motion.h1>
                <motion.p variants={fade} className="font-sans text-sm font-semibold mb-8 uppercase tracking-widest" style={{ color: "hsl(43 65% 55%)" }}>
                  <RotatingText phrases={CATCHPHRASES} />
                </motion.p>
                <motion.p variants={fade} className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg font-light">
                  Connecting ambitious businesses with Africa's finest remote professionals — screened, trained, and ready to perform from day one.
                </motion.p>
                <motion.div variants={fade} className="flex flex-wrap gap-4">
                  <Link href="/contact"><Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">Book a Consultation</Button></Link>
                  <Link href="/candidates"><Button size="lg" variant="outline" className="rounded-none px-8 py-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white font-medium tracking-wide text-base gap-2">For Candidates <ArrowRight className="w-4 h-4" /></Button></Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* VARIANT 2 — Reversed split: photo left, text right, black outfit photo */}
      {heroVariant === 2 && (
        <section className="min-h-screen grid md:grid-cols-2 items-center relative overflow-hidden">
          {/* Mobile background image */}
          <div className="md:hidden absolute inset-0 z-0">
            <img src={michelle3Img} alt="Michelle Piper" className="w-full h-full object-cover object-[center_top]" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_50%,_hsl(43_65%_48%_/_0.06)_0%,_transparent_60%)] pointer-events-none" />
          {/* Left — photo */}
          <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} className="relative h-screen hidden md:block overflow-hidden order-first">
            <img src={michelle3Img} alt="Michelle Piper" className="absolute inset-0 w-full h-full object-cover object-[center_top]" />
            <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
          </motion.div>
          {/* Right — copy */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 px-8 md:px-14 lg:px-20 py-28 md:py-0">
            <motion.p variants={fade} className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-8">
              Remote Talent Specialists
            </motion.p>
            <motion.h1 variants={fade} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] mb-8">
              The Talent<br />Standard Has<br />
              <span className="italic text-gold-gradient">Changed.</span>
            </motion.h1>
            <motion.p variants={fade} className="font-sans text-sm font-semibold mb-8 uppercase tracking-widest" style={{ color: "hsl(43 65% 55%)" }}>
              <RotatingText phrases={CATCHPHRASES} />
            </motion.p>
            <motion.p variants={fade} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
              The best remote professionals aren't found on job boards. They're found through a relationship-driven, structured recruitment process built around your business needs.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-4">
              <Link href="/hire-talent"><Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">Hire Talent</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8 py-6 text-base gap-2">Book a Consultation <ArrowRight className="w-4 h-4" /></Button></Link>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-primary/20 bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center px-6 py-2"
              >
                <p className="font-serif text-4xl font-bold text-primary mb-1">{s.n}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeTicker phrases={CATCHPHRASES} />

      {/* ─── QUOTE ─── */}
      <section className="section-cream py-24 border-b border-[hsl(40_20%_86%)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-px mx-auto mb-10" style={{ background: "hsl(43 65% 48% / 0.5)" }} />
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light italic leading-[1.3]" style={{ color: "hsl(0 0% 8%)" }}>
              "Hiring the right person doesn't just fill a vacancy — it changes the trajectory of your business."
            </p>
            <p className="mt-8 text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "hsl(43 65% 38%)" }}>— Michelle Piper</p>
            <div className="w-16 h-px mx-auto mt-10" style={{ background: "hsl(43 65% 48% / 0.5)" }} />
          </motion.div>
        </div>
      </section>

      {/* ─── PROBLEM / OPPORTUNITY ─── */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-5">The Challenge</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-[1.1]">
                Hiring Remote Talent Shouldn't Feel Like a Risk.
              </h2>
            </motion.div>
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Recruiting a Virtual Assistant or remote employee can transform the way your business operates — but only when you hire the right person. Too many businesses waste valuable time reviewing unsuitable applications and making expensive mistakes.
              </p>
              <p className="font-serif text-xl text-foreground italic leading-relaxed border-l-4 border-primary pl-6">
                At The Michelle Piper, we combine structured assessment, industry expertise, and a people-first methodology to help you hire professionals who contribute from day one.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY MICHELLE PIPER ─── */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold max-w-2xl">
              Why Businesses Choose<br />The Michelle Piper
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background p-10 hover:bg-card transition-colors group"
              >
                <div className="text-primary font-serif text-5xl font-bold mb-5 opacity-20 group-hover:opacity-40 transition-opacity leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
            <div className="hidden lg:flex bg-card p-10 items-end bg-[radial-gradient(ellipse_at_top_left,_hsl(43_65%_48%_/_0.08)_0%,_transparent_70%)]">
              <Link href="/hire-talent">
                <Button className="btn-gold text-primary-foreground gap-2 font-medium">
                  How We Recruit <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">The Michelle Piper Approach</h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              Hiring exceptional people requires more than reviewing CVs. Our structured methodology ensures every recommendation is backed by evidence and genuine business understanding.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-px bg-border">
            {PROCESS.map((step, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 hover:bg-muted/20 transition-colors relative"
              >
                <p className="font-serif text-6xl font-bold text-primary/15 mb-4 leading-none">{step.n}</p>
                <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO / ABOUT MICHELLE ─── */}
      <section className="py-28 border-b border-border overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-5">About Michelle Piper</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-[1.1]">
                A Recruiter Who<br />
                <span className="italic text-gold-gradient">Raises the Standard.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Michelle Piper is a recruitment specialist, communication coach, and digital professional with a proven track record connecting African remote talent with global opportunities.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Her approach is built on honesty, rigour, and long-term thinking. Every placement is treated as a relationship, not a transaction.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 gap-2 font-medium">
                  Meet Michelle <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Photo with play-button overlay (links to about page) */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-px border border-primary/25" />
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={michelle2Img}
                  alt="Michelle Piper — Founder, The Michelle Piper Recruitment"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                {/* Play button hint — user can link to YouTube later */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-serif text-xl font-semibold text-white">Michelle Piper</p>
                  <p className="text-white/60 text-sm tracking-wide">Founder · The Michelle Piper Recruitment</p>
                </div>
              </div>
              {/* Decorative gold corner */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-primary/40" />
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-primary/40" />
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeTicker phrases={CATCHPHRASES} />

      {/* ─── VIDEO ─── */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-5">From Michelle</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-[1.1]">
                Watch Why We Do Things Differently.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Recruitment at The Michelle Piper is built on one principle: standards. In this video, Michelle explains why quality matters more than speed — and how that commitment changes outcomes for both employers and professionals.
              </p>
              <Link href="/contact">
                <Button className="btn-gold text-primary-foreground font-medium tracking-wide px-7 gap-2">
                  Book a Consultation
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video bg-background border border-border overflow-hidden group"
            >
              {/* YouTube embed — replace VIDEO_ID with your actual YouTube video ID */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE?rel=0&modestbranding=1"
                title="Michelle Piper — Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 pointer-events-none group-[&_iframe:not([src*='YOUR_VIDEO_ID_HERE'])]:hidden">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="text-muted-foreground text-sm">Video coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── ROLES ─── */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Remote Professionals</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Roles We Recruit</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-border p-8 hover:border-primary/60 transition-all group bg-background hover:bg-card"
              >
                <div className="w-8 h-px bg-primary/50 mb-5 group-hover:w-14 transition-all duration-300" />
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {role.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/hire-talent">
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary gap-2">
                View Full Hiring Guide <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FRAMEWORKS ─── */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Proprietary Standards</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Built Around Standards.</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Anyone can introduce candidates. Our responsibility is to recommend professionals we'd confidently hire ourselves.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-border max-w-4xl mx-auto">
            {[
              { name: "Michelle Piper Talent Standard", desc: "Defines the quality benchmark every candidate must meet before being recommended." },
              { name: "The Michelle Piper Approach", desc: "Ensures every recommendation genuinely aligns with your business objectives." },
              { name: "Michelle Piper Readiness Index", desc: "Measures how prepared candidates are for global remote employment." },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-background p-10 text-center hover:bg-card transition-colors group"
              >
                <div className="w-10 h-10 border border-primary/40 flex items-center justify-center mx-auto mb-6 group-hover:border-primary transition-colors">
                  <div className="w-2 h-2 bg-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-3">{f.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-2">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Questions</p>
              <h2 className="text-4xl font-serif font-bold mb-6">Frequently Asked</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Still have questions? We're here to help you hire with confidence.
              </p>
              <Link href="/contact">
                <Button className="btn-gold text-primary-foreground gap-2 font-medium">
                  Talk to Us <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <div className="md:col-span-3">
              <Accordion type="single" collapsible className="space-y-2">
                {FAQS.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border px-6 bg-background">
                    <AccordionTrigger className="text-left font-medium text-base hover:no-underline py-5 hover:text-primary transition-colors">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(43_65%_48%_/_0.1)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mx-auto">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-6">Ready to Build Your Team?</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.06]">
              Hire Exceptional<br />
              <span className="italic text-gold-gradient">Remote Talent.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              The right hire creates capacity.<br />
              The right team creates momentum.<br />
              The right recruitment partner changes everything.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-12 py-6 text-base">
                Book Your Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
