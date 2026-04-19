"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".about-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-cream overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="text-[12rem] md:text-[20rem] font-serif font-black text-charcoal/5 absolute top-0 left-0 -translate-y-1/2 -translate-x-12 pointer-events-none select-none">
            LUXE.
          </div>
          <h2 className="about-reveal text-accent-gold uppercase tracking-[0.3em] text-sm font-bold mb-8">
            Our Philosophy
          </h2>
          <h3 className="about-reveal text-4xl md:text-6xl font-serif text-charcoal leading-tight mb-8 text-balance">
            We believe that <span className="italic">true luxury</span> is the perfect balance between form, function, and emotion.
          </h3>
          <p className="about-reveal text-xl text-charcoal/70 font-sans max-w-xl leading-relaxed mb-12">
            Since 2012, our studio has been dedicated to crafting bespoke interiors that tell a story. From minimalist urban lofts to sprawling coastal retreats, we bring a cinematic eye to every detail.
          </p>
          <div className="about-reveal">
            <Button variant="outline" size="lg" className="rounded-full">
              Discover Our Story
            </Button>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-video lg:aspect-square group overflow-hidden bg-charcoal">
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
            <h4 className="text-cream text-3xl font-serif mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              The Architecture of Comfort
            </h4>
            <div className="w-0 group-hover:w-full h-px bg-accent-gold transition-all duration-700"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
          {/* We'll use the hero image again or another one if we had it */}
          <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-60">
             <img src="/luxury_living_room_hero.png" alt="Process" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
