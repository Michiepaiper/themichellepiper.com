import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/booking-dialog";
import heroImg from "@assets/a37a6281-35c5-43d1-afc8-d5b75f66a5c2_Original_1776848512649.jpeg";

const NAV_ITEMS = ["About", "Services", "Trainings", "Speaking", "Portfolio", "Testimonials", "FAQ", "Contact"];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Layout>
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />

      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Michelle Piper"
            className="w-full h-full object-cover object-top md:object-[60%_15%]"
          />
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
              Michelle Piper is a communication coach, public speaking trainer, full stack developer, and creative professional dedicated to helping individuals build confidence, speak effectively, and develop valuable digital skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/trainings">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 font-serif tracking-wide"
                >
                  Explore Trainings
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-8 bg-transparent text-white border-white hover:bg-white hover:text-foreground font-serif tracking-wide"
                onClick={() => setBookingOpen(true)}
              >
                Book a Free Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {NAV_ITEMS.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                <div className="flex items-center justify-center p-4 border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer group text-center">
                  <span className="font-serif tracking-widest text-xs uppercase group-hover:scale-105 transition-transform">
                    {item}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
