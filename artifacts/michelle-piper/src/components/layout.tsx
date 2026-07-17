import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { SiInstagram, SiX, SiYoutube, SiWhatsapp } from "react-icons/si";
import logoImg from "@assets/image_1784250886393.png";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatWidget from "@/components/chat-widget";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const NAV_ITEMS = ["About", "Services", "Trainings", "Speaking", "Portfolio", "Testimonials", "FAQ", "Contact"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { toast } = useToast();
  const subscribeNewsletter = useSubscribeNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) return;
    try {
      await subscribeNewsletter.mutateAsync({ data: { email } });
      toast({ title: "You're subscribed", description: "Thanks — you'll hear about new cohorts and offers." });
      e.currentTarget.reset();
    } catch {
      toast({ title: "Could not subscribe", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground">
      <a
        href="https://wa.me/message/OJT4VLVS4DP5M1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-6 h-6" />
      </a>

      <ChatWidget />

      <nav className="sticky top-0 z-40 bg-foreground/95 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0">
            <img src={logoImg} alt="The Michelle Piper" className="h-16 w-auto" style={{ mixBlendMode: "screen" }} />
            <span className="hidden lg:block text-white font-serif font-bold tracking-widest uppercase text-sm leading-tight">
              The Michelle<br />Piper
            </span>
          </Link>
          <div className="hidden md:flex space-x-6 text-sm font-medium tracking-wide">
            {NAV_ITEMS.map((item) => {
              const href = `/${item.toLowerCase()}`;
              const isActive = location === href;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`transition-colors uppercase text-xs tracking-widest ${isActive ? "text-primary" : "text-white/60 hover:text-white"}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <a
            href="/recruitment/"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 shrink-0"
          >
            Recruitment ↗
          </a>
          <button className="md:hidden p-2 text-white/70 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-foreground border-b border-white/10 py-4 px-6 flex flex-col space-y-4 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-left py-2 text-white/60 hover:text-primary transition-colors uppercase tracking-widest text-sm"
              >
                {item}
              </Link>
            ))}
            <a href="/recruitment/" className="text-primary border border-primary/40 px-4 py-2 text-xs tracking-widest uppercase text-center">
              Recruitment ↗
            </a>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-foreground text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="border border-white/10 p-8 md:p-10 mb-12 bg-white/[0.03]">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:flex-1">
                <h3 className="text-2xl font-serif font-bold text-cream mb-2">Stay in the loop</h3>
                <p className="text-white/60 text-sm max-w-md">
                  Be first to hear about new cohorts, free workshops, and behind-the-scenes from Michelle.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto md:min-w-[380px] gap-2">
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="rounded-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  disabled={subscribeNewsletter.isPending}
                  className="rounded-none bg-primary text-primary-foreground hover:bg-cream hover:text-foreground font-serif tracking-widest uppercase text-xs px-6"
                >
                  {subscribeNewsletter.isPending ? "..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <img src={logoImg} alt="The Michelle Piper" className="h-20 w-auto mb-6" style={{ mixBlendMode: "screen" }} />
              <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
                Empowering Communication, Confidence & Digital Skills. A premium brand dedicated to transforming expression.
              </p>
              <div className="flex gap-4">
                {[SiInstagram, SiX, FaLinkedinIn, SiYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-primary text-sm uppercase tracking-widest font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {["Home", "Services", "Trainings", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/recruitment/"
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-[10px] border border-amber-400/50 text-amber-400 px-1.5 py-0.5 uppercase tracking-widest">New</span>
                    The Michelle Piper Recruitment
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary text-sm uppercase tracking-widest font-semibold mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li>michelllepiper@gmail.com</li>
                <li>+234 905 980 8162</li>
                <li>Available worldwide for remote & travel engagements.</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-white/40 text-sm flex flex-col md:flex-row justify-between items-center gap-3">
            <p>© 2026 The Michelle Piper. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a
                href={`${import.meta.env.BASE_URL}admin`}
                className="tracking-widest uppercase text-xs hover:text-primary transition-colors"
              >
                Admin
              </a>
              <p className="tracking-widest uppercase text-xs">Designed with elegance.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
