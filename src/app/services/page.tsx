"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Interior Architecture",
    description: "Reimagining the structure of your space with a focus on flow, light, and materiality.",
    features: ["Space Planning", "Structural Modifications", "Custom Woodwork", "Lighting Layouts"]
  },
  {
    title: "Bespoke Furnishing",
    description: "Sourcing and designing unique pieces that harmonize with the architectural vision.",
    features: ["Custom Furniture", "Textile Selection", "Art Curation", "Antique Sourcing"]
  },
  {
    title: "Hospitality Design",
    description: "Creating unforgettable branded environments for luxury hotels and restaurants.",
    features: ["Concept Development", "Operational Flow", "Branded Interiors", "FF&E Specification"]
  },
  {
    title: "Turnkey Projects",
    description: "End-to-end management from concept to completion, ensuring a seamless luxury experience.",
    features: ["Project Management", "Site Supervision", "Procurement", "Installation"]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".service-row",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
            Expertise
          </h1>
          <h2 className="text-6xl md:text-9xl font-serif text-charcoal leading-none">
            Tailored <br /> Solutions.
          </h2>
        </div>

        <div className="flex flex-col space-y-0">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="service-row group border-t border-charcoal/10 py-16 flex flex-col lg:flex-row justify-between items-start hover:bg-charcoal/5 transition-colors duration-500"
            >
              <div className="lg:w-1/3 mb-8 lg:mb-0">
                <span className="text-accent-gold text-xs font-bold font-mono block mb-4">0{index + 1}</span>
                <h3 className="text-4xl md:text-5xl font-serif text-charcoal group-hover:text-accent-gold transition-colors duration-500">
                  {service.title}
                </h3>
              </div>
              
              <div className="lg:w-1/3 mb-8 lg:mb-0">
                <p className="text-xl text-charcoal/70 font-sans leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="lg:w-1/4">
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-charcoal/40 text-xs uppercase tracking-widest font-bold">
                      <ArrowRight size={12} className="mr-2 text-accent-gold" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-charcoal/10"></div>
        </div>
      </div>
    </div>
  );
}
