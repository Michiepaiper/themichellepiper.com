import { motion } from "framer-motion";
import Layout from "@/components/layout";
import portWeb1 from "@/assets/images/portfolio-web1.png";
import portPhoto1 from "@/assets/images/portfolio-photo1.png";
import portVideo1 from "@/assets/images/portfolio-video1.png";
import portGraphic1 from "@/assets/images/portfolio-graphic1.png";

const ITEMS = [
  { title: "Web Design & Software Development", tag: "Full Stack", img: portWeb1, href: "/portfolio-web.html" },
  { title: "Editorial Portrait", tag: "Photography", img: portPhoto1, href: null },
  { title: "Event Coverage", tag: "Videography", img: portVideo1, href: null },
  { title: "Brand Identity", tag: "Graphic Design", img: portGraphic1, href: null },
];

export default function Portfolio() {
  return (
    <Layout>
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Creative Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of digital craftsmanship across web design, photography, videography, and graphic design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {ITEMS.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i}
                className="group relative aspect-video overflow-hidden bg-muted cursor-pointer"
                onClick={() => { if (item.href) window.open(item.href, "_blank"); }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end md:justify-center items-center text-center p-6">
                  <span className="text-primary text-xs uppercase tracking-widest mb-2 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    {item.tag}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-serif md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.title}
                  </h3>
                  {item.href && (
                    <span className="text-white/60 text-xs mt-2 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      View portfolio →
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
