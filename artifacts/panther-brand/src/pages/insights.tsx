import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

const CATEGORIES = [
  {
    title: "Hiring Virtual Assistants",
    desc: "Everything employers need to hire with confidence.",
    topics: ["How to Hire a Virtual Assistant", "Virtual Assistant Interview Questions", "Skills Checklist", "Hiring Mistakes to Avoid"],
  },
  {
    title: "Remote Team Management",
    desc: "Build and manage high-performing remote teams.",
    topics: ["Managing Remote Employees", "Remote Team Communication", "Delegation Frameworks", "Performance Management"],
  },
  {
    title: "AI & The Future of Work",
    desc: "Artificial intelligence is changing the way businesses operate.",
    topics: ["AI for Virtual Assistants", "AI Productivity Tools", "Future of Remote Work", "Human + AI Collaboration"],
  },
  {
    title: "Career Development",
    desc: "Helping ambitious professionals become globally competitive.",
    topics: ["Virtual Assistant Career Guide", "CV Writing", "LinkedIn Optimisation", "Remote Career Growth"],
  },
  {
    title: "Salary Guides",
    desc: "Transparent salary information for employers and professionals.",
    topics: ["Virtual Assistant Salary Guide", "Executive Assistant Salary Guide", "Customer Support Salary Guide", "Country Comparisons"],
  },
  {
    title: "Industry Research",
    desc: "Original research, reports, and hiring trends.",
    topics: ["Remote Hiring Report", "VA Market Trends", "AI Adoption Report", "Employer Confidence Index"],
  },
];

const FEATURED = [
  {
    slug: "how-to-hire-a-virtual-assistant-2026",
    tag: "Hiring Guide",
    category: "Hiring Virtual Assistants",
    title: "How to Hire a Virtual Assistant in 2026",
    desc: "A complete guide to finding, interviewing, and hiring exceptional Virtual Assistants.",
    readTime: "8 min read",
  },
  {
    slug: "va-vs-full-time-employee",
    tag: "Hiring Guide",
    category: "Hiring Virtual Assistants",
    title: "Virtual Assistant vs Full-Time Employee",
    desc: "Which is right for your business? A clear framework to make the right call before you commit.",
    readTime: "7 min read",
  },
  {
    slug: "how-to-write-a-va-job-description",
    tag: "Hiring Guide",
    category: "Hiring Virtual Assistants",
    title: "How to Write a Job Description That Attracts the Right VA",
    desc: "A vague brief produces vague applicants. Here is exactly how to write a job description that works.",
    readTime: "6 min read",
  },
  {
    slug: "remote-hiring-checklist",
    tag: "Checklist",
    category: "Hiring Virtual Assistants",
    title: "Remote Hiring Checklist",
    desc: "Everything employers should prepare before making their next remote hire.",
    readTime: "4 min read",
  },
  {
    slug: "10-tasks-every-founder-should-delegate",
    tag: "Productivity",
    category: "Remote Team Management",
    title: "10 Tasks Every Founder Should Delegate",
    desc: "Learn how delegation creates capacity for growth and frees you to focus on what matters most.",
    readTime: "5 min read",
  },
  {
    slug: "building-high-performing-remote-teams",
    tag: "Remote Teams",
    category: "Remote Team Management",
    title: "Building High-Performing Remote Teams",
    desc: "The systems, communication habits, and leadership principles behind successful distributed teams.",
    readTime: "10 min read",
  },
  {
    slug: "managing-remote-teams-across-time-zones",
    tag: "Remote Teams",
    category: "Remote Team Management",
    title: "How to Manage a Remote Team Across Different Time Zones",
    desc: "Time zones are a design constraint, not a problem. Here is how to build a team that works across them.",
    readTime: "8 min read",
  },
  {
    slug: "onboarding-your-first-virtual-assistant",
    tag: "Remote Teams",
    category: "Remote Team Management",
    title: "Onboarding Your First Virtual Assistant: The First 30 Days",
    desc: "Most VA placements that fail do so in the first month. Here is exactly how to get it right.",
    readTime: "7 min read",
  },
  {
    slug: "ai-for-virtual-assistants",
    tag: "AI & Work",
    category: "AI & The Future of Work",
    title: "AI for Virtual Assistants",
    desc: "How modern assistants are using AI to improve productivity without replacing human judgement.",
    readTime: "7 min read",
  },
  {
    slug: "executive-assistant-vs-virtual-assistant",
    tag: "Career Comparison",
    category: "Career Development",
    title: "Executive Assistant vs Virtual Assistant",
    desc: "Which role is right for your business? An honest comparison to help you make the right decision.",
    readTime: "6 min read",
  },
  {
    slug: "virtual-assistant-salary-guide-2026",
    tag: "Salary Guide",
    category: "Salary Guides",
    title: "Virtual Assistant Salary Guide 2026: What Does a VA Actually Cost?",
    desc: "Honest salary benchmarks for general VAs, specialist VAs, and Executive Assistants — with ROI thinking.",
    readTime: "9 min read",
  },
  {
    slug: "why-hire-african-remote-talent",
    tag: "Industry Research",
    category: "Industry Research",
    title: "Why Smart Businesses Are Hiring Remote Talent From Africa",
    desc: "This is not a cost-cutting story. It is a quality story — and the data backs it up.",
    readTime: "8 min read",
  },
];

const FAQS = [
  { q: "How often do you publish new content?", a: "We regularly publish practical hiring advice, career guidance, market research, and remote work insights." },
  { q: "Who are these resources written for?", a: "Our content is designed for employers, founders, HR teams, hiring managers, Virtual Assistants, and remote professionals." },
  { q: "Can I share our articles?", a: "Yes. You're welcome to share our content provided it remains properly attributed." },
  { q: "Are your salary guides regularly updated?", a: "Yes. We review salary data periodically to reflect changes in the remote employment market." },
];

export default function Insights() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleCategoryClick = (title: string) => {
    setActiveCategory(prev => prev === title ? null : title);
    setTimeout(() => {
      document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const filteredArticles = activeCategory
    ? FEATURED.filter(a => a.category === activeCategory)
    : FEATURED;

  const hasArticles = (categoryTitle: string) =>
    FEATURED.some(a => a.category === categoryTitle);

  return (
    <Layout>
      {/* HERO */}
      <section className="hero-dark py-28 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(43_65%_48%_/_0.08)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-2xl mx-auto">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-6">Michelle Piper Insights</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-[1.05]" style={{ color: "hsl(0 0% 94%)" }}>
              Knowledge That Builds Better Teams.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              The best hiring decisions begin long before recruitment. Explore practical insights, expert guides, and research designed to help businesses hire smarter and build stronger remote teams.
            </p>
            <a href="#articles">
              <Button className="btn-gold text-primary-foreground font-medium tracking-wide px-8">
                Explore Our Latest Articles
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 section-black border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-4">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Browse by Topic</p>
            <h2 className="text-4xl font-serif font-bold">Featured Categories</h2>
          </motion.div>
          <motion.p variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-muted-foreground text-sm mb-12">
            Click a category to filter articles by topic.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {CATEGORIES.map((cat, i) => {
              const isActive = activeCategory === cat.title;
              const hasContent = hasArticles(cat.title);
              return (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => hasContent && handleCategoryClick(cat.title)}
                  className={`bg-background p-8 transition-colors group relative ${
                    hasContent ? "cursor-pointer hover:bg-card" : "cursor-default opacity-60"
                  } ${isActive ? "bg-card ring-1 ring-inset ring-primary/30" : ""}`}>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <X className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <h3 className={`font-serif text-xl font-bold mb-3 transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}>
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5">{cat.desc}</p>
                  <ul className="space-y-1.5">
                    {cat.topics.map((t, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/50" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  {hasContent ? (
                    <span className="text-xs text-primary mt-6 flex items-center gap-1">
                      {isActive ? "Showing articles ↓" : <>Explore <ArrowRight className="w-3 h-3" /></>}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground mt-6 flex items-center gap-1 italic">
                      Coming soon
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTERED ARTICLES */}
      <section id="articles" className="py-24 section-dark border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-4">Featured Reading</p>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-4xl font-serif font-bold">
                {activeCategory ?? "All Articles"}
              </h2>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-3 py-1.5 hover:text-primary hover:border-primary transition-colors"
                >
                  <X className="w-3 h-3" /> Clear filter
                </button>
              )}
            </div>
            {!activeCategory && (
              <p className="text-muted-foreground mt-3 max-w-lg">
                Practical hiring advice, career guidance, and remote work insights — written for employers and professionals who take quality seriously.
              </p>
            )}
          </motion.div>
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article, i) => (
                <motion.div key={article.slug} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}>
                  <Link href={`/insights/${article.slug}`} className="block border border-border p-7 hover:border-primary/40 transition-colors bg-background group">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-medium">{article.tag}</span>
                      <span className="text-[10px] text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{article.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-primary group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border border-border p-12 text-center bg-background">
              <p className="text-muted-foreground mb-2">No articles yet for this category.</p>
              <p className="text-muted-foreground text-sm">We publish regularly — check back soon.</p>
              <button
                onClick={() => setActiveCategory(null)}
                className="mt-6 text-xs text-primary hover:underline flex items-center gap-1 mx-auto"
              >
                <X className="w-3 h-3" /> View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* WHY WE SHARE KNOWLEDGE */}
      <section className="py-24 section-black border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 className="text-4xl font-serif font-bold mb-8" style={{ color: "hsl(43 80% 58%)" }}>Why We Share Knowledge</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                Recruitment shouldn't begin with a sales conversation. It should begin with better decisions.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                We believe informed employers make better hiring choices. We believe informed professionals build stronger careers.
              </p>
              <p className="font-serif font-bold text-xl" style={{ color: "hsl(43 80% 58%)" }}>
                Our goal isn't simply to help you hire. Our goal is to help you build a better business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-24 section-dark border-b border-border">

        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-5">Stay Informed</p>
              <h2 className="text-4xl font-serif font-bold mb-5">Subscribe to Michelle Piper Insights</h2>
              <p className="text-muted-foreground mb-10">
                Receive practical hiring advice, remote work trends, salary guides, and career resources. No spam. Only valuable insights.
              </p>
              {subscribed ? (
                <div className="border border-primary/40 p-6 text-center">
                  <p className="text-primary font-medium">Thank you for subscribing.</p>
                  <p className="text-muted-foreground text-sm mt-2">You'll hear from us with our first insights.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  />
                  <Button type="submit" className="btn-gold text-primary-foreground font-medium whitespace-nowrap px-6">
                    Subscribe
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 section-black border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="faq-item border border-border px-6 bg-background">
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

      {/* CTA */}
      <section className="py-28 section-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Better Knowledge Leads to Better Hiring.</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you're hiring your first Virtual Assistant or building a global remote team, the right information helps you make better decisions.
            </p>
            <Link href="/contact">
              <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-10">
                Book a Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
