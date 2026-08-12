import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/image_1784250886393.png";

const NAV_LINKS = [
  { label: "Hire Talent", href: "/hire-talent" },
  { label: "For Agents", href: "/agents" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const GREEN_DARK = "hsl(152 42% 10%)";
const GREEN_DEEP = "hsl(152 40% 8%)";
const GREEN_BORDER = "hsl(152 25% 18%)";
const TEXT_SAGE = "hsl(152 15% 70%)";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">

      {/* NAV — royal green */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ background: "hsl(152 42% 10% / 0.97)", borderColor: GREEN_BORDER }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src={logoImg} alt="The Michelle Piper" className="h-16 w-auto" style={{ mixBlendMode: "screen" }} />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  location === href ? "text-primary" : "hover:text-white"
                }`}
                style={{ color: location === href ? undefined : TEXT_SAGE }}
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

          <button
            className="md:hidden p-2 transition-colors hover:text-white"
            style={{ color: TEXT_SAGE }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-6 flex flex-col gap-6"
            style={{ background: GREEN_DARK, borderColor: GREEN_BORDER }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-wide transition-colors hover:text-white"
                style={{ color: TEXT_SAGE }}>
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

      {/* FOOTER — deep royal green */}
      <footer className="border-t mt-auto" style={{ background: GREEN_DEEP, borderColor: GREEN_BORDER }}>
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-10 mb-14">

            {/* Brand */}
            <div className="md:col-span-2">
              <img src={logoImg} alt="The Michelle Piper" className="h-24 w-auto mb-2" style={{ mixBlendMode: "screen" }} />
              <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: TEXT_SAGE }}>
                Raising the standard of remote talent. Connecting exceptional businesses with exceptional professionals.
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: TEXT_SAGE }}>
                michelllepiper@gmail.com
              </p>
            </div>

            {/* Hire Talent */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Hire Talent</p>
              <ul className="space-y-3 text-sm">
                {["Hire Virtual Assistants", "Recruitment Process", "Industries We Serve", "Book Consultation"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Book Consultation" ? "/contact" : "/hire-talent"}
                      className="transition-colors hover:text-white"
                      style={{ color: TEXT_SAGE }}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agents */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Agents</p>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Join Our Talent Community", href: "/talent-community" },
                  { label: "Career Accelerator", href: "/agents#accelerator" },
                  { label: "Apply", href: "/talent-community" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-white" style={{ color: TEXT_SAGE }}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-5">Company</p>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "About", href: "/about" },
                  { label: "Insights", href: "/insights" },
                  { label: "Contact", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="transition-colors hover:text-white" style={{ color: TEXT_SAGE }}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider-gold mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: TEXT_SAGE }}>
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
