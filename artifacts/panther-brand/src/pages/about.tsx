import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import michelleImg from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_(2)_1784237988819.jpeg";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const VALUES = [
  { title: "We Earn Trust Before We Ask For It", desc: "Trust is built through honesty, consistency, and accountability. Every recommendation we make should strengthen — not weaken — that trust." },
  { title: "We Choose Quality Over Speed", desc: "We would rather recommend three exceptional candidates than thirty average ones. Quality creates lasting partnerships." },
  { title: "We Leave People Better Than We Found Them", desc: "Every employer. Every candidate. Every interaction. Our goal is to create value beyond recruitment." },
  { title: "We Improve Every Day", desc: "Markets evolve. Technology evolves. Businesses evolve. We embrace continuous learning so our clients and candidates always benefit from better recruitment." },
  { title: "We Take Ownership", desc: "We own outcomes. Not excuses. When challenges arise, we communicate openly and work relentlessly toward solutions." },
];

const FRAMEWORKS = [
  { name: "Michelle Piper Talent Standard™", desc: "Defines the quality benchmark every candidate must achieve before being recommended." },
  { name: "Michelle Piper Match Method™", desc: "Our structured recruitment methodology designed to improve employer–candidate compatibility and long-term hiring success." },
  { name: "Michelle Piper Readiness Index™", desc: "Evaluates how prepared candidates are for global remote employment." },
  { name: "Michelle Piper Employer Blueprint™", desc: "Helps us understand every employer's business, culture, operational needs, and long-term hiring objectives before recruitment begins." },
  { name: "Michelle Piper Career Accelerator™", desc: "Supports ambitious professionals with practical guidance, career development, interview preparation, and employability skills." },
  { name: "Michelle Piper Quality Score™", desc: "Our continuous improvement framework that measures recruitment quality, employer satisfaction, placement success, and long-term outcomes." },
];

const FAQS = [
  { q: "What values guide The Michelle Piper recruitment approach?", a: "Precision, intelligence, discipline, confidence, and quiet strength — these are the qualities that shape how we recruit and the standards we uphold for every employer and candidate we work with." },
  { q: "What countries do you operate in?", a: "We recruit talent from Nigeria, South Africa, and Kenya for employers located in the United States, United Kingdom, Australia, Canada, and Singapore." },
  { q: "What makes your recruitment process different?", a: "Our recruitment methodology combines structured assessment, candidate preparation, employer discovery, and proprietary quality frameworks designed to improve long-term hiring outcomes." },
  { q: "Do you only recruit Virtual Assistants?", a: "No. While Virtual Assistant recruitment is our core specialisation, we also recruit Executive Assistants, Customer Support Specialists, Marketing Assistants, Sales Support Professionals, Operations Coordinators, and other remote business support professionals." },
];

export default function About() {
  return (
    <Layout>
      {/* HERO */}
      <section className="min-h-[70vh] grid md:grid-cols-2 items-center border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(43_65%_48%_/_0.07)_0%,_transparent_60%)] pointer-events-none" />

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 px-8 md:px-14 lg:px-20 py-24 md:py-0"
        >
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-6">About The Michelle Piper</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.05]">
            Raising the<br />Standard of<br />
            <span className="italic text-gold-gradient">Remote Talent.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Recruitment has never been about filling vacancies. It's about helping businesses grow with confidence and helping exceptional professionals build meaningful careers.
          </p>
        </motion.div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
          className="relative h-[70vh] hidden md:block overflow-hidden"
        >
          <img src={michelleImg} alt="Michelle Piper" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Our Story</p>
              <p className="text-foreground text-xl font-serif font-medium mb-6 leading-relaxed">
                The way businesses hire has changed.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Remote work has created opportunities to build teams across borders, access exceptional talent, and grow faster than ever before. But with more opportunity has come more uncertainty. Finding professionals you can genuinely trust has become increasingly difficult.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Likewise, talented professionals often struggle to access international opportunities — not because they lack ability, but because they lack visibility, guidance, and the right connections.
              </p>
              <p className="text-foreground font-medium text-lg border-l-4 border-primary pl-6 py-2">
                The Michelle Piper was built to bridge that gap. Every placement is an opportunity to strengthen a business and transform a career.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">What We Believe</p>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10">
                Talent should never be limited by geography.
                <br /><span className="text-primary">Businesses should never be limited by access to exceptional people.</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-10 text-left mt-14">
                <div className="border-t border-border pt-8">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Our Mission</p>
                  <p className="text-muted-foreground leading-relaxed">
                    To raise the standard of remote recruitment by developing exceptional professionals, guiding ambitious employers, and building long-term partnerships founded on trust, quality, and measurable outcomes.
                  </p>
                </div>
                <div className="border-t border-border pt-8">
                  <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Our Vision</p>
                  <p className="text-muted-foreground leading-relaxed">
                    To redefine how the world discovers, develops, and trusts remote talent. We are building more than a recruitment company — a company recognised for quality, integrity, and lasting impact.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Values</p>
            <h2 className="text-4xl font-serif font-bold">Our Core Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {VALUES.map((v, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background p-8 hover:bg-card transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mb-4" />
                <h3 className="font-serif text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
            {/* Final cell */}
            <div className="bg-background p-8 bg-[radial-gradient(ellipse_at_center,_hsl(43_65%_48%_/_0.05)_0%,_transparent_70%)] flex items-center justify-center">
              <p className="font-serif text-2xl text-primary/30 font-bold text-center leading-tight">
                "Businesses compete on trust. And trust compounds over time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">How We Work</p>
            <h2 className="text-4xl font-serif font-bold">Our Frameworks</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Our work is guided by proprietary frameworks that create consistency, transparency, and better hiring outcomes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRAMEWORKS.map((f, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-border p-8 hover:border-primary/40 transition-colors bg-background">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mb-5" />
                <h3 className="font-serif text-lg font-bold mb-3">{f.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Who We Serve</p>
              <h2 className="text-4xl font-serif font-bold">Two communities. One mission.</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              <div className="bg-card p-10 hover:bg-muted/20 transition-colors">
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">For Employers</p>
                <p className="text-muted-foreground leading-relaxed">
                  Helping businesses across the United States, United Kingdom, Australia, Canada, and Singapore hire exceptional remote professionals with confidence.
                </p>
                <Link href="/hire-talent" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-6">
                  Start hiring →
                </Link>
              </div>
              <div className="bg-card p-10 hover:bg-muted/20 transition-colors">
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">For Professionals</p>
                <p className="text-muted-foreground leading-relaxed">
                  Helping talented individuals from Nigeria, South Africa, and Kenya build meaningful global careers through structured development and international employment opportunities.
                </p>
                <Link href="/candidates" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-6">
                  Start your career →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
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
            <h2 className="text-4xl font-serif font-bold mb-6">Build Your Team With Confidence.</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you're hiring your first remote professional or scaling an international team, we're ready to help you recruit exceptional people who make a lasting impact.
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
