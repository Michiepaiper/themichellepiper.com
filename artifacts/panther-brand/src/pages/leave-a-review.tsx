import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useCreateTestimonial } from "@workspace/api-client-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function LeaveAReview() {
  const [reviewerType, setReviewerType] = useState<"client" | "agent">("client");
  const [form, setForm] = useState({ name: "", role: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateTestimonial();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const roleLabel = form.role
      ? form.role
      : reviewerType === "client" ? "Client" : "Agent";
    mutation.mutate(
      { name: form.name, role: roleLabel, text: form.text },
      { onSuccess: () => setSubmitted(true) }
    );
  }

  return (
    <Layout>
      <section className="min-h-screen section-cream py-28">
        <div className="container mx-auto px-6 max-w-2xl">

          {/* Back link */}
          <motion.div variants={fade} initial="hidden" animate="show">
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 cursor-pointer transition-colors"
                style={{ color: "hsl(43 65% 38%)" }}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to site
              </span>
            </Link>
          </motion.div>

          {submitted ? (
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              className="text-center py-20"
            >
              <CheckCircle2
                className="w-16 h-16 mx-auto mb-6"
                style={{ color: "hsl(43 65% 40%)" }}
              />
              <h1 className="font-serif text-4xl font-bold mb-4" style={{ color: "hsl(0 0% 8%)" }}>
                Thank You
              </h1>
              <p className="text-lg leading-relaxed mb-10 max-w-md mx-auto" style={{ color: "hsl(0 0% 38%)" }}>
                Your review has been received. It will be published on our site after a brief review — usually within 1–2 business days.
              </p>
              <Link href="/">
                <Button className="btn-gold text-[hsl(0_0%_4%)] font-medium px-10 py-5">
                  Return to Site
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <motion.div variants={fade} initial="hidden" animate="show" className="mb-14">
                <p
                  className="text-xs uppercase tracking-[0.3em] font-medium mb-5"
                  style={{ color: "hsl(43 65% 38%)" }}
                >
                  The Michelle Piper Recruitment
                </p>
                <h1
                  className="font-serif text-5xl md:text-6xl font-bold leading-[1.05] mb-6"
                  style={{ color: "hsl(0 0% 8%)" }}
                >
                  Share Your<br />Experience
                </h1>
                <p className="text-lg leading-relaxed" style={{ color: "hsl(0 0% 38%)" }}>
                  Whether you hired through us or were placed by us — we'd love to hear how it went. Your words help others make confident decisions.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                variants={fade}
                initial="hidden"
                animate="show"
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                {/* Role toggle */}
                <div>
                  <Label
                    className="text-xs uppercase tracking-widest font-medium block mb-3"
                    style={{ color: "hsl(0 0% 30%)" }}
                  >
                    I am a…
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["client", "agent"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setReviewerType(type)}
                        className="py-3.5 px-5 text-sm font-medium border transition-all"
                        style={{
                          borderColor: reviewerType === type
                            ? "hsl(43 65% 40%)"
                            : "hsl(40 20% 80%)",
                          background: reviewerType === type
                            ? "hsl(43 65% 48% / 0.1)"
                            : "transparent",
                          color: reviewerType === type
                            ? "hsl(43 65% 28%)"
                            : "hsl(0 0% 40%)",
                        }}
                      >
                        {type === "client" ? "Client / Employer" : "I'm an Agent"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label
                    className="text-xs uppercase tracking-widest font-medium block mb-2"
                    style={{ color: "hsl(0 0% 30%)" }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] h-12 focus-visible:ring-[hsl(43_65%_48%)]"
                  />
                </div>

                {/* Title / Role */}
                <div>
                  <Label
                    className="text-xs uppercase tracking-widest font-medium block mb-2"
                    style={{ color: "hsl(0 0% 30%)" }}
                  >
                    {reviewerType === "client" ? "Title & Company" : "Agency / Role"}
                  </Label>
                  <Input
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    placeholder={
                      reviewerType === "client"
                        ? "e.g. CEO, Acme Ltd · United Kingdom"
                        : "e.g. Recruitment Agent · The Michelle Piper"
                    }
                    className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] h-12 focus-visible:ring-[hsl(43_65%_48%)]"
                  />
                </div>

                {/* Review */}
                <div>
                  <Label
                    className="text-xs uppercase tracking-widest font-medium block mb-2"
                    style={{ color: "hsl(0 0% 30%)" }}
                  >
                    Your Review *
                  </Label>
                  <Textarea
                    required
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder={
                      reviewerType === "client"
                        ? "Tell us about your experience working with The Michelle Piper to hire remote talent…"
                        : "Tell us about your experience working as an agent with The Michelle Piper…"
                    }
                    rows={6}
                    className="bg-white border-[hsl(40_20%_80%)] text-[hsl(0_0%_8%)] placeholder:text-[hsl(0_0%_55%)] focus-visible:ring-[hsl(43_65%_48%)] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full btn-gold text-[hsl(0_0%_4%)] font-medium py-6 text-base tracking-wide"
                >
                  {mutation.isPending ? "Submitting…" : "Submit Review"}
                </Button>

                <p
                  className="text-xs text-center"
                  style={{ color: "hsl(0 0% 48%)" }}
                >
                  Reviews are moderated and published within 1–2 business days. We may lightly edit for spelling only.
                </p>
              </motion.form>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
