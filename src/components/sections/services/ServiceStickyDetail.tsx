import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    id: "01",
    title: "Interior Architecture",
    description: "Reimagining the structure of your space with a focus on flow, light, and robust materiality. We look beyond decoration to address the fundamental bones of a building.",
    features: ["Space Planning", "Structural Modifications", "Custom Woodwork", "Lighting Layouts"],
    image: "/luxury_living_room_hero.png"
  },
  {
    id: "02",
    title: "Bespoke Furnishing",
    description: "Sourcing and designing unique pieces that harmonize with the architectural vision. Every object is meticulously selected to contribute to a cohesive luxury narrative.",
    features: ["Custom Furniture", "Textile Selection", "Art Curation", "Antique Sourcing"],
    image: "/luxury_bedroom.png"
  },
  {
    id: "03",
    title: "Hospitality Design",
    description: "Creating unforgettable branded environments for luxury hotels and restaurants, ensuring the guest experience is elevated at every touchpoint.",
    features: ["Concept Development", "Operational Flow", "Branded Interiors", "FF&E Specification"],
    image: "/gallery_1.png"
  },
  {
    id: "04",
    title: "Turnkey Projects",
    description: "End-to-end management from concept to completion. We handle every detail, ensuring a seamless luxury experience without compromise.",
    features: ["Project Management", "Site Supervision", "Procurement", "Installation"],
    image: "/luxury_kitchen.png"
  }
];

export function ServiceStickyDetail() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Reveal animation for text blocks
    const serviceBlocks = gsap.utils.toArray('.service-text-block');
    serviceBlocks.forEach((block: any) => {
      gsap.from(block, {
        opacity: 0.2,
        x: -50,
        scrollTrigger: {
          trigger: block,
          start: "top 60%",
          end: "top 30%",
          scrub: true
        }
      });
    });

    // Image crossfade logic
    SERVICES.forEach((service, i) => {
      if (i === 0) return; // First image is default visible
      
      gsap.to(`.img-index-${i}`, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: `.text-index-${i}`,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-charcoal text-cream w-full">
      <div className="flex flex-col lg:flex-row w-full relative">
        
        {/* Left Side: Scrolling Text */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 py-32 lg:py-64 flex flex-col gap-32 lg:gap-64 relative z-10">
          {SERVICES.map((srv, i) => (
            <div key={srv.id} className={`service-text-block text-index-${i} min-h-[50vh] flex flex-col justify-center`}>
              <span className="text-accent-gold font-mono text-sm tracking-[0.2em] mb-8 block">({srv.id})</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black uppercase leading-[0.9] mb-8">{srv.title}</h2>
              <p className="text-cream/60 md:text-xl font-sans leading-relaxed max-w-md mb-12">
                {srv.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {srv.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs tracking-widest uppercase text-cream/40 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Images */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 right-0 overflow-hidden">
           {SERVICES.map((srv, i) => (
             <div 
               key={`img-${i}`} 
               className={`absolute inset-0 img-index-${i} w-full h-full object-cover`}
               style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
             >
               <Image
                 src={srv.image}
                 alt={srv.title}
                 fill
                 className="object-cover blur-[2px] transition-all duration-1000 scale-[1.05]"
               />
               <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  className="object-cover absolute inset-0 mix-blend-overlay opacity-50"
               />
               <div className="absolute inset-0 bg-charcoal/30"></div>
             </div>
           ))}
        </div>
        
      </div>
    </section>
  );
}
