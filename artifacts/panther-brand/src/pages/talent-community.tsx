import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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
import { Check, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useCreateContactSubmission } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const WHAT_HAPPENS_NEXT = [
  "Your application is reviewed by our team",
  "You'll be assessed using our Michelle Piper Readiness Index",
  "Shortlisted agents are invited to interview",
  "Successful agents join our exclusive talent network",
  "You'll be matched to opportunities as they become available",
];

const ROLES = [
  "Virtual Assistant",
  "Executive Assistant",
  "Sales Agent",
  "Customer Support Specialist",
  "Marketing Assistant",
  "Operations Coordinator",
  "Project Coordinator",
  "Other",
];

const COUNTRIES = [
  "Nigeria",
  "South Africa",
  "Kenya",
  "Ghana",
  "Rwanda",
  "Uganda",
  "Other",
];

const EXPERIENCE_LEVELS = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

export default function TalentCommunity() {
  const { toast } = useToast();
  const createContact = useCreateContactSubmission();
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const linkedin = String(fd.get("linkedin") ?? "");
    const intro = String(fd.get("intro") ?? "");

    if (!country || !role || !experience) {
      toast({ title: "Please complete all required fields", variant: "destructive" });
      return;
    }

    try {
      await createContact.mutateAsync({
        data: {
          fullName,
          email,
          phone: phone || "Not provided",
          service: `AGENT APPLICATION — Role: ${role} — Country: ${country} — Experience: ${experience}${linkedin ? ` — LinkedIn: ${linkedin}` : ""}`,
          message: intro || "No additional information provided.",
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
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Join Our Talent Community</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-[1.05]" style={{ color: "hsl(0 0% 94%)" }}>
              Your Career.<br />
              <span className="italic text-gold-gradient">Global Reach.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "hsl(0 0% 52%)" }}>
              Take the first step towards a global remote career. Submit your details and we'll assess your profile for opportunities with employers across the UK, US, Australia, Canada, and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 section-dark border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-16">

            {/* LEFT INFO */}
            <div className="md:col-span-2 space-y-12">
              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">What Happens Next</p>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Once you submit your application, our team reviews every profile personally. Here's what to expect:
                </p>
                <ul className="space-y-3">
                  {WHAT_HAPPENS_NEXT.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-mono text-xs tracking-widest shrink-0 pt-0.5">0{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-6 border-l-2 border-primary/30 pl-3">
                  Joining our Talent Community is completely free. There are no fees at any stage.
                </p>
              </motion.div>

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
                </div>
              </motion.div>

              <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-5">Are You Hiring Instead?</p>
                <Link href="/contact">
                  <Button variant="outline" className="border-border hover:border-primary hover:text-primary text-sm">
                    Book a Consultation →
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* FORM */}
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-3">
              {submitted ? (
                <div className="border border-primary/30 p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center mx-auto mb-6">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Application Received</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    Thank you for applying. Our team will review your profile and be in touch if your experience matches an opportunity.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Full Name *</label>
                      <Input required name="fullName" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Email Address *</label>
                      <Input required name="email" type="email" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Phone Number *</label>
                      <Input required name="phone" type="tel" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="+234..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Country *</label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {COUNTRIES.map((c) => (
                            <SelectItem key={c} value={c} className="focus:bg-muted">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Role You're Applying For *</label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r} className="focus:bg-muted">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Years of Experience *</label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger className="bg-card border-border text-foreground focus:ring-primary">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {EXPERIENCE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level} className="focus:bg-muted">{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">LinkedIn Profile URL</label>
                    <Input name="linkedin" className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50" placeholder="https://linkedin.com/in/yourname (optional)" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Tell Us About Yourself</label>
                    <Textarea name="intro" rows={4} className="bg-card border-border text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Briefly describe your background, key skills, and what kind of opportunities you're looking for..." />
                  </div>

                  <Button type="submit" disabled={createContact.isPending} size="lg"
                    className="w-full btn-gold text-primary-foreground font-medium tracking-wide py-6 text-base">
                    {createContact.isPending ? "Submitting..." : "Join the Talent Community"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Free to apply. No fees at any stage. We'll only contact you when a matching opportunity arises.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
