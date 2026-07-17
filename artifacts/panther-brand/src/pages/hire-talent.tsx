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
  { q: "Which countries do your candidates come from?", a: "We recruit exceptional remote professionals from Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda for employers based in the United States, United Kingdom, Australia, Canada, France, UAE, Ireland, New Zealand, Netherlands, and Germany." },
  { q: "Can I hire more than one Virtual Assistant?", a: "Yes. We support businesses hiring individual professionals as well as building larger remote support teams." },
  { q: "Do you recruit roles other than Virtual Assistants?", a: "Absolutely. We recruit Executive Assistants, Customer Support Specialists, Marketing Assistants, Sales Support Professionals, Operations Coordinators, and other remote business support professionals." },
  { q: "What makes The Michelle Piper different?", a: "Our focus is not on making placements quickly. Our focus is on making the right placements through structured assessment, transparent communication, and long-term partnership." },
];

export default function HireTalent() {
  return (
    <Layout>
      {/* HERO — editorial typographic */}
      <section className="border-b border-border relative overflow-hidden">
        {/* Gold ambient top bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="container mx-auto px-6">
          {/* Top editorial row */}
          <div className="flex items-center justify-between py-6 border-b border-border/40 mb-0">
            <p className="text-primary text-[10px] uppercase tracking-[0.35em] font-medium">Trusted Virtual Assistant Recruitment Agency</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.25em] hidden md:block">Est. The Michelle Piper</p>
          </div>

          {/* Main editorial headline */}
          <motion.div variants={fade} initial="hidden" animate="show" className="py-16 md:py-24">
            <h1 className="font-serif font-bold leading-[1.0] mb-0">
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-foreground">Hire</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] text-foreground">Exceptional</span>
              <span className="block text-6xl md:text-8xl lg:text-[9rem] italic text-gold-gradient">Remote Talent.</span>
            </h1>
          </motion.div>

          {/* Below headline — 3 column info row */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-px bg-border border-t border-border"
          >
            <div className="bg-background p-8">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Finding the right people shouldn't slow your business down. We combine structured assessment, rigour, and a people-first methodology to reduce hiring risk.
              </p>
            </div>
            <div className="bg-background p-8 flex items-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">
                  Book a Free Consultation
                </Button>
              </Link>
            </div>
            <div className="bg-background p-8">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">We place talent into</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {["USA", "UK", "Australia", "Canada", "France", "UAE", "Ireland", "New Zealand", "Netherlands", "Germany"].map((c) => (
                  <span key={c} className="text-xs text-foreground border border-border px-2 py-0.5">{c}</span>
                ))}
              </div>
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
            <h2 className="text-4xl font-serif font-bold">The Michelle Piper Approach</h2>
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

      {/* WHY AFRICA */}
      <section className="py-28 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">Why Africa</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Africa's Remote Talent Is a Competitive Advantage.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                More global employers are discovering what The Michelle Piper has built on — African professionals bring outstanding work ethic, communication skills, time-zone flexibility, and a genuine drive to excel. Here's why the world's most ambitious businesses are looking to Africa.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                {
                  title: "University-Educated Talent Pool",
                  desc: "Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda produce hundreds of thousands of graduates each year across business, technology, communications, and management. The talent exists — it simply lacked access to global opportunity.",
                },
                {
                  title: "English Proficiency",
                  desc: "All six countries we recruit from are English-speaking nations with strong educational systems rooted in the English language. Communication quality with global clients is consistently high and often exceeds expectations.",
                },
                {
                  title: "Strong Work Ethic & Hunger to Succeed",
                  desc: "Professionals in our network are motivated by ambition and driven by purpose. They are not looking for an easy job — they are looking to build a career. That hunger translates directly into performance and reliability.",
                },
                {
                  title: "Time-Zone Compatibility",
                  desc: "African time zones align well with European business hours and overlap meaningfully with US Eastern and UK schedules. Many of our placed professionals work comfortably across multiple time-zone arrangements.",
                },
                {
                  title: "Competitive, Sustainable Salaries",
                  desc: "Hiring African remote talent offers significant cost efficiency without compromising quality. Professionals earn salaries that are competitive and meaningful in their local context — creating genuine benefit on both sides of the placement.",
                },
                {
                  title: "Proven Remote Work Capability",
                  desc: "Remote work is not new to Africa's professional class. Our candidates are experienced with asynchronous communication, digital tools, client management software, and the independence that high-quality remote roles require.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  className="bg-background p-8 hover:bg-muted/20 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mb-4" />
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AGENT INFRASTRUCTURE */}
      <section className="py-28 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 max-w-2xl">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">What We Invest In — So You Don't Have To</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Our Agents Arrive Ready.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every professional in our talent network is backed by ongoing training, structured tools, and a culture of accountability. When you hire through The Michelle Piper, you are not starting from scratch — you are onboarding someone already operating to a professional standard.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                n: "01",
                title: "Regular Agent Training",
                desc: "All agents in our network participate in structured, ongoing training programmes covering communication standards, client management, AI tools, remote work protocols, and professional development. Your new hire arrives sharp — and stays sharp.",
              },
              {
                n: "02",
                title: "Sales Playbook Manual",
                desc: "Sales and business development agents are equipped with a comprehensive Sales Playbook Manual — covering outreach strategy, objection handling, pipeline discipline, and closing methodology. Employers gain professionals who already know the standard.",
              },
              {
                n: "03",
                title: "In-House CRM System",
                desc: "We operate our own CRM to track agent performance, productivity, communications, and client interactions in real time. This accountability infrastructure means the professionals we recommend are not just capable — they are proven.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-10 hover:bg-card transition-colors group"
              >
                <div className="text-primary font-mono text-xs tracking-widest mb-6">{item.n}</div>
                <h3 className="font-serif text-xl font-semibold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
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
