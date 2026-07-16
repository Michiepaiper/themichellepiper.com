import { motion } from "framer-motion";
import Layout from "@/components/layout";
import aboutImg from "@assets/WhatsApp_Image_2026-05-29_at_02.01.13_(2)_1784237988819.jpeg";

export default function About() {
  return (
    <Layout>
      <section className="py-24 bg-background">
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
                <img
                  src={aboutImg}
                  alt="Michelle Piper Portrait"
                  className="relative z-10 w-full h-auto object-cover grayscale-[20%] contrast-125"
                />
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
                With expertise in diction and elocution, public speaking, full stack development, and creative media, she combines technical skill with powerful communication strategies.
              </p>
              <p className="text-foreground font-medium text-lg border-l-4 border-primary pl-6 py-2 mt-8">
                Her mission is to empower individuals with confidence, clarity, and competence — whether on stage, online, or in professional environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
