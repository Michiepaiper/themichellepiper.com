import { useState } from "react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateContactSubmission,
  useCreateEnrollment,
  useListTestimonials,
  useCreateTestimonial,
  getListTestimonialsQueryKey,
} from "@workspace/api-client-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Menu, X, ArrowRight, Star, Mail, Phone } from "lucide-react";
import { SiInstagram, SiX, SiYoutube, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import heroImg from "@assets/a37a6281-35c5-43d1-afc8-d5b75f66a5c2_Original_1776848512649.jpeg";
const aboutImg = heroImg;
import serviceSpeakingImg from "@/assets/images/service-speaking.png";
import serviceFrontendImg from "@/assets/images/service-frontend.png";
import serviceCinemaImg from "@/assets/images/service-cinema.png";
import speakingImg from "@/assets/images/speaking.png";

import portWeb1 from "@/assets/images/portfolio-web1.png";
import portPhoto1 from "@/assets/images/portfolio-photo1.png";
import portVideo1 from "@/assets/images/portfolio-video1.png";
import portGraphic1 from "@/assets/images/portfolio-graphic1.png";

const SERVICE_OPTIONS = [
  "Diction & Elocution Coaching",
  "Public Speaking Training",
  "Frontend Development",
  "Cinematography & Creative",
  "Other",
];

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [contactService, setContactService] = useState("");

  const { data: testimonials = [] } = useListTestimonials();
  const createContact = useCreateContactSubmission();
  const createEnrollment = useCreateEnrollment();
  const createTestimonial = useCreateTestimonial();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
      e.currentTarget.reset();
      setContactService("");
    } catch {
      toast({
        title: "Could not send message",
        description: "Please try again or reach out via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      course: selectedCourse,
    };
    try {
      await createEnrollment.mutateAsync({ data: payload });
      toast({
        title: "Enrollment Received",
        description: `You're on the list for ${selectedCourse}. Details coming to your inbox.`,
      });
      setEnrollDialogOpen(false);
    } catch {
      toast({ title: "Could not submit enrollment", variant: "destructive" });
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
        description: "Your testimonial is now live on the site.",
      });
      setTestimonialDialogOpen(false);
    } catch {
      toast({ title: "Could not submit testimonial", variant: "destructive" });
    }
  };

  const openEnrollDialog = (course: string) => {
    setSelectedCourse(course);
    setEnrollDialogOpen(true);
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

      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border transition-all">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-serif text-xl font-bold tracking-widest cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            THE MICHELLE PIPER
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            {["About", "Services", "Trainings", "Speaking", "Portfolio", "Testimonials", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-primary transition-colors uppercase"
              >
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-6 flex flex-col space-y-4 shadow-lg">
            {["About", "Services", "Trainings", "Speaking", "Portfolio", "Testimonials", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left py-2 hover:text-primary transition-colors uppercase tracking-widest text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1">
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt="Michelle Piper" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-foreground/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/50 to-transparent" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <h2 className="text-primary font-sans uppercase tracking-[0.2em] text-sm mb-4">The Michelle Piper</h2>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-cream">
                Empowering Communication, Confidence & Digital Skills
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-xl">
                Michelle Piper is a communication coach, public speaking trainer, frontend developer, and creative professional dedicated to helping individuals build confidence, speak effectively, and develop valuable digital skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 font-serif tracking-wide"
                  onClick={() => scrollTo("trainings")}
                >
                  Explore Trainings
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none px-8 bg-transparent text-white border-white hover:bg-white hover:text-foreground font-serif tracking-wide"
                  onClick={() => scrollTo("contact")}
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {["About", "Services", "Trainings", "Speaking", "Portfolio", "Testimonials", "Contact"].map((item) => (
                <div
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="flex items-center justify-center p-4 border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer group text-center"
                >
                  <span className="font-serif tracking-widest text-xs uppercase group-hover:scale-105 transition-transform">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4" />
                  <img src={aboutImg} alt="Michelle Piper Portrait" className="relative z-10 w-full h-auto object-cover grayscale-[20%] contrast-125" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 space-y-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px bg-primary w-12" />
                  <span className="text-primary uppercase tracking-widest text-sm font-semibold">About Michelle</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-foreground">Transforming Expression.</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Michelle Piper is a passionate communication expert and digital creative focused on transforming how individuals express themselves and present their ideas to the world.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With expertise in diction and elocution, public speaking, frontend development, and creative media, she combines technical skill with powerful communication strategies.
                </p>
                <p className="text-foreground font-medium text-lg border-l-4 border-primary pl-6 py-2 mt-8">
                  Her mission is to empower individuals with confidence, clarity, and competence — whether on stage, online, or in professional environments.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-white mb-6">Expertise & Services</h2>
              <p className="text-white/70 text-lg">
                Which of our services do you need? Contact us today and let's bring your vision to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Diction & Elocution Coaching", desc: "Improve pronunciation, clarity, and confidence in speaking.", img: serviceSpeakingImg },
                { title: "Public Speaking Training", desc: "Develop confidence, overcome stage fright, and deliver impactful presentations.", img: speakingImg },
                { title: "Frontend Development", desc: "Design and build responsive, modern websites tailored to your needs.", img: serviceFrontendImg },
                { title: "Cinematography & Creative", desc: "Videography, Photography (portraits, events), and Graphics Design (flyers, branding).", img: serviceCinemaImg },
              ].map((service, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i}
                  className="group relative overflow-hidden bg-background/5 border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors z-10" />
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 relative z-20 bg-foreground">
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/70 mb-6 min-h-[3rem]">{service.desc}</p>
                    <Button
                      variant="outline"
                      className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs"
                      onClick={() => {
                        setContactService(service.title);
                        scrollTo("contact");
                      }}
                    >
                      Contact Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="trainings" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-16 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px bg-primary w-12" />
                  <span className="text-primary uppercase tracking-widest text-sm font-semibold">Academy</span>
                </div>
                <h2 className="text-4xl font-serif font-bold">Premium Trainings</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Diction & Elocution", desc: "Learn proper pronunciation, clarity, and professional speaking skills.", benefits: ["Accent neutralization", "Vocal projection", "Professional presence"] },
                { title: "Public Speaking Mastery", desc: "Build confidence, structure speeches, and speak with impact.", benefits: ["Overcome stage fright", "Audience engagement", "Speech structuring"] },
                { title: "Frontend Development", desc: "Learn HTML, CSS, and JavaScript with practical projects.", benefits: ["Modern frameworks", "Responsive design", "Portfolio building"] },
              ].map((training, i) => (
                <Card key={i} className="rounded-none border-border bg-background shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="bg-muted/50 pb-8 border-b border-border">
                    <CardTitle className="text-2xl font-serif mb-2">{training.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">{training.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {training.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-wider"
                      onClick={() => openEnrollDialog(training.title)}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="speaking" className="py-24 bg-background">
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
                  onClick={() => scrollTo("contact")}
                >
                  Book Michelle
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-24 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Creative Portfolio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">A curated selection of digital craftsmanship across web design, photography, videography, and graphic design.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {[
                { title: "Web Design", tag: "Frontend", img: portWeb1 },
                { title: "Editorial Portrait", tag: "Photography", img: portPhoto1 },
                { title: "Event Coverage", tag: "Videography", img: portVideo1 },
                { title: "Brand Identity", tag: "Graphic Design", img: portGraphic1 },
              ].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i}
                  className="group relative aspect-video overflow-hidden bg-muted cursor-pointer"
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                    <span className="text-primary text-xs uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.tag}</span>
                    <h3 className="text-white text-2xl font-serif transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-foreground text-white">
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

        <section id="contact" className="py-24 bg-muted/40 border-t border-border">
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
      </main>

      <footer className="bg-foreground text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-serif font-bold tracking-widest mb-6 text-cream">THE MICHELLE PIPER</h2>
              <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
                Empowering Communication, Confidence & Digital Skills. A premium brand dedicated to transforming expression.
              </p>
              <div className="flex gap-4">
                {[SiInstagram, SiX, FaLinkedinIn, SiYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors">
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
                    <button onClick={() => (item === "Home" ? window.scrollTo(0, 0) : scrollTo(item.toLowerCase()))} className="text-white/60 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
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
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 The Michelle Piper. All rights reserved.</p>
            <p className="mt-4 md:mt-0 tracking-widest uppercase text-xs">Designed with elegance.</p>
          </div>
        </div>
      </footer>

      <Dialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none border-border bg-background p-0 overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-serif font-bold">Enroll in Academy</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Take the next step in your professional journey with our premium trainings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEnrollSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Selected Course</label>
                <Input value={selectedCourse} readOnly className="rounded-none border-border bg-muted/50 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
                <Input required name="fullName" className="rounded-none border-border focus-visible:ring-primary" placeholder="Your name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email</label>
                  <Input required name="email" type="email" className="rounded-none border-border focus-visible:ring-primary" placeholder="Email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone</label>
                  <Input required name="phone" type="tel" className="rounded-none border-border focus-visible:ring-primary" placeholder="Phone number" />
                </div>
              </div>
              <Button
                type="submit"
                disabled={createEnrollment.isPending}
                className="w-full mt-4 rounded-none bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-serif tracking-widest uppercase py-6 transition-colors"
              >
                {createEnrollment.isPending ? "Submitting..." : "Confirm Enrollment"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={testimonialDialogOpen} onOpenChange={setTestimonialDialogOpen}>
        <DialogContent className="sm:max-w-[520px] rounded-none border-border bg-background p-0 overflow-hidden">
          <div className="h-2 bg-primary w-full" />
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-serif font-bold">Share Your Story</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Tell future clients how Michelle helped you. Your testimonial will appear on this page once submitted.
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
                {createTestimonial.isPending ? "Submitting..." : "Publish Testimonial"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
