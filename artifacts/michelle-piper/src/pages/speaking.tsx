import { useLocation } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function Speaking() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="bg-foreground text-white p-8 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-cream">Speaking & Engagements</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
                Michelle Piper is available for speaking engagements, workshops, and training sessions focused on communication, confidence, and personal development. Command the room at your next event.
              </p>
              <Button
                size="lg"
                className="rounded-none bg-primary text-primary-foreground hover:bg-white hover:text-foreground font-serif tracking-widest text-lg px-10 py-6"
                onClick={() => navigate("/contact")}
              >
                Book Michelle
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
