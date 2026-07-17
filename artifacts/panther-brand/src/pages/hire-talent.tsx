import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import michelleImg from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_(2)_1784237988819.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const BENEFITS = [
  "Structured candidate assessment",
  "Rigorous screening and interviews",
  "AI-ready remote professionals",
  "Transparent recruitment process",
  "Carefully matched candidates",
  "Ongoing recruitment support",
  "Long-term hiring success",
];

const ROLES = [
  {
    title: "Virtual Assistants",
    desc: "Professional administrative support that frees you to focus on growing your business.",
    responsibilities: ["Calendar management", "Email management", "Travel coordination", "Research & data entry", "CRM management", "Document preparation"],
  },
  {
    title: "Executive Assistants",
    desc: "Strategic support for founders, executives, and leadership teams.",
    responsibilities: ["Executive scheduling", "Meeting coordination", "Project management", "Business administration", "Executive communication", "Operations support"],
  },
  {
    title: "Customer Support Specialists",
    desc: "Deliver exceptional customer experiences across multiple communication channels.",
    responsibilities: ["Email support", "Live chat", "Help desk support", "Customer onboarding", "Customer success", "Ticket management"],
  },
  {
    title: "Marketing Assistants",
    desc: "Helping marketing teams execute consistently and at scale.",
    responsibilities: ["Social media management", "Content creation", "Email marketing", "SEO assistance", "Marketing coordination", "Analytics reporting"],
  },
  {
    title: "Sales Support Professionals",
    desc: "Helping businesses generate more revenue through structured sales operations.",
    responsibilities: ["Lead generation", "Appointment setting", "CRM administration", "Sales coordination", "Pipeline management", "Sales reporting"],
  },
  {
    title: "Operations Coordinators",
    desc: "Helping businesses improve internal efficiency and project delivery.",
    responsibilities: ["Operations assistance", "Project coordination", "Process documentation", "Administrative coordination", "Team communication", "Workflow optimisation"],
  },
];

const INDUSTRIES = [
  { name: "eCommerce", desc: "Customer service, order processing, product listings, supplier communication, and inventory management." },
  { name: "Marketing Agencies", desc: "Project coordination, social media scheduling, content management, client communication, and reporting." },
  { name: "Real Estate", desc: "Lead management, CRM updates, appointment scheduling, listing administration, and transaction coordination." },
  { name: "Professional Services", desc: "Executive Assistants and administrative professionals who improve operational efficiency for consultants and firms." },
  { name: "SaaS & Technology", desc: "Customer support specialists, executive assistants, and operations coordinators who understand fast-growing businesses." },
  { name: "Healthcare & Wellness", desc: "Administrative professionals for appointment scheduling, patient communication, and back-office support." },
];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "We learn about your business, culture, goals, and hiring requirements." },
  { n: "02", title: "Sourcing", desc: "We identify suitable candidates through our talent network and strategic sourcing channels." },
  { n: "03", title: "Assessment", desc: "Candidates are evaluated using our Michelle Piper Talent Standard, measuring communication, professionalism, technical ability, reliability, and AI readiness." },
  { n: "04", title: "Shortlisting", desc: "Only the strongest candidates are presented for your review. No unnecessary CVs. No wasted interviews." },
  { n: "05", title: "Placement & Support", desc: "We remain available throughout onboarding to help create a successful long-term placement." },
];

const FAQS = [
  { q: "How long does recruitment usually take?", a: "The timeline depends on the role, level of experience, and specific requirements. During your consultation, we'll provide a realistic recruitment timeline and keep you informed throughout the process." },
  { q: "Which countries do your candidates come from?", a: "We currently recruit exceptional remote professionals from South Africa, Nigeria, and Kenya for employers based in the United States, United Kingdom, Australia, Canada, and Singapore." },
  { q: "Can I hire more than one Virtual Assistant?", a: "Yes. We support businesses hiring individual professionals as well as building larger remote support teams." },
  { q: "Do you recruit roles other than Virtual Assistants?", a: "Absolutely. We recruit Executive Assistants, Customer Support Specialists, Marketing Assistants, Sales Support Professionals, Operations Coordinators, and other remote business support professionals." },
  { q: "What makes The Michelle Piper different?", a: "Our focus is not on making placements quickly. Our focus is on making the right placements through structured assessment, transparent communication, and long-term partnership." },
];

export default function HireTalent() {
  return (
    <Layout>
      {/* HERO */}
      <section className="py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(43_65%_48%_/_0.06)_0%,_transparent_60%)] pointer-events-none" />
        {/* Background Michelle photo — subtle, faded */}
        <div className="absolute right-0 top-0 bottom-0 w-[50%] hidden md:block overflow-hidden opacity-25">
          <img src={michelleImg} alt="" className="w-full h-full object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-3xl">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Trusted Virtual Assistant Recruitment Agency</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.04]">
              Hire Exceptional<br />Remote Talent<br />
              <span className="italic text-gold-gradient">That Delivers.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
              Finding the right people shouldn't slow your business down. We help businesses across the USA, UK, Australia, Canada, and Singapore hire exceptional remote professionals through a structured process designed to reduce hiring risk.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">
                  Book a Free Hiring Consultation
                </Button>
              </Link>
              <Link href="/candidates">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8 py-6 text-base gap-2">
                  Looking for Work? <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY PANTHER */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Why Businesses Choose The Michelle Piper
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Recruitment is one of the most important investments you'll make. The right hire creates momentum. The wrong hire costs time, money, and opportunities. That's why we built a recruitment process focused on quality — not quantity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don't simply send CVs. We recommend professionals we'd confidently hire ourselves.
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              {BENEFITS.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">What We Recruit</p>
            <h2 className="text-4xl font-serif font-bold">The Roles We Recruit</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              High-performing remote professionals who help businesses operate more efficiently and grow with confidence.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {ROLES.map((role, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="bg-background p-8 hover:bg-card transition-colors">
                <h3 className="font-serif text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{role.desc}</p>
                <p className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-3">Typical responsibilities</p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                  {role.responsibilities.map((r, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary/50" />
                      {r}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Industries</p>
            <h2 className="text-4xl font-serif font-bold">Industries We Support</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="border border-border p-7 hover:border-primary/40 transition-colors">
                <h3 className="font-serif text-lg font-bold mb-3">{ind.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Process</p>
            <h2 className="text-4xl font-serif font-bold">The Michelle Piper Match Method</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">Every successful placement follows a disciplined recruitment process.</p>
          </motion.div>
          <div className="max-w-3xl space-y-px">
            {PROCESS.map((step, i) => (
              <div key={i} className="flex gap-8 p-8 bg-card hover:bg-muted/20 border border-border transition-colors">
                <p className="text-primary font-mono text-xs tracking-widest shrink-0 pt-1">{step.n}</p>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
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

      {/* CTA */}
      <section className="py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Ready to Hire With Confidence?</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              The right people don't just complete tasks. They create capacity. They improve productivity. They help businesses grow.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-10">
                Book Your Free Hiring Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
