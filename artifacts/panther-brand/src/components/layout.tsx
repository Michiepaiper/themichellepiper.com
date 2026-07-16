import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/mp-logo-transparent.png";

const NAV_LINKS = [
  { label: "Hire Talent", href: "/hire-talent" },
  { label: "For Candidates", href: "/candidates" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="The Michelle Piper" className="h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  location === href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button className="btn-gold text-primary-foreground font-medium tracking-wide px-6 text-sm">
                Book Consultation
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              <Button className="btn-gold text-primary-foreground font-medium w-full tracking-wide text-sm">
                Book Consultation
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-10 mb-14">

            {/* Brand */}
            <div className="md:col-span-2">
              <img src={logoImg} alt="The Michelle Piper" className="h-14 w-auto mb-2" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                Raising the standard of remote talent. Connecting exceptional businesses with exceptional professionals.
              </p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                michelllepiper@gmail.com
              </p>
            </div>

            {/* Hire Talent */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Hire Talent</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Hire Virtual Assistants", "Recruitment Process", "Industries We Serve", "Book Consultation"].map((item) => (
                  <li key={item}>
                    <Link href={item === "Book Consultation" ? "/contact" : "/hire-talent"} className="hover:text-foreground transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidates */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Candidates</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Join Our Talent Community", "Career Accelerator™", "Apply"].map((item) => (
                  <li key={item}>
                    <Link href="/candidates" className="hover:text-foreground transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Company</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  { label: "About", href: "/about" },
                  { label: "Insights", href: "/insights" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider-gold mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 The Michelle Piper. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="tracking-widest uppercase">Precision. Intelligence. Trust.</span>
              <a href="/" className="hover:text-primary transition-colors tracking-widest uppercase flex items-center gap-1.5 border border-primary/30 px-3 py-1.5 hover:border-primary/60">
                ↗ The Michelle Piper — Main Site
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
