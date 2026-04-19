"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const GALLERY_ITEMS = [
  { id: 1, src: "/gallery_1.png", title: "Structural Logic", color: "bg-charcoal" },
  { id: 2, src: "/gallery_2.png", title: "Serene Voids", color: "bg-cream" },
  { id: 3, src: "/gallery_3.png", title: "Material Depth", color: "bg-accent-gold" },
  { id: 4, src: "/gallery_4.png", title: "Shadow Play", color: "bg-charcoal" },
];

export function HorizontalGallery() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    const pin = gsap.fromTo(
      triggerRef.current,
      { x: 0 },
      {
        x: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: "+=3000 bottom",
          anticipatePin: 1
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-charcoal overflow-hidden">
      <div ref={triggerRef} className="flex h-screen w-[400vw] relative items-center">
        {GALLERY_ITEMS.map((item) => (
          <div 
            key={item.id} 
            className="h-screen w-screen flex-shrink-0 flex items-center justify-center p-12 md:p-24 relative"
          >
            <div className="relative w-full h-full group overflow-hidden shadow-2xl">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-expo-out"
              />
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-all duration-700"></div>
              
              <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10">
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50 block mb-4">
                  Perspective 0{item.id}
                </span>
                <h3 className="text-5xl md:text-8xl font-serif text-white tracking-tighter mix-blend-difference">
                  {item.title}
                </h3>
              </div>

              <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-10">
                <div className="flex items-center space-x-6">
                  <span className="w-12 h-px bg-white/20"></span>
                  <span className="text-xs uppercase tracking-widest text-white/50">Residential Collection</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
