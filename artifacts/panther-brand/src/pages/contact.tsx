import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Check, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCreateContactSubmission } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const WHAT_TO_EXPECT = [
  "Your business and growth goals",
  "The role you're hiring for",
  "Skills and experience required",
  "Team structure",
  "Timeline",
  "Budget expectations",
  "Recruitment process",
  "Questions you may have",
];

const WHO_WE_WORK_WITH = [
  "Startups",
  "Small Businesses",
  "Marketing Agencies",
  "eCommerce Brands",
  "Professional Service Firms",
  "SaaS Companies",
  "Healthcare Practices",
  "Real Estate Businesses",
];

const FAQS = [
  { q: "Is the consultation really free?", a: "Yes. Our initial consultation is completely free and designed to help us understand your hiring needs." },
  { q: "How long does the consultation take?", a: "Approximately 30–45 minutes, depending on the complexity of your hiring requirements." },
  { q: "Do I need to know exactly who I want to hire?", a: "No. Many employers know the problem they need solved but are unsure which role is the best fit. We'll help you determine the right solution." },
  { q: "What happens after the consultation?", a: "If we're a good fit, we'll explain the next steps, timelines, and begin the recruitment process." },
  { q: "Do you recruit internationally?", a: "Yes. We recruit professionals from Nigeria, South Africa, and Kenya for employers in the United States, United Kingdom, Australia, Canada, and France." },
];

export default function Contact() {
  const { toast } = useToast();
  const createContact = useCreateContactSubmission();
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [hires, setHires] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const businessName = String(fd.get("businessName") ?? "");
    const contactName = String(fd.get("contactName") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const website = String(fd.get("website") ?? "");
    const message = String(fd.get("message") ?? "");

    if (!role || !country) {
      toast({ title: "Please complete all required fields", variant: "destructive" });
      return;
    }

    try {
      await createContact.mutateAsync({
        data: {
          fullName: `${contactName} (${businessName})`,
          email,
          phone: phone || "Not provided",
          service: `Recruitment Consultation — ${role} — ${country} — ${hires} hire(s)${website ? ` — ${website}` : ""}`,
          message: message || "No additional notes.",
        },
      });
      setSubmitted(true);
    } catch {
      toast({ title: "Could not submit. Please try again or reach out via email.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="hero-dark pt-16 pb-14 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(43_65%_48%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-2xl">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Book a Consultation</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-[1.05]" style={{ color: "hsl(0 0% 94%)" }}>
              Let's Build Your Team.
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "hsl(0 0% 52%)" }}>
              Every successful hire begins with a conversation. Whether you're hiring your first Virtual Assistant, expanding your remote team, or looking for specialised remote professionals — we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16">

            {/* LEFT INFO */}
            <div className="md:col-span-2 space-y-12">
              {/* What to Expect */}
              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">What to Expect</p>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Our consultation is designed to understand your business before we recommend solutions. During our conversation we'll discuss:
                </p>
                <ul className="space-y-2">
                  {WHAT_TO_EXPECT.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-5 border-l-2 border-primary/30 pl-3">
                  There is no obligation. If we're not the right fit, we'll tell you.
                </p>
              </motion.div>

              {/* Who We Work With */}
              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Who We Work With</p>
                <div className="grid grid-cols-2 gap-2">
                  {WHO_WE_WORK_WITH.map((type, i) => (
                    <div key={i} className="border border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary/30 transition-colors">
                      {type}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct Contact */}
              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Prefer Direct Contact?</p>
                <div className="space-y-4">
                  <a href="mailto:michelllepiper@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    michelllepiper@gmail.com
                  </a>
                  <a href="https://wa.me/message/OJT4VLVS4DP5M1" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <SiWhatsapp className="w-4 h-4 text-primary" />
                    Business WhatsApp
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <FaLinkedinIn className="w-4 h-4 text-primary" />
                    LinkedIn — The Michelle Piper
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    Monday–Friday · 09:00–17:00
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FORM */}
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-3">
              {submitted ? (
                <div className="border border-primary/30 p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center mx-auto mb-6">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Consultation Request Received</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    Thank you for reaching out. We'll review your request and be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Business Name *</label>
                      <Input required name="businessName" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="Your company name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Contact Name *</label>
                      <Input required name="contactName" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="Your full name" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Email Address *</label>
                      <Input required name="email" type="email" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Phone Number</label>
                      <Input name="phone" type="tel" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="Optional" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Company Website</label>
                      <Input name="website" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="Optional" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Country *</label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {["United States", "United Kingdom", "Australia", "Canada", "France", "UAE", "Ireland", "New Zealand", "Netherlands", "Germany", "Other"].map((c) => (
                            <SelectItem key={c} value={c} className="focus:bg-muted">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Which Role Are You Hiring? *</label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {["Virtual Assistant", "Executive Assistant", "Customer Support", "Marketing Assistant", "Sales Support", "Operations Assistant", "Project Coordinator", "Other"].map((r) => (
                            <SelectItem key={r} value={r} className="focus:bg-muted">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Number of Hires</label>
                      <Select value={hires} onValueChange={setHires}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {["1", "2–5", "6–10", "10+"].map((h) => (
                            <SelectItem key={h} value={h} className="focus:bg-muted">{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Tell Us About Your Hiring Needs</label>
                    <Textarea name="message" rows={4} className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 resize-none" placeholder="Describe the role, skills required, and any specific expectations..." />
                  </div>

                  <Button type="submit" disabled={createContact.isPending} size="lg"
                    className="w-full btn-gold text-primary-foreground font-medium tracking-wide py-6 text-base">
                    {createContact.isPending ? "Submitting..." : "Book My Free Consultation"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 section-cream border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
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
      <section className="py-28 section-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Let's Build Something Exceptional.</h2>
            <p className="text-muted-foreground text-lg mb-3">Every great business is built by great people.</p>
            <p className="text-muted-foreground text-lg mb-10">Let's help you find yours.</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
