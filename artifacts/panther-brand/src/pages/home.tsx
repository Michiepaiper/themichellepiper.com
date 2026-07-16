import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const TRUST_ITEMS = [
  "Trusted Recruitment Methodology",
  "Rigorous Candidate Screening",
  "Remote Talent Specialists",
  "Long-Term Hiring Partners",
];

const WHY_ITEMS = [
  { title: "Structured Recruitment", desc: "A proven methodology designed to reduce hiring risk and improve long-term success." },
  { title: "Exceptional Remote Talent", desc: "Virtual Assistants, Executive Assistants, Customer Support Specialists, and more — all meeting our rigorous quality standards." },
  { title: "Transparent Communication", desc: "You'll always know where you are in the recruitment process and what happens next." },
  { title: "AI-Ready Professionals", desc: "We actively assess digital literacy and AI readiness as part of every evaluation — modern businesses require modern professionals." },
  { title: "Long-Term Partnerships", desc: "We're not interested in making placements. We're interested in becoming your trusted remote talent partner." },
];

const PROCESS = [
  { n: "01", title: "Discover", desc: "We learn about your business, goals, culture, and operational needs." },
  { n: "02", title: "Define", desc: "We identify the skills, behaviours, and experience required for long-term success — not just today's vacancy." },
  { n: "03", title: "Assess", desc: "Candidates are evaluated using the Panther Talent Standard™, measuring communication, technical ability, and AI readiness." },
  { n: "04", title: "Match", desc: "We present a carefully selected shortlist of candidates aligned with your business objectives." },
  { n: "05", title: "Support", desc: "We remain involved beyond placement — because successful recruitment continues after an offer is accepted." },
];

const ROLES = [
  { title: "Virtual Assistants", desc: "Reliable administrative support that helps founders and growing businesses reclaim valuable time." },
  { title: "Executive Assistants", desc: "Strategic support for executives, business owners, and leadership teams." },
  { title: "Customer Support Specialists", desc: "Deliver exceptional customer experiences across email, live chat, and phone support." },
  { title: "Marketing Assistants", desc: "Support digital marketing, content creation, email marketing, and social media activities." },
  { title: "Sales Support Professionals", desc: "Lead generation, appointment setting, CRM management, and sales administration." },
  { title: "Operations Coordinators", desc: "Keep projects moving, improve internal processes, and strengthen day-to-day operations." },
];

const FAQS = [
  { q: "Why use a recruitment agency instead of hiring myself?", a: "Working with a specialist agency saves time, reduces hiring risk, and gives you access to pre-screened professionals assessed for communication, technical ability, professionalism, and remote work readiness." },
  { q: "Which countries do you recruit from?", a: "We specialise in recruiting exceptional remote professionals from South Africa, Nigeria, and Kenya for employers based in the United States, United Kingdom, Australia, Canada, and Singapore." },
  { q: "What roles do you recruit?", a: "Virtual Assistants, Executive Assistants, Customer Support Specialists, Marketing Assistants, Operations Coordinators, Sales Support Professionals, and other remote business support roles." },
  { q: "How do you assess candidates?", a: "Every candidate is assessed using our proprietary frameworks: the Panther Talent Standard™, Panther Match Method™, and Panther Readiness Index™." },
  { q: "How long does recruitment take?", a: "Every role is different. During your consultation we'll provide realistic timelines based on your hiring requirements and keep you informed throughout." },
];

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="min-h-[92vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(43_65%_48%_/_0.08)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-3xl">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">
              Trusted Virtual Assistant Recruitment Agency for Growing Businesses
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 leading-[1.05]">
              Build Your Remote Team<br />
              <span className="text-primary">With Confidence.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Hiring the right people shouldn't be the biggest obstacle to growing your business. We help companies in the USA, UK, Australia, Canada, and Singapore hire exceptional Virtual Assistants and remote professionals through a structured recruitment process.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8">
                  Book a Free Consultation
                </Button>
              </Link>
              <Link href="/hire-talent">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8">
                  How We Recruit
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/40 animate-bounce hidden md:block">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground tracking-wide">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM/OPPORTUNITY */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Hiring Remote Talent Shouldn't Feel Like a Risk.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Recruiting a Virtual Assistant or remote employee can transform the way your business operates — but only when you hire the right person. Too many businesses waste valuable time reviewing unsuitable applications and making expensive decisions without confidence.
              </p>
              <p className="text-foreground text-lg font-medium leading-relaxed border-l-4 border-primary pl-6 text-left max-w-2xl mx-auto">
                At The Michelle Piper, we combine structured candidate assessment, industry expertise, and a people-first methodology to help you hire professionals who contribute from day one.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY PANTHER */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Why Panther</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold max-w-2xl">
              Why Businesses Choose The Michelle Piper
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {WHY_ITEMS.map((item, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card p-8 hover:bg-muted/30 transition-colors">
                <div className="text-primary font-serif text-3xl font-bold mb-4 opacity-30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
            {/* Filler cell for grid alignment */}
            <div className="hidden lg:block bg-card p-8 bg-[radial-gradient(ellipse_at_center,_hsl(43_65%_48%_/_0.06)_0%,_transparent_70%)]">
              <p className="font-serif text-4xl text-primary/20 font-bold leading-tight">
                "Recruitment isn't about filling vacancies. It's about building a stronger business."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">The Panther Match Method™</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Hiring exceptional people requires more than reviewing CVs. Our structured methodology ensures every recommendation is supported by evidence and genuine understanding of your business.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-px bg-border">
            {PROCESS.map((step, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 hover:bg-card transition-colors">
                <p className="text-primary font-mono text-xs tracking-widest mb-4">{step.n}</p>
                <h3 className="font-serif text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Roles We Recruit</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Remote Professionals We Recruit</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-border p-8 hover:border-primary/50 transition-colors group">
                <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-primary transition-colors">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/hire-talent">
              <Button variant="outline" className="border-border hover:border-primary hover:text-primary gap-2">
                View All Roles <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Our Standards</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Recruitment Built Around Standards.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Anyone can introduce candidates. Our responsibility is to recommend professionals we'd confidently hire ourselves.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {[
                { name: "Panther Talent Standard™", desc: "Defines the quality benchmark every candidate must meet." },
                { name: "Panther Match Method™", desc: "Ensures every recommendation aligns with your business objectives." },
                { name: "Panther Readiness Index™", desc: "Measures how prepared candidates are for global remote employment." },
              ].map((f, i) => (
                <div key={i} className="bg-background p-10 text-center hover:bg-card transition-colors">
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center mx-auto mb-6">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-3">{f.name}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Questions</p>
              <h2 className="text-4xl font-serif font-bold">Frequently Asked Questions</h2>
            </motion.div>
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
      </section>

      {/* FINAL CTA */}
      <section className="py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Hire Exceptional Remote Talent With Confidence.
            </h2>
            <p className="text-muted-foreground text-lg mb-4">The right hire creates capacity.</p>
            <p className="text-muted-foreground text-lg mb-4">The right team creates momentum.</p>
            <p className="text-muted-foreground text-lg mb-10">The right recruitment partner changes everything.</p>
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-10 py-6 text-base">
                Book Your Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
