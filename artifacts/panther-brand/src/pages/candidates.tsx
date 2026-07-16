import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
  { n: "02", title: "Assessment", desc: "Your application is reviewed using our Panther Readiness Index™ — evaluating communication, professionalism, technical ability, remote work readiness, and overall employability." },
  { n: "03", title: "Interview", desc: "Shortlisted candidates participate in interviews and role-specific assessments." },
  { n: "04", title: "Talent Community", desc: "Successful candidates become part of our exclusive talent network." },
  { n: "05", title: "Employer Matching", desc: "When suitable opportunities become available, we introduce candidates whose skills and career goals align with employer requirements." },
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
  { q: "Which countries can apply?", a: "We currently recruit candidates from Nigeria, South Africa, and Kenya." },
  { q: "Which countries are your employers located in?", a: "Our employers are primarily based in the United States, United Kingdom, Australia, Canada, and Singapore." },
  { q: "Do I need previous Virtual Assistant experience?", a: "Not always. Some roles require experience, while others focus more on transferable skills, communication, professionalism, and willingness to learn." },
  { q: "How will I know if I'm selected?", a: "If your profile matches an employer's requirements, our recruitment team will contact you with the next steps." },
];

export default function Candidates() {
  return (
    <Layout>
      {/* HERO */}
      <section className="py-28 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(43_65%_48%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-3xl">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Remote Careers Start Here</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.05]">
              Build a Career That Goes Beyond Borders.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
              Your skills deserve opportunities without geographical limits. The Michelle Piper helps ambitious professionals from Nigeria, South Africa, and Kenya prepare for global remote careers — connecting them with employers in the USA, UK, Australia, Canada, and Singapore.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8">
                Join Our Talent Community
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-24 bg-card border-b border-border">
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
              <p className="text-foreground font-medium mb-6">What makes our candidates different?</p>
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
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">The Journey</p>
            <h2 className="text-4xl font-serif font-bold">Our Candidate Journey</h2>
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
                Panther Career Accelerator™
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Getting hired begins long before your interview. Our Career Accelerator™ is designed to help ambitious professionals improve the skills employers value most.
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
            <h2 className="text-4xl font-serif font-bold mb-6">Your Next Opportunity Could Change Your Career.</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Every successful remote professional started with one opportunity. Let's help you prepare for yours.
            </p>
            <Link href="/contact">
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
