import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import michelle2Img from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_1784239737873.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const QUALITIES = [
  "Professional", "Reliable", "AI-ready", "Globally competitive", "Interview confident", "Employer ready",
];

const OPPORTUNITIES = [
  { title: "Virtual Assistants", desc: "Support founders and businesses with administration, organisation, and daily operations." },
  { title: "Executive Assistants", desc: "Provide strategic support to executives and leadership teams." },
  { title: "Customer Support Specialists", desc: "Deliver excellent customer experiences through email, live chat, and phone support." },
  { title: "Marketing Assistants", desc: "Support content creation, social media, digital marketing, and campaign coordination." },
  { title: "Sales Support Professionals", desc: "Assist with lead generation, appointment setting, CRM management, and sales administration." },
  { title: "Operations & Project Coordinators", desc: "Help businesses improve efficiency through project coordination and operational support." },
];

const JOURNEY = [
  { n: "01", title: "Apply", desc: "Complete your application and tell us about your skills, experience, and career goals." },
  { n: "02", title: "Assessment", desc: "Your application is reviewed using our Michelle Piper Readiness Index — evaluating communication, professionalism, technical ability, remote work readiness, and overall employability." },
  { n: "03", title: "Interview", desc: "Shortlisted agents participate in interviews and role-specific assessments." },
  { n: "04", title: "Talent Community", desc: "Successful agents become part of our exclusive talent network." },
  { n: "05", title: "Employer Matching", desc: "When suitable opportunities become available, we introduce agents whose skills and career goals align with employer requirements." },
];

const ACCELERATOR_AREAS = [
  "Professional communication",
  "CV optimisation",
  "LinkedIn optimisation",
  "Interview preparation",
  "AI productivity skills",
  "Remote work best practices",
  "Business etiquette",
  "Time management",
];

const FAQS = [
  { q: "Is joining The Michelle Piper free?", a: "Yes. Joining our Talent Community and applying for opportunities is completely free." },
  { q: "Do you guarantee employment?", a: "No. We do not guarantee employment. We provide professional guidance, career development, and opportunities to connect with employers who are hiring." },
  { q: "Which countries can apply?", a: "We currently recruit agents from Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda." },
  { q: "Which countries are your employers located in?", a: "Our employers are based in the United States, United Kingdom, Australia, Canada, France, UAE, Ireland, New Zealand, Netherlands, and Germany." },
  { q: "Do I need previous Virtual Assistant experience?", a: "Not always. Some roles require experience, while others focus more on transferable skills, communication, professionalism, and willingness to learn." },
  { q: "How will I know if I'm selected?", a: "If your profile matches an employer's requirements, our recruitment team will contact you with the next steps." },
];

export default function Candidates() {
  return (
    <Layout>
      {/* HERO — full-bleed photo */}
      <section className="relative min-h-[92vh] flex items-end pb-20 border-b border-white/10 overflow-hidden" style={{ background: "hsl(0 0% 4%)" }}>
        <div className="absolute inset-0 z-0">
          <img src={michelle2Img} alt="Michelle Piper" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-8 md:px-14 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-6">Remote Careers Start Here</p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.04]">
              Build a Career<br />That Goes<br />
              <span className="italic text-gold-gradient">Beyond Borders.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
              Your skills deserve opportunities without geographical limits. The Michelle Piper helps ambitious professionals from Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda access global remote careers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/talent-community">
                <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8 py-6 text-base">
                  Join Our Talent Community
                </Button>
              </Link>
              <Link href="/hire-talent">
                <Button size="lg" variant="outline" className="border-white/20 text-foreground hover:border-primary hover:text-primary font-medium tracking-wide px-8 py-6 text-base gap-2">
                  Hiring Instead? <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Countries strip at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2"
          >
            {["Nigeria", "South Africa", "Kenya", "Ghana", "Rwanda", "Uganda"].map((c) => (
              <span key={c} className="text-xs uppercase tracking-widest text-muted-foreground">{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-24 section-dark border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:w-1/2">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Why Join Us</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Why Join The Michelle Piper?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Finding remote jobs online can be frustrating. Thousands of applications. Very little feedback. Unclear expectations. Questionable employers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe talented professionals deserve a better experience. When you join The Michelle Piper, you become part of a community focused on long-term career success — not just your next interview.
              </p>
            </motion.div>
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }} className="md:w-1/2">
              <p className="text-foreground font-medium mb-6">What makes our agents different?</p>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Global employers are looking for more than technical skills. They want professionals who communicate effectively, solve problems, take ownership, and work confidently in remote environments.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {QUALITIES.map((q, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{q}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Career Opportunities</p>
            <h2 className="text-4xl font-serif font-bold">Roles We Recruit For</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPPORTUNITIES.map((opp, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border p-8 hover:border-primary/40 transition-colors">
                <h3 className="font-serif text-lg font-bold mb-3">{opp.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{opp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-24 section-cream border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">The Journey</p>
            <h2 className="text-4xl font-serif font-bold">Our Agent Journey</h2>
          </motion.div>
          <div className="max-w-2xl space-y-px">
            {JOURNEY.map((step, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-8 p-8 bg-background hover:bg-muted/10 border border-border transition-colors">
                <p className="text-primary font-mono text-xs tracking-widest shrink-0 pt-1">{step.n}</p>
                <div>
                  <h3 className="font-serif text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER ACCELERATOR */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:w-1/2">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Development</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Michelle Piper Career Accelerator
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Getting hired begins long before your interview. Our Career Accelerator is designed to help ambitious professionals improve the skills employers value most.
              </p>
              <p className="text-foreground font-medium text-sm">
                We don't just help you apply. We help you become competitive.
              </p>
            </motion.div>
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.15 }} className="md:w-1/2">
              <p className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-5">Areas of development</p>
              <div className="grid grid-cols-2 gap-3">
                {ACCELERATOR_AREAS.map((area, i) => (
                  <div key={i} className="border border-border p-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
                    {area}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 section-cream border-b border-border">
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

      {/* OUR EDGE — Training / Playbook / CRM */}
      <section className="py-28 section-dark border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16 max-w-2xl">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">What Sets Our Agents Apart</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Prepared. Supported. Accountable.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Joining The Michelle Piper talent network means more than submitting an application. Every agent who joins our community receives ongoing support, development, and the professional infrastructure to perform at the highest level.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                n: "01",
                title: "Regular Agent Training",
                desc: "All agents in our network participate in structured, ongoing training programmes. We cover communication standards, client management, AI tools, remote work protocols, and professional development — keeping every agent sharp and globally competitive.",
              },
              {
                n: "02",
                title: "Sales Playbook Manual",
                desc: "Our sales agents are equipped with a comprehensive Sales Playbook Manual — a complete guide to outreach, objection handling, CRM discipline, pipeline management, and closing methodology. It is the standard every sales professional in our network works from.",
              },
              {
                n: "03",
                title: "In-House CRM System",
                desc: "We operate our own CRM tool to ensure every agent remains accountable, productive, and supported. Tasks, performance, communications, and client interactions are tracked in real time — creating transparency and enabling continuous improvement.",
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

      {/* CTA */}
      <section className="py-28 section-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Your Next Opportunity Could Change Your Career.</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Every successful remote professional started with one opportunity. Let's help you prepare for yours.
            </p>
            <Link href="/talent-community">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-10">
                Join Our Talent Community
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
