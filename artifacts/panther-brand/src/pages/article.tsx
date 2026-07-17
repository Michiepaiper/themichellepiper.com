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
      "The best remote teams are not the ones with the best technology. They are the ones with the clearest communication, the strongest trust, and the most intentional leadership. Here is how businesses across the USA, UK, Australia, Canada, and France are building distributed teams that consistently outperform expectations.",
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
  {
    slug: "virtual-assistant-salary-guide-2026",
    tag: "Salary Guide",
    title: "Virtual Assistant Salary Guide 2026: What Does a VA Actually Cost?",
    readTime: "9 min read",
    intro:
      "One of the first questions every employer asks is: how much will this cost? The honest answer is that it depends — on the role, the skill level, the location of the candidate, and the complexity of the work. This guide breaks down what you can realistically expect to pay, what you get at each price point, and how to think about the return on investment.",
    sections: [
      {
        heading: "Why VA Pricing Varies So Much",
        body: "The Virtual Assistant market is not standardised. You will find rates that range from under $5 per hour to over $50 per hour, and both ends of that spectrum can be justified depending on what you are hiring for. A task-based data entry VA and a senior Executive Assistant managing a C-suite calendar are both called 'Virtual Assistants' — but they are entirely different hires. Treat salary benchmarks as a starting point, not a fixed rule.",
      },
      {
        heading: "General VA — What to Expect",
        body: "A general Virtual Assistant handles day-to-day administrative tasks: inbox management, calendar coordination, data entry, research, and basic customer communication. For African remote talent — Nigeria, Kenya, South Africa, Ghana — you can expect to pay between $400 and $900 per month for a full-time professional. Part-time arrangements typically range from $200 to $450 per month. At this level, strong communication skills, reliability, and tool proficiency matter far more than formal qualifications.",
        list: [
          "Full-time (160 hrs/month): $400 – $900/month",
          "Part-time (80 hrs/month): $200 – $450/month",
          "Hourly rate equivalent: $3.50 – $7.00/hr",
        ],
      },
      {
        heading: "Specialist VA — Higher Skill, Higher Rate",
        body: "Specialist VAs bring expertise in a defined area: social media management, content writing, bookkeeping, graphic design, customer support operations, or CRM management. These professionals command higher rates because the skill is less common and the value delivered is more direct. Expect to pay between $600 and $1,400 per month for full-time specialist support.",
        list: [
          "Full-time (160 hrs/month): $600 – $1,400/month",
          "Part-time (80 hrs/month): $350 – $750/month",
          "Typical roles: Social Media VA, Bookkeeping VA, Content VA, CRM Specialist",
        ],
      },
      {
        heading: "Executive Assistant — The Senior Tier",
        body: "An Executive Assistant operates at a different level entirely. They manage complex schedules, handle sensitive communication, coordinate across departments, and often act as a proxy for senior leadership. EA roles require greater judgement, more experience, and broader business understanding. Full-time EAs from Africa's professional talent pool typically range from $900 to $2,000+ per month depending on seniority and sector experience.",
        list: [
          "Full-time (160 hrs/month): $900 – $2,000+/month",
          "Part-time (80 hrs/month): $500 – $1,100/month",
          "Required: 3+ years relevant experience, exceptional communication, strategic capability",
        ],
      },
      {
        heading: "What Affects the Rate?",
        list: [
          "Experience level — more years, higher rate",
          "Skill specialisation — niche skills command a premium",
          "Tool proficiency — Salesforce, HubSpot, Notion, Asana all add value",
          "Language skills — multi-lingual candidates are worth more in international roles",
          "AI readiness — professionals who use AI tools effectively deliver more output per hour",
          "Communication quality — clear, professional, proactive communicators justify higher rates",
        ],
      },
      {
        heading: "How to Think About ROI",
        body: "The right question is not 'how much does a VA cost?' It is 'what is my time worth?' If you are billing at $150/hr and spending 20 hours a month on tasks a VA could handle, you are losing $3,000 in productivity every month. A $600/month VA that frees 20 hours of your time returns 5x its cost in your recaptured capacity — before you count the value of the actual work delivered. The maths is rarely complicated. The decision is almost always obvious once you run it.",
      },
      {
        heading: "Working with The Michelle Piper",
        body: "We provide salary transparency at every stage of our process. When we present a candidate, you will understand exactly what they earn, why the rate reflects their experience, and what you should expect in return. There are no hidden fees, no inflated markups, and no surprises. Our consultations are free — speak to us before you commit to anything.",
      },
    ],
  },
  {
    slug: "va-vs-full-time-employee",
    tag: "Hiring Guide",
    title: "Virtual Assistant vs Full-Time Employee: Which Is Right for Your Business?",
    readTime: "7 min read",
    intro:
      "Every growing business reaches this decision point: do you hire a Virtual Assistant or bring on a full-time employee? Both can deliver significant value. Both carry genuine costs. The right answer depends on what your business actually needs — and getting it wrong is expensive in either direction. This guide gives you a framework to make the right call.",
    sections: [
      {
        heading: "The Core Difference",
        body: "A Virtual Assistant is a remote professional — typically self-employed or employed through an agency — who provides defined support services. A full-time employee is a member of your team, usually office-based or hybrid, with a formal employment contract and the full range of associated obligations. The distinction matters because it affects cost, flexibility, tax liability, legal responsibility, and the depth of the working relationship.",
      },
      {
        heading: "When a Virtual Assistant Is the Right Choice",
        list: [
          "You need to free up your own time without adding permanent headcount",
          "The work is task-based, process-driven, or time-limited",
          "You want flexibility — scale hours up or down based on business demand",
          "Your budget does not yet support a full-time salary with benefits",
          "You need a specialist skill for part of the week, not full-time",
          "You are testing a new function before committing to a permanent hire",
          "You operate internationally and want talent in a specific time zone",
        ],
      },
      {
        heading: "When a Full-Time Employee Is the Right Choice",
        list: [
          "The role requires deep integration into company culture and decision-making",
          "You need someone physically present — client-facing, manufacturing, logistics",
          "The function is core to the business and must be protected long-term",
          "You need someone to grow with the company and take on increasing responsibility",
          "Local employment law requires a direct employment relationship for the work involved",
          "The role involves sensitive data or IP that requires strict employment protections",
        ],
      },
      {
        heading: "The True Cost Comparison",
        body: "The salary comparison is only the beginning. A full-time employee in the UK or USA typically costs 1.3–1.5x their base salary when you include employer National Insurance or payroll taxes, benefits, pension or 401k contributions, equipment, office space, onboarding time, and management overhead. A Virtual Assistant through a specialist agency eliminates most of those costs — and the placement, screening, and quality assurance are handled for you.",
      },
      {
        heading: "The Hybrid Answer",
        body: "Many businesses find that the right answer is both. A small leadership team of full-time employees focused on strategy and client relationships, supported by a team of high-quality VAs handling the operational workload. This model is how fast-growing businesses scale without the overhead of a large permanent headcount. It is deliberately lean, operationally efficient, and genuinely sustainable.",
      },
      {
        heading: "Our Honest Recommendation",
        body: "If you are unsure, start with a VA. The commitment is lower, the onboarding is faster, and the cost of getting it wrong is manageable. A great VA will either prove the concept — confirming that the role creates real value — or help you define what a full-time hire would actually need to do. Either way, you learn something valuable. Book a free consultation and we will help you think through the right structure for your business.",
      },
    ],
  },
  {
    slug: "how-to-write-a-va-job-description",
    tag: "Hiring Guide",
    title: "How to Write a Job Description That Attracts the Right Virtual Assistant",
    readTime: "6 min read",
    intro:
      "Most businesses that struggle to find a great VA have not failed at interviews or screening. They have failed at the job description. A vague brief produces vague applicants. A sharp, specific, well-written job description does the filtering for you — before a single application arrives. Here is exactly how to write one that works.",
    sections: [
      {
        heading: "Why Most JDs Fail",
        body: "The most common mistake employers make is writing a list of generic responsibilities rather than a clear picture of the actual role. 'Providing administrative support,' 'managing communications,' and 'assisting the team' tell a candidate almost nothing. A strong job description describes real tasks, real tools, real expectations, and real measures of success. If a candidate cannot picture what their Monday morning looks like from reading your JD, rewrite it.",
      },
      {
        heading: "The Five Things Every VA Job Description Must Include",
        list: [
          "1. The specific tasks — not 'admin support' but 'managing a CEO's inbox in Outlook, triaging 50–80 emails per day, drafting responses using templates'",
          "2. The hours and time zone — full-time or part-time, which hours, which overlap with your working day is required",
          "3. The tools they will use — list every platform: Gmail, Slack, Notion, Salesforce, Trello, Zoom, whatever applies",
          "4. The communication standard — how often, through which channels, and what response time you expect",
          "5. The measures of success — what does excellent performance look like at 30, 60, and 90 days?",
        ],
      },
      {
        heading: "Describe the Role, Not the Person",
        body: "Avoid lengthy lists of personal qualities like 'team player,' 'self-starter,' 'passionate,' and 'detail-oriented.' These phrases mean nothing and attract nothing useful. Instead, describe what the work requires. If the role involves managing multiple competing deadlines with minimal oversight, say that. If it requires proactive communication and regular reporting, say that. Candidates will self-select accurately when the role is described accurately.",
      },
      {
        heading: "Include the Salary or Day Rate",
        body: "Employers who hide the salary waste their own time. Candidates who apply without knowing the salary are often misaligned from the start. Include a range. Be transparent. It signals professionalism, filters out candidates outside your budget, and attracts the professionals who know their value and will deliver it.",
      },
      {
        heading: "A Simple Structure That Works",
        list: [
          "Opening paragraph: what the company does and why this role exists",
          "What you will do: 6–10 specific, concrete tasks",
          "What we use: tools, platforms, software",
          "What we expect: hours, communication cadence, response expectations",
          "What success looks like: measurable outcomes at 30/60/90 days",
          "What we offer: salary, flexibility, growth opportunity",
          "How to apply: clear instructions, including any screening task",
        ],
      },
      {
        heading: "The Screening Task",
        body: "Include a short, relevant task in the application process. It does not need to be complex — a three-paragraph summary of a document, a scheduling scenario, a brief research exercise. It tells you more about a candidate in five minutes than a CV does in five pages. Professionals who take it seriously are the ones worth interviewing. Those who skip it are not.",
      },
      {
        heading: "Need Help?",
        body: "At The Michelle Piper, we help employers build role briefs that work — before a search begins. When you work with us, we do this as part of our standard process. It is one of the reasons our placements last. Book a free consultation and let us help you define the role before you try to fill it.",
      },
    ],
  },
  {
    slug: "managing-remote-teams-across-time-zones",
    tag: "Remote Teams",
    title: "How to Manage a Remote Team Across Different Time Zones",
    readTime: "8 min read",
    intro:
      "Time zone differences are one of the most frequently cited concerns when businesses consider hiring remote talent. In practice, managed correctly, they are rarely the problem they appear to be — and sometimes they are a genuine advantage. Here is a practical guide to building a remote team that functions well regardless of where in the world your people are working from.",
    sections: [
      {
        heading: "Rethink the Problem",
        body: "The instinct is to treat time zones as an obstacle to coordination. The better framing is to treat them as a design constraint — something to build your working model around, not fight against. The businesses that struggle with time zones are the ones trying to replicate an office environment remotely. The ones that thrive are the ones that design async-first workflows from the start.",
      },
      {
        heading: "Decide What Must Be Synchronous",
        body: "Not everything needs to happen in real time. Most of it does not. Start by mapping your actual requirements: what genuinely needs live conversation, and what can be handled asynchronously? A brief weekly video call, an urgent client escalation, a strategic planning session — these require sync. Inbox management, research, report preparation, data entry, content scheduling — these do not. Build your model around that map.",
        list: [
          "Weekly team video call: the one non-negotiable sync",
          "Urgent matters: define a clear escalation protocol with expected response times",
          "Daily updates: async, written, sent at the start of each person's working day",
          "Project collaboration: async tools (Notion, Trello, Asana) with clear handoff notes",
        ],
      },
      {
        heading: "Establish Overlap Hours",
        body: "For most international remote arrangements, a 2–4 hour daily overlap between your working hours and your VA's is sufficient for real-time coordination when it's needed. Nigeria, Kenya, Ghana, and South Africa are all within 0–3 hours of UK time — making African remote professionals a natural fit for European and UK-based businesses. For US-based employers, an afternoon overlap can work effectively with evening hours in West Africa.",
      },
      {
        heading: "Documentation Is Your Infrastructure",
        body: "In a time zone distributed team, documentation is not optional. It is the operating system. Every process, every standing instruction, every frequently asked question should exist in writing — accessible to your team without needing to wait for you to come online. The better your documentation, the less your team needs to pause and wait. Invest the time to build it. It pays back every week.",
      },
      {
        heading: "Async Communication Done Right",
        body: "Asynchronous communication requires a different standard than real-time conversation. Messages must be clearer. Context must be included. Questions must be anticipated. Train yourself and your team to write messages that do not require a follow-up response to be understood. The discipline this builds — in clarity, in preparation, in precision — makes async teams frequently more productive than their office-based counterparts.",
        list: [
          "State context before the question or request",
          "Include all relevant information in a single message",
          "Be explicit about priority and deadline",
          "Confirm receipt when action has been completed",
          "Use loom or video messages for anything complex",
        ],
      },
      {
        heading: "Measure Outcomes, Not Hours",
        body: "Time zone management becomes far simpler when you shift from measuring activity to measuring results. If your VA completes the work to the standard you expect, the time they worked is not your concern. Define what done looks like. Set clear deliverables. Review outcomes at agreed intervals. The businesses that try to monitor hours across time zones create friction and erode trust. The ones that trust their hires to deliver — and hold them accountable for outcomes — get the best results.",
      },
    ],
  },
  {
    slug: "why-hire-african-remote-talent",
    tag: "Industry Research",
    title: "Why Smart Businesses Are Hiring Remote Talent From Africa",
    readTime: "8 min read",
    intro:
      "The global conversation about remote work has expanded significantly in the past five years. But one shift that has received far less attention than it deserves is the growing number of ambitious, globally-minded businesses choosing to build their remote teams with African talent. This is not a cost-cutting story. It is a quality story — and the businesses leading this trend are building a genuine competitive advantage.",
    sections: [
      {
        heading: "A Talent Pool That Is Vastly Underestimated",
        body: "Africa has over 400 million people between the ages of 15 and 35. It produces over 500,000 university graduates annually in Nigeria alone. Ghana, Kenya, South Africa, Rwanda, and Uganda are home to rapidly growing professional classes — English-speaking, technically literate, and increasingly experienced in working with international clients. The pool of qualified, professional, globally-competitive remote talent from Africa is not a niche. It is one of the largest untapped professional resources in the world.",
      },
      {
        heading: "English as the Professional Language",
        body: "Nigeria, Ghana, Kenya, South Africa, Uganda, and Rwanda all operate with English as an official or primary professional language. This is not simply a communication convenience — it means that education, professional training, legal systems, and corporate culture are structured in English. The African professionals we recruit are not working in a second language. They are working in the language in which they were educated, examined, and professionally trained.",
      },
      {
        heading: "Work Ethic and Professionalism",
        body: "The professionals who pursue international remote work opportunities from Africa are not doing so casually. They are ambitious, career-focused individuals who recognise the value of the opportunity and take it seriously. The competition for quality remote placements is significant — which means the professionals who succeed in that competition have already demonstrated drive, discipline, and the ability to operate to international standards. Our assessment process confirms this at every stage.",
      },
      {
        heading: "Time Zone Alignment",
        body: "Nigeria, Ghana, South Africa, Kenya, and Uganda all fall within GMT to GMT+3 — making them naturally aligned with UK, European, and Middle Eastern business hours. For US-based businesses, African talent operating in the morning can support evening operations in the Americas, creating genuine around-the-clock operational capacity without requiring unsociable hours from either party.",
      },
      {
        heading: "The Cost Advantage Is Real — But It Is Not the Story",
        body: "Yes, hiring remote professionals from Africa costs significantly less than equivalent hires in the USA, UK, or Australia. But framing this purely as a cost play misses the point. The real advantage is quality-adjusted value: professionals who are genuinely skilled, professionally trained, and deeply motivated — at a salary that is sustainable, fair, and significantly more competitive than your local market. The businesses that understand this are not cutting costs. They are accessing talent they could not otherwise afford.",
      },
      {
        heading: "What The Michelle Piper Does Differently",
        body: "We do not simply source candidates from Africa and present them to employers. We assess them against a rigorous proprietary framework — the Michelle Piper Talent Standard — that evaluates communication quality, professional capability, AI readiness, and remote-work fitness. We work with employers to define what excellence looks like for their specific role, and we present only candidates who meet that definition. The result is placements that last, partnerships that grow, and businesses that build teams they are genuinely proud of.",
      },
    ],
  },
  {
    slug: "onboarding-your-first-virtual-assistant",
    tag: "Remote Teams",
    title: "Onboarding Your First Virtual Assistant: A Practical Guide to the First 30 Days",
    readTime: "7 min read",
    intro:
      "Hiring a great Virtual Assistant is only half the work. The first 30 days determine whether the relationship succeeds or fails — and most of the time, when a VA placement does not work out, the root cause is onboarding, not the candidate. This guide gives you a practical, honest roadmap for the first month so that your investment delivers what it should.",
    sections: [
      {
        heading: "Before They Start: The Work You Do First",
        body: "The most common onboarding mistake is doing nothing before day one. By the time your new VA starts, you should already have: a written summary of the role and its priorities, documented processes for the key tasks they will own, access credentials set up and ready, and a clear week-one schedule. If you cannot describe the role in writing before they start, you are not ready to hire. Document first. Hire second.",
        list: [
          "Write a role brief: what you expect them to own in the first 30, 60, and 90 days",
          "Document your top 3–5 recurring processes with step-by-step instructions",
          "Set up all software access before day one — do not make them wait",
          "Prepare a week-one schedule with clear daily priorities",
          "Identify a single point of contact they can direct questions to",
        ],
      },
      {
        heading: "Week One: Foundation and Clarity",
        body: "Week one is not about productivity. It is about foundation. Your VA is learning your systems, your communication style, your preferences, and the way your business actually operates. Give them space to ask questions, document what they learn, and get comfortable with the tools. Daily check-ins in week one — even 15 minutes — make an enormous difference. They signal that you are invested, answer questions before they become blockers, and establish a communication rhythm from the start.",
      },
      {
        heading: "Week Two to Three: Structured Handover",
        body: "This is where you begin to transfer genuine ownership. Start with the lowest-stakes tasks — ones where a mistake is recoverable and the process is well-documented. Let them complete the task, review their output, give specific feedback, and repeat. The goal by the end of week three is for your VA to own several recurring tasks entirely — completing them without prompting, to the standard you expect, without requiring your involvement.",
      },
      {
        heading: "The 30-Day Review",
        body: "Hold a structured review at the 30-day mark. This is not a performance appraisal — it is a calibration conversation. Ask what is working well, what feels unclear, and what they think could be done more efficiently. Share your own assessment honestly: what you have been impressed by, what needs to improve, and what changes you want to make going forward. This conversation, done well, is the foundation of a long and productive working relationship.",
      },
      {
        heading: "Common Onboarding Mistakes to Avoid",
        list: [
          "Giving access to too many systems at once — focus on what they need in week one",
          "Expecting full productivity from day three — it takes 3–4 weeks to reach full output",
          "Communicating only when something goes wrong — positive feedback is not optional",
          "Failing to document processes and then blaming the VA for getting them wrong",
          "Changing priorities constantly in the first month — consistency is essential early",
          "Not scheduling regular check-ins — isolation kills motivation and performance",
        ],
      },
      {
        heading: "Building for the Long Term",
        body: "The best VA relationships do not peak in month one. They compound over time. As your VA learns your business, your preferences, and your standards, they become more valuable — not less. The businesses that treat VA relationships as long-term partnerships — investing in feedback, recognising strong performance, and giving increasing responsibility over time — consistently get the best outcomes. The ones that treat it as a transactional arrangement consistently underperform. The investment is the relationship. Start it right.",
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
