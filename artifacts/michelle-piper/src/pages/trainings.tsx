import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import { useCreateEnrollment } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { TRAININGS, PAYMENT_DETAILS } from "@/lib/constants";

export default function Trainings() {
  const { toast } = useToast();
  const createEnrollment = useCreateEnrollment();
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<(typeof TRAININGS)[number] | null>(null);
  const [enrollStep, setEnrollStep] = useState<"form" | "payment">("form");

  const openEnrollDialog = (training: (typeof TRAININGS)[number]) => {
    setSelectedTraining(training);
    setEnrollStep("form");
    setEnrollDialogOpen(true);
  };

  const handleEnrollDialogChange = (open: boolean) => {
    setEnrollDialogOpen(open);
    if (!open) {
      setTimeout(() => {
        setEnrollStep("form");
        setSelectedTraining(null);
      }, 200);
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTraining) return;
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      course: `${selectedTraining.title} (${selectedTraining.price})`,
    };
    try {
      await createEnrollment.mutateAsync({ data: payload });
      setEnrollStep("payment");
    } catch {
      toast({ title: "Could not submit enrollment", variant: "destructive" });
    }
  };

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: `${label} copied` });
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-16 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px bg-primary w-12" />
                <span className="text-primary uppercase tracking-widest text-sm font-semibold">Academy</span>
              </div>
              <h2 className="text-4xl font-serif font-bold">Premium Trainings</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TRAININGS.map((training, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="rounded-none border-border bg-background shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <CardHeader className="bg-muted/50 pb-6 border-b border-border">
                    <CardTitle className="text-2xl font-serif mb-2">{training.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">{training.desc}</CardDescription>
                    <div className="mt-5 pt-5 border-t border-border/60">
                      <p className="text-3xl font-serif font-bold text-primary">{training.price}</p>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{training.duration}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {training.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-wider"
                      onClick={() => openEnrollDialog(training)}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={enrollDialogOpen} onOpenChange={handleEnrollDialogChange}>
        <DialogContent className="sm:max-w-[520px] rounded-none border-border bg-background p-0 overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <div className="p-8">
            {enrollStep === "form" ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-serif font-bold">Enroll in Academy</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base">
                    Reserve your seat. After submitting, you'll get payment instructions.
                  </DialogDescription>
                </DialogHeader>
                {selectedTraining && (
                  <div className="mb-6 p-4 bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{selectedTraining.duration}</p>
                      <p className="font-serif font-bold text-lg">{selectedTraining.title}</p>
                    </div>
                    <p className="text-2xl font-serif font-bold text-primary">{selectedTraining.price}</p>
                  </div>
                )}
                <form onSubmit={handleEnrollSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
                    <Input required name="fullName" className="rounded-none border-border focus-visible:ring-primary" placeholder="Your name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email</label>
                      <Input required name="email" type="email" className="rounded-none border-border focus-visible:ring-primary" placeholder="Email address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone</label>
                      <Input required name="phone" type="tel" className="rounded-none border-border focus-visible:ring-primary" placeholder="Phone number" />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={createEnrollment.isPending}
                    className="w-full mt-4 rounded-none bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-serif tracking-widest uppercase py-6 transition-colors"
                  >
                    {createEnrollment.isPending ? "Submitting..." : "Continue to Payment"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-2xl font-serif font-bold">Complete Your Payment</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base">
                    Your seat is reserved. Transfer the fee using the details below, then send proof of payment via WhatsApp to confirm.
                  </DialogDescription>
                </DialogHeader>
                {selectedTraining && (
                  <div className="mb-5 p-4 bg-foreground text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary">Amount Due</p>
                      <p className="font-serif text-sm text-white/70">{selectedTraining.title}</p>
                    </div>
                    <p className="text-2xl font-serif font-bold text-cream">{selectedTraining.price}</p>
                  </div>
                )}
                <div className="border border-border divide-y divide-border">
                  {[
                    { label: "Bank", value: PAYMENT_DETAILS.bankName },
                    { label: "Account Name", value: PAYMENT_DETAILS.accountName },
                    { label: "Account Number", value: PAYMENT_DETAILS.accountNumber },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">{row.label}</p>
                        <p className="font-medium font-serif text-lg">{row.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(row.value, row.label)}
                        className="text-xs uppercase tracking-widest text-primary hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full rounded-none bg-[#25D366] text-white hover:bg-[#1ebe57] font-serif tracking-widest uppercase py-6">
                    <a href={PAYMENT_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <SiWhatsapp className="w-5 h-5 mr-2" /> Send Proof on WhatsApp
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleEnrollDialogChange(false)}
                    className="w-full rounded-none border-border font-serif tracking-widest uppercase"
                  >
                    Done
                  </Button>
                </div>
                <p className="mt-5 text-xs text-muted-foreground text-center">
                  Once payment is confirmed, Michelle will reach out with your class schedule.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
