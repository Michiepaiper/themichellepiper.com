import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import serviceSpeakingImg from "@/assets/images/service-speaking.png";
import serviceFrontendImg from "@/assets/images/service-frontend.png";
import serviceCinemaImg from "@/assets/images/service-cinema.png";
import speakingImg from "@/assets/images/speaking.png";

const SERVICES = [
  { title: "Diction & Elocution Coaching", desc: "Improve pronunciation, clarity, and confidence in speaking.", img: serviceSpeakingImg },
  { title: "Public Speaking Training", desc: "Develop confidence, overcome stage fright, and deliver impactful presentations.", img: speakingImg },
  { title: "Full Stack Development", desc: "Design and build responsive websites, web apps, and APIs — from pixel-perfect frontends to robust backends.", img: serviceFrontendImg },
  { title: "Cinematography & Creative", desc: "Videography, Photography (portraits, events), and Graphics Design (flyers, branding).", img: serviceCinemaImg },
];

export default function Services() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">Expertise & Services</h2>
            <p className="text-white/70 text-lg">
              Which of our services do you need? Contact us today and let's bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
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
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 relative z-20 bg-foreground">
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 mb-6 min-h-[3rem]">{service.desc}</p>
                  <Button
                    variant="outline"
                    className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs"
                    onClick={() => navigate(`/contact?service=${encodeURIComponent(service.title)}`)}
                  >
                    Contact Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
