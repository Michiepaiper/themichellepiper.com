import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import michelleImg from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_(2)_1784237988819.jpeg";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const STATS = [
  { n: "3", label: "African Countries" },
  { n: "5", label: "Global Markets Served" },
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
  { n: "03", title: "Assess", desc: "Candidates are evaluated using the Michelle Piper Talent Standard™." },
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
  { q: "Which countries do you recruit from?", a: "We specialise in recruiting exceptional remote professionals from South Africa, Nigeria, and Kenya for employers based in the United States, United Kingdom, Australia, Canada, and Singapore." },
  { q: "What roles do you recruit?", a: "Virtual Assistants, Executive Assistants, Customer Support Specialists, Marketing Assistants, Operations Coordinators, Sales Support Professionals, and other remote business support roles." },
  { q: "How do you assess candidates?", a: "Every candidate is assessed using our proprietary frameworks: the Michelle Piper Talent Standard™, Michelle Piper Match Method™, and Michelle Piper Readiness Index™." },
  { q: "How long does recruitment take?", a: "Every role is different. During your consultation we'll provide realistic timelines based on your requirements and keep you informed throughout." },
];

export default function Home() {
  return (
    <Layout>

      {/* ─── HERO ─── */}
      <section className="min-h-screen grid md:grid-cols-2 items-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_40%,_hsl(43_65%_48%_/_0.07)_0%,_transparent_60%)] pointer-events-none" />

        {/* Left — copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 px-8 md:px-14 lg:px-20 py-28 md:py-0"
        >
          <motion.p variants={fade} className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-8">
            Virtual Assistant &amp; Remote Talent Recruitment
          </motion.p>
          <motion.h1 variants={fade} className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] mb-8">
            Build Your<br />
            Remote Team<br />
            <span className="italic text-gold-gradient">With Confidence.</span>
          </motion.h1>
          <motion.p variants={fade} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
            We help companies in the USA, UK, Australia, Canada, and Singapore hire exceptional Virtual Assistants and remote professionals through a structured, evidence-based recruitment process.
          </motion.p>
          <motion.div variants={fade} className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">
                Book a Free Consultation
              </Button>
            </Link>
            <Link href="/hire-talent">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8 py-6 text-base gap-2">
                How We Recruit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Michelle's photo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="relative h-screen hidden md:block overflow-hidden"
        >
          <img
            src={michelleImg}
            alt="Michelle Piper"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Fade edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {/* Gold accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
        </motion.div>
      </section>

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

      {/* ─── QUOTE ─── */}
      <section className="py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(43_65%_48%_/_0.05)_0%,_transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-px bg-primary/50 mx-auto mb-10" />
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light italic text-foreground leading-[1.3]">
              "Hiring the right person doesn't just fill a vacancy — it changes the trajectory of your business."
            </p>
            <p className="mt-8 text-primary text-xs tracking-[0.3em] uppercase font-medium">— Michelle Piper</p>
            <div className="w-16 h-px bg-primary/50 mx-auto mt-10" />
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold">The Michelle Piper Match Method™</h2>
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
                  src={michelleImg}
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
              { name: "Michelle Piper Talent Standard™", desc: "Defines the quality benchmark every candidate must meet before being recommended." },
              { name: "Michelle Piper Match Method™", desc: "Ensures every recommendation genuinely aligns with your business objectives." },
              { name: "Michelle Piper Readiness Index™", desc: "Measures how prepared candidates are for global remote employment." },
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
