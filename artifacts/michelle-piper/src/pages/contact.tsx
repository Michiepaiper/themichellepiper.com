import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useCreateContactSubmission } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
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
import { Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SERVICE_OPTIONS } from "@/lib/constants";

export default function Contact() {
  const { toast } = useToast();
  const createContact = useCreateContactSubmission();
  const [contactService, setContactService] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && SERVICE_OPTIONS.includes(service)) {
      setContactService(service);
    }
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: contactService,
      message: String(fd.get("message") ?? ""),
    };
    if (!payload.service) {
      toast({ title: "Please select a service", variant: "destructive" });
      return;
    }
    try {
      await createContact.mutateAsync({ data: payload });
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. Michelle will respond shortly.",
      });
      form.reset();
      setContactService("");
    } catch {
      toast({
        title: "Could not send message",
        description: "Please try again or reach out via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-serif font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-10">
                Available for bookings, trainings, and collaborations. Contact us today and let's get started.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-foreground">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Email</p>
                    <a href="mailto:michelllepiper@gmail.com" className="font-medium hover:text-primary transition-colors">michelllepiper@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-foreground">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Phone</p>
                    <a href="tel:+2349059808162" className="font-medium hover:text-primary transition-colors">+234 905 980 8162</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-foreground">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-primary">
                    <SiWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">WhatsApp</p>
                    <a href="https://wa.me/message/OJT4VLVS4DP5M1" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">Message Me directly</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 bg-background p-8 md:p-10 border border-border shadow-sm">
              <h3 className="text-2xl font-serif font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
                    <Input required name="fullName" className="rounded-none border-border bg-muted/20 focus-visible:ring-primary" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Address</label>
                    <Input required name="email" type="email" className="rounded-none border-border bg-muted/20 focus-visible:ring-primary" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone Number</label>
                    <Input required name="phone" type="tel" className="rounded-none border-border bg-muted/20 focus-visible:ring-primary" placeholder="Your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Service Needed</label>
                    <Select value={contactService} onValueChange={setContactService}>
                      <SelectTrigger className="rounded-none border-border bg-muted/20 focus:ring-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-border">
                        {SERVICE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Message</label>
                  <Textarea required name="message" className="rounded-none border-border bg-muted/20 min-h-[120px] focus-visible:ring-primary" placeholder="How can we help you?" />
                </div>
                <Button
                  type="submit"
                  disabled={createContact.isPending}
                  className="w-full rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-widest uppercase py-6"
                >
                  {createContact.isPending ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
