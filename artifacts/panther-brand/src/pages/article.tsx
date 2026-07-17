import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

type Article = {
  slug: string;
  tag: string;
  title: string;
  readTime: string;
  intro: string;
  sections: { heading?: string; body: string; list?: string[] }[];
};

const ARTICLES: Article[] = [
  {
    slug: "how-to-hire-a-virtual-assistant-2026",
    tag: "Hiring Guide",
    title: "How to Hire a Virtual Assistant in 2026",
    readTime: "8 min read",
    intro:
      "Hiring a Virtual Assistant is one of the highest-leverage decisions a growing business can make. Done well, it returns hours to your week, reduces operational bottlenecks, and creates the capacity to focus on what drives real growth. Done poorly, it creates frustration, wasted time, and avoidable expense. This guide walks you through every stage of the process.",
    sections: [
      {
        heading: "Step 1: Get Clear on What You Need",
        body: "Before you hire anyone, define the role. Many employers make the mistake of starting with 'I need a VA' rather than 'here's exactly what I need done.' List every task you want to hand over. Group them by skill type — administrative, communication, technical, creative. This list will form the basis of your job description.",
        list: [
          "Calendar and inbox management",
          "Travel and appointment booking",
          "Data entry and CRM management",
          "Research and reporting",
          "Document preparation and formatting",
          "Customer communication and support",
        ],
      },
      {
        heading: "Step 2: Define the Role Clearly",
        body: "Write a clear role brief that covers: the tasks involved, the hours required, the tools and software used in your business, the communication expectations, and the qualities that matter most to you. Vague briefs attract vague applicants. Specific briefs attract professionals who can genuinely do the job.",
      },
      {
        heading: "Step 3: Assess for Quality, Not Just Experience",
        body: "Experience is a starting point, not the full picture. Many excellent remote professionals have strong transferable skills but limited formal VA experience. What matters most is communication ability, professionalism, reliability, AI readiness, and a genuine willingness to learn. At The Michelle Piper, our assessment process evaluates all five before any candidate is recommended.",
      },
      {
        heading: "Step 4: Interview with Intention",
        body: "A good interview reveals more than a CV. Ask situational questions that test problem-solving, communication clarity, and how candidates handle pressure. Give a small practical task relevant to the role — a short writing exercise, a research task, or a scheduling challenge. This shows you how they work, not just how they speak.",
        list: [
          "Describe a situation where you managed competing priorities.",
          "How do you handle unclear instructions from a manager?",
          "Which tools do you use to stay organised and productive?",
          "Tell me about a time you identified and resolved a problem independently.",
        ],
      },
      {
        heading: "Step 5: Set Up for Success",
        body: "Once you've selected your hire, onboarding determines whether the relationship works. Document your processes. Set clear expectations from week one. Hold regular check-ins in the early weeks. Invest time at the start, and it will save you significantly in the long run. The best VA relationships are partnerships built on communication, trust, and consistent feedback.",
      },
      {
        heading: "Why Work with a Specialist Recruiter?",
        body: "Finding a great VA independently takes weeks of advertising, screening, and interviewing. A specialist recruitment partner does this work for you — screening for quality, assessing for the right skills, and presenting only candidates who are genuinely ready. The Michelle Piper exists to make that process faster, safer, and more successful for the businesses we work with.",
      },
    ],
  },
  {
    slug: "10-tasks-every-founder-should-delegate",
    tag: "Productivity",
    title: "10 Tasks Every Founder Should Delegate",
    readTime: "5 min read",
    intro:
      "Growth requires leverage. The fastest-growing founders and business owners understand a simple truth: the things only they can do — strategy, leadership, relationships — must be protected at all costs. Everything else should be delegated. Here are ten tasks that most founders should hand over immediately.",
    sections: [
      {
        heading: "1. Inbox Management",
        body: "The average professional spends over two hours a day managing email. A skilled VA can filter, prioritise, draft responses, and flag what truly needs your attention — giving you back hours every week.",
      },
      {
        heading: "2. Calendar Coordination",
        body: "Scheduling meetings, managing conflicts, and coordinating across time zones is time-consuming and repetitive. Delegating calendar management keeps your day structured without consuming your morning.",
      },
      {
        heading: "3. Travel Planning",
        body: "Flights, hotels, ground transport, and itinerary management. Your VA handles the logistics. You arrive prepared.",
      },
      {
        heading: "4. Research",
        body: "Market research, competitor analysis, supplier comparisons, lead research — a great VA can deliver structured summaries that help you make faster, better-informed decisions.",
      },
      {
        heading: "5. Data Entry and CRM Management",
        body: "Keeping your CRM accurate and up to date is essential to sales and operations. It is also one of the most transferable tasks. Delegate it without hesitation.",
      },
      {
        heading: "6. Social Media Scheduling",
        body: "Content creation requires your voice. Scheduling, posting, and responding to comments does not. A VA can manage the operational side of your social presence while you focus on the ideas.",
      },
      {
        heading: "7. Invoicing and Basic Bookkeeping",
        body: "Chasing payments, raising invoices, and maintaining financial records can be handled by a trained VA, freeing you to focus on revenue generation rather than revenue administration.",
      },
      {
        heading: "8. Customer Follow-Up",
        body: "Following up with prospects, clients, and leads is essential — but it is process-driven and repetitive. A VA with strong communication skills can handle this professionally and consistently.",
      },
      {
        heading: "9. Meeting Preparation and Minutes",
        body: "Preparing agendas, briefing documents, and post-meeting summaries are high-value support tasks that rarely require the founder's direct involvement.",
      },
      {
        heading: "10. Reporting and Analytics",
        body: "Collating data, formatting reports, and building dashboards from your tools can be delegated entirely. You review the insights. Your VA produces the document.",
      },
      {
        heading: "The Bottom Line",
        body: "Delegation is not about reducing your involvement. It is about redirecting your involvement to where it matters most. The founders who scale fastest are not the ones who work hardest. They are the ones who leverage best.",
      },
    ],
  },
  {
    slug: "executive-assistant-vs-virtual-assistant",
    tag: "Career Comparison",
    title: "Executive Assistant vs Virtual Assistant",
    readTime: "6 min read",
    intro:
      "The distinction between an Executive Assistant and a Virtual Assistant is frequently misunderstood — and the confusion leads to misaligned hires. Both roles provide essential support, but they differ in scope, seniority, and the type of value they deliver. This comparison will help you determine which role is right for your business.",
    sections: [
      {
        heading: "What is a Virtual Assistant?",
        body: "A Virtual Assistant (VA) is a remote professional who provides administrative, operational, or specialist support to businesses. VAs typically handle task-based, process-driven work: inbox and calendar management, research, data entry, customer communication, social media scheduling, and similar functions. They are extremely valuable for founders and small businesses looking to free up time and increase operational capacity.",
      },
      {
        heading: "What is an Executive Assistant?",
        body: "An Executive Assistant (EA) operates at a higher level of seniority, typically working directly with C-suite executives, founders, or senior leadership. Beyond administrative support, an EA is a strategic partner — managing complex schedules, acting as a gatekeeper, handling sensitive communication, coordinating across departments, and often representing the executive in certain contexts. EAs require stronger judgement, greater autonomy, and broader business understanding.",
      },
      {
        heading: "Key Differences",
        list: [
          "Scope: VAs focus on specific, defined tasks. EAs take a broader, more strategic view of the executive's needs.",
          "Seniority: VAs are often early-career professionals. EAs bring several years of relevant experience.",
          "Autonomy: VAs operate with clear instructions. EAs regularly exercise independent judgement.",
          "Relationship: VAs may support multiple clients. EAs typically work exclusively for one executive.",
          "Salary: EAs command higher remuneration reflecting their greater responsibilities.",
        ],
      },
      {
        heading: "Which Role Do You Need?",
        body: "If you need reliable, high-quality support for defined operational tasks — calendar management, inbox, research, data, customer support — a Virtual Assistant is your best fit. If you need a trusted professional who can manage your world, handle complex priorities, and think strategically on your behalf, an Executive Assistant is the right choice.",
      },
      {
        heading: "Our Recommendation",
        body: "Many growing businesses start with a VA and progress to an EA as their needs increase. Either way, the quality of the hire matters more than the title. A great VA outperforms a poor EA every time. At The Michelle Piper, we assess both roles to the same exacting standard before any recommendation is made.",
      },
    ],
  },
  {
    slug: "ai-for-virtual-assistants",
    tag: "AI & Work",
    title: "AI for Virtual Assistants: Productivity Without Losing the Human Edge",
    readTime: "7 min read",
    intro:
      "Artificial intelligence has fundamentally changed the tools available to remote professionals. The Virtual Assistants and Executive Assistants who understand how to work alongside AI — without being replaced by it — are the professionals businesses will compete to hire in the years ahead. Here is what AI readiness really means in practice.",
    sections: [
      {
        heading: "What AI-Ready Actually Means",
        body: "Being AI-ready does not mean knowing how to code or build AI systems. It means understanding how to use AI tools intelligently to become faster, more accurate, and more valuable. An AI-ready VA uses the right tool for the right task, understands the limits of automated output, and always applies human judgement before delivering work to a client.",
      },
      {
        heading: "The Essential AI Tools for Remote Professionals",
        list: [
          "ChatGPT and Claude — for drafting, summarising, brainstorming, and structuring communication",
          "Notion AI — for organising information, building knowledge bases, and managing projects",
          "Grammarly — for professional communication quality across email and documents",
          "Otter.ai — for meeting transcription and summary generation",
          "Zapier — for automating repetitive workflows across tools",
          "Canva AI — for producing professional visual content quickly",
        ],
      },
      {
        heading: "Where AI Enhances VA Work",
        body: "AI accelerates the production of first drafts — emails, reports, meeting summaries, social content. It organises information, flags priorities, and reduces the time spent on repetitive formatting tasks. The most effective remote professionals use AI to clear time for higher-value work: communication, judgement, relationships, and problem-solving.",
      },
      {
        heading: "Where Human Judgement Remains Essential",
        body: "AI cannot read tone, navigate sensitive relationships, exercise discretion, or adapt to unexpected situations with genuine intelligence. These capabilities — the ones that make a great VA irreplaceable — remain distinctly human. Businesses do not hire great Virtual Assistants despite AI. They hire great Virtual Assistants because of the judgement AI cannot replicate.",
      },
      {
        heading: "The Michelle Piper Readiness Standard",
        body: "Every professional in our talent network is assessed for AI readiness as a core criterion. We evaluate their working knowledge of relevant tools, their ability to integrate AI into their workflow appropriately, and — critically — their judgement in knowing when not to rely on AI. This is the standard that makes our candidates globally competitive.",
      },
    ],
  },
  {
    slug: "building-high-performing-remote-teams",
    tag: "Remote Teams",
    title: "Building High-Performing Remote Teams",
    readTime: "10 min read",
    intro:
      "The best remote teams are not the ones with the best technology. They are the ones with the clearest communication, the strongest trust, and the most intentional leadership. Here is how businesses across the USA, UK, Australia, Canada, and Singapore are building distributed teams that consistently outperform expectations.",
    sections: [
      {
        heading: "Start with Intentional Hiring",
        body: "Every high-performing remote team begins with deliberate hiring. Remote work requires a different profile to office work. Self-discipline, proactive communication, technical proficiency, and the ability to manage time independently are not optional extras — they are baseline requirements. Hire for these qualities first. Skills can develop. Character is much harder to change.",
      },
      {
        heading: "Build Communication Rituals",
        body: "Without the natural communication that happens in an office, remote teams need structure. Establish clear rhythms: daily async check-ins, weekly video calls, monthly reviews. Define which channels are used for what type of communication. Make expectations explicit — response times, availability windows, how to escalate urgently. Clarity prevents friction.",
        list: [
          "Daily async update — 3-5 bullet points shared at the start of each working day",
          "Weekly video call — priorities, blockers, progress review",
          "Monthly one-on-one — development, feedback, relationship maintenance",
          "Clear escalation channel — for urgent matters requiring immediate response",
        ],
      },
      {
        heading: "Invest in Onboarding",
        body: "The first 30 days of any remote hire determine whether they succeed. Document your processes before your new hire starts. Assign a single point of contact for questions. Hold daily check-ins in week one, then weekly from week two. Invest the time early. It returns exponentially.",
      },
      {
        heading: "Give Feedback Consistently",
        body: "Remote professionals often receive too little feedback and too much assumption. Regular, specific feedback — both positive and developmental — is what separates remote teams that grow from those that stagnate. Make feedback a consistent practice, not an annual event.",
      },
      {
        heading: "Build Trust Through Outcomes",
        body: "The strongest remote teams are outcomes-focused rather than hours-focused. Define what success looks like. Measure results, not activity. Give professionals the autonomy to deliver in their way — within clear standards. Trust is built through consistent delivery. Micromanagement destroys it.",
      },
      {
        heading: "The Michelle Piper Difference",
        body: "When businesses work with us, they do not just get a candidate. They get a professional who has been assessed for remote-work readiness, coached on professional communication standards, and supported through their early weeks. We are invested in the long-term success of every placement we make — because our reputation is built on outcomes, not on introductions.",
      },
    ],
  },
  {
    slug: "remote-hiring-checklist",
    tag: "Checklist",
    title: "Remote Hiring Checklist: Everything to Prepare Before Your Next Hire",
    readTime: "4 min read",
    intro:
      "A structured hiring process produces better results than an unstructured one — every time. Before you post your next role, run through this checklist. It will sharpen your brief, strengthen your interviews, and set your new hire up for success from day one.",
    sections: [
      {
        heading: "Before You Post",
        list: [
          "Define the specific tasks the role will own — not a vague job description",
          "Establish the hours required and the time zone expectations",
          "List the tools and software the candidate must know or learn",
          "Set a clear salary range or hourly rate",
          "Identify the skills that are essential vs. nice-to-have",
          "Decide on the communication channels you will use for the role",
        ],
      },
      {
        heading: "During Screening",
        list: [
          "Review CVs for structure, grammar, and relevant experience",
          "Check for specificity — great candidates describe real results, not just responsibilities",
          "Look for remote work experience and evidence of self-management",
          "Verify that communication skills are clear and professional in written form",
          "Shortlist no more than five candidates for interview",
        ],
      },
      {
        heading: "During Interviews",
        list: [
          "Ask situational questions, not theoretical ones",
          "Give a small, relevant practical task to complete ahead of or during the interview",
          "Assess communication quality, not just content — how they say things matters",
          "Ask how they manage their time when working independently",
          "Discuss expectations, process, and communication openly",
        ],
      },
      {
        heading: "Before Onboarding",
        list: [
          "Document all key processes the new hire will be responsible for",
          "Set up the tools and access they will need on day one",
          "Prepare a clear week-one schedule",
          "Assign a single point of contact for questions",
          "Schedule daily check-ins for the first two weeks",
        ],
      },
      {
        heading: "After Onboarding",
        list: [
          "Hold a 30-day review — what is working, what needs to change",
          "Provide specific, actionable feedback regularly",
          "Increase autonomy progressively as trust is established",
          "Recognise strong performance explicitly — remote professionals need to hear it",
          "Review the arrangement after 90 days and adjust if needed",
        ],
      },
      {
        heading: "Working with The Michelle Piper",
        body: "If you would like support with your remote hiring process, The Michelle Piper provides structured, quality-focused recruitment for businesses hiring from Nigeria, South Africa, Kenya, Ghana, Rwanda, and Uganda. Our consultations are free. Our process is thorough. Our standard is the highest in the market.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export default function Article() {
  const params = useParams<{ slug: string }>();
  const article = getArticle(params.slug ?? "");

  if (!article) {
    return (
      <Layout>
        <section className="py-36 text-center">
          <h1 className="font-serif text-4xl font-bold mb-6">Article Not Found</h1>
          <Link href="/insights">
            <Button className="btn-gold text-primary-foreground">← Back to Insights</Button>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ARTICLE HERO */}
      <section className="py-24 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(43_65%_48%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
          </Link>
          <motion.div variants={fade} initial="hidden" animate="show">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-primary font-medium border border-primary/30 px-2.5 py-1">{article.tag}</span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground tracking-wide"><Clock className="w-3 h-3" /> {article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-[1.08]">{article.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/40 pl-6">{article.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-14">
            {article.sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {section.heading && (
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-5 text-foreground">{section.heading}</h2>
                )}
                {section.body && (
                  <p className="text-muted-foreground text-base leading-relaxed">{section.body}</p>
                )}
                {section.list && (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-5">Ready to Take the Next Step?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Start with a Free Consultation.</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Whether you're hiring your first remote professional or scaling your team globally, we're here to help you do it right.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="btn-gold text-primary-foreground font-medium tracking-wide px-8">
                  Book a Free Consultation
                </Button>
              </Link>
              <Link href="/insights">
                <Button size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary gap-2">
                  More Insights <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
