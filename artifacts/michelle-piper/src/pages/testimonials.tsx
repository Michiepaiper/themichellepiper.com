import { useState } from "react";
import Layout from "@/components/layout";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import {
  useCreateTestimonial,
  getListTestimonialsQueryKey,
} from "@workspace/api-client-react";
const MAIN_TESTIMONIALS_KEY = ["/api/testimonials", "main"] as const;
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: testimonials = [] } = useQuery<{ id: number; name: string; role: string; text: string }[]>({
    queryKey: MAIN_TESTIMONIALS_KEY,
    queryFn: () => fetch(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/api/testimonials?site=main`).then(r => r.json()),
  });
  const createTestimonial = useCreateTestimonial();
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);

  const handleTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      role: String(fd.get("role") ?? "").trim(),
      text: String(fd.get("text") ?? "").trim(),
    };
    if (payload.text.length < 10) {
      toast({
        title: "Please share a bit more",
        description: "Testimonials need at least 10 characters.",
        variant: "destructive",
      });
      return;
    }
    try {
      await createTestimonial.mutateAsync({ data: payload });
      await queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
      toast({
        title: "Thank you for sharing",
        description: "Your testimonial has been submitted and is pending review.",
      });
      setTestimonialDialogOpen(false);
    } catch {
      toast({ title: "Could not submit testimonial", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px bg-primary w-12" />
                <span className="text-primary uppercase tracking-widest text-sm font-semibold">Voices</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-cream">Client Transformations</h2>
            </div>
            <Button
              variant="outline"
              className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs self-start"
              onClick={() => setTestimonialDialogOpen(true)}
            >
              Share Your Story
            </Button>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center text-white/60 py-16 border border-white/10">
              Be the first to share your story.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="border border-white/10 p-8 hover:border-primary/50 transition-colors bg-white/5">
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 text-lg font-serif italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold tracking-wide">{t.name}</p>
                    <p className="text-primary text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-12">Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto opacity-50 grayscale">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] border border-dashed border-muted-foreground flex items-center justify-center bg-muted/30">
                <span className="text-muted-foreground font-serif tracking-widest uppercase text-xs">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={testimonialDialogOpen} onOpenChange={setTestimonialDialogOpen}>
        <DialogContent className="sm:max-w-[520px] rounded-none border-border bg-background p-0 overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-serif font-bold">Share Your Story</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Tell future clients how Michelle helped you. Your testimonial will be reviewed before appearing on this page.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTestimonialSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Your Name</label>
                  <Input required name="name" className="rounded-none border-border focus-visible:ring-primary" placeholder="e.g. Adaeze O." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Role / Title</label>
                  <Input required name="role" className="rounded-none border-border focus-visible:ring-primary" placeholder="e.g. Corporate Executive" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Your Story</label>
                <Textarea
                  required
                  name="text"
                  minLength={10}
                  className="rounded-none border-border min-h-[140px] focus-visible:ring-primary"
                  placeholder="Share how working with Michelle transformed your communication, confidence, or skills."
                />
              </div>
              <Button
                type="submit"
                disabled={createTestimonial.isPending}
                className="w-full mt-4 rounded-none bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-serif tracking-widest uppercase py-6 transition-colors"
              >
                {createTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
