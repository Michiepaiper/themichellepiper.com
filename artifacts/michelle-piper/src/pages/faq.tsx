import Layout from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Are classes online or in-person?",
    a: "All trainings are delivered live online via video call so you can join from anywhere in the world. Michelle is also available for in-person engagements and corporate workshops on request — use the contact form to discuss.",
  },
  {
    q: "How do I enroll and pay?",
    a: "Click 'Enroll Now' on any training, fill in your details, then transfer the fee to the Moniepoint account shown (Michelle Piper · 7064346878). Send proof of payment via WhatsApp and Michelle will confirm your seat and share the schedule.",
  },
  {
    q: "When do classes hold?",
    a: "All Academy trainings run twice weekly. Exact days and times for the next cohort are confirmed via WhatsApp once your payment is received, so we can pick a slot that works for you.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes — students who complete a training receive a Michelle Piper Academy certificate of completion. Specific accreditation details are shared at the start of each cohort.",
  },
  {
    q: "What if I miss a class?",
    a: "Recordings of every live session are shared with enrolled students, so you can catch up on your own time. Michelle is also available between classes for short clarifying questions.",
  },
  {
    q: "Is there a refund policy?",
    a: "Refund requests are reviewed case-by-case before the second class of a cohort. Reach out via WhatsApp or the contact form and Michelle will respond personally.",
  },
  {
    q: "Can you build my website / shoot my event?",
    a: "Yes. Full stack development (frontend and backend), photography, videography, and graphic design are all available as services. Use the contact form, pick the relevant service, and Michelle will follow up with a tailored quote.",
  },
  {
    q: "Do you train teams or organisations?",
    a: "Absolutely. Michelle delivers customised communication and public-speaking workshops for companies, churches, schools, and conferences worldwide. Mention your team size in the contact form.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px bg-primary w-12" />
              <span className="text-primary uppercase tracking-widest text-sm font-semibold">FAQ</span>
              <div className="h-px bg-primary w-12" />
            </div>
            <h2 className="text-4xl font-serif font-bold">Questions, Answered</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Can't find what you're looking for? Use the chat in the bottom-right or send a message.
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border bg-background rounded-none px-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
