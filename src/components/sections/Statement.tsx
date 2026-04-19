"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Statement() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".statement-text",
      { y: 100, opacity: 0, skewY: 7 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    // Subtle grain animation overlay could be added via CSS
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen bg-cream flex items-center justify-center px-6 md:px-12 relative z-20 overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-6xl mx-auto text-center z-10">
        <h2 className="statement-text text-5xl md:text-[7vw] font-serif italic text-accent-gold leading-[1.1] tracking-tight">
          "Architecture is the <br /> 
          <span className="text-charcoal not-italic font-black">thoughtful making</span> <br /> 
          of space."
        </h2>
        
        <div className="mt-16 flex flex-col items-center">
          <div className="w-px h-24 bg-accent-gold/30 mb-8"></div>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-charcoal/40">
            Louis Kahn — Heritage & Vision
          </p>
        </div>
      </div>
    </section>
  );
}
