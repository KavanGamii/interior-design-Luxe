"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    title: "Residential Architecture",
    description: "Creating bespoke homes that reflect the unique identity of their owners.",
    image: "/luxury_hero_v2.png"
  },
  {
    title: "Interior Curation",
    description: "Meticulously selected furniture and art that redefine the spatial experience.",
    image: "/luxury_bedroom.png"
  },
  {
    title: "Commercial Concept",
    description: "Innovative workspaces designed to foster creativity and brand narrative.",
    image: "/luxury_kitchen.png"
  }
];

export function Expertise() {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(SERVICES[0].image);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      ".expertise-header > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".expertise-header",
          start: "top 80%",
        },
      }
    );

    // List items reveal
    gsap.fromTo(
      ".service-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".service-list",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-64 bg-charcoal text-cream relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="expertise-header mb-32 max-w-2xl">
          <h2 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-8">
            Our Mastery
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif leading-tight italic">
            Artistry in every <br /> dimension.
          </h3>
        </div>

        <div className="service-list grid grid-cols-1 lg:grid-cols-2 gap-24 font-sans">
          <div className="space-y-0">
            {SERVICES.map((service, index) => (
              <div 
                key={index}
                className="service-item group border-t border-cream/10 py-12 cursor-pointer transition-all duration-500 hover:pl-8 flex justify-between items-center"
                onMouseEnter={() => setActiveImage(service.image)}
              >
                <div className="max-w-md">
                  <span className="text-accent-gold text-[10px] uppercase tracking-widest font-black block mb-4">0{index + 1}</span>
                  <h4 className="text-3xl md:text-4xl font-serif mb-4 group-hover:text-accent-gold transition-colors">{service.title}</h4>
                  <p className="text-sm text-cream/40 leading-relaxed group-hover:text-cream/80 transition-colors">{service.description}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-charcoal transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-cream/10"></div>
          </div>

          <div className="relative aspect-[4/5] hidden lg:block overflow-hidden shadow-2xl bg-white/5">
            <Image
              src={activeImage}
              alt="Expertise Preview"
              fill
              className="object-cover transition-all duration-700 ease-expo-out"
              key={activeImage} // Key forces re-mount/animation
            />
            <div className="absolute inset-0 bg-charcoal/20 mix-blend-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
