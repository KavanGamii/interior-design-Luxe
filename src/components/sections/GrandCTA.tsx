"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export function GrandCTA() {
  const containerRef = useRef(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Text Reveal
    gsap.fromTo(
      ".grand-cta-text span",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      }
    );

    // Background Color Shift site-wide (Optional but cinematic)
    gsap.to(containerRef.current, {
      backgroundColor: "#1A1A1A",
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Magnetic Button Logic
    const handleMouseMove = (e: MouseEvent) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - btnCenterX;
      const deltaY = e.clientY - btnCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 200) {
        gsap.to(btn, {
          x: deltaX * 0.3,
          y: deltaY * 0.3,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80vh] flex flex-col items-center justify-center bg-cream transition-colors duration-1000 overflow-hidden py-32"
    >
      <div className="container mx-auto px-6 md:px-12 text-center pointer-events-none">
        <h2 className="grand-cta-text text-[12vw] md:text-[10vw] font-serif font-black leading-[0.8] tracking-tighter text-charcoal uppercase mb-24 select-none">
          <div className="overflow-hidden">
            <span className="inline-block">READY TO</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block italic text-accent-gold">REDESIGN</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">YOUR SPACE?</span>
          </div>
        </h2>
      </div>

      <div className="relative z-10">
        <Link
          href="/contact"
          ref={buttonRef}
          className="group relative flex items-center justify-center w-64 h-64 rounded-full border border-charcoal/10 bg-cream text-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-500 overflow-hidden"
        >
          <span className="relative z-10 uppercase tracking-[0.4em] text-xs font-black">
            Let's Talk
          </span>
          {/* Liquid background fill */}
          <div className="absolute inset-x-0 bottom-0 h-0 bg-accent-gold group-hover:h-full transition-all duration-700 -z-0"></div>
        </Link>
      </div>

      {/* Decorative architectural lines */}
      <div className="absolute top-0 left-12 w-px h-full bg-charcoal/5 hidden md:block"></div>
      <div className="absolute top-0 right-12 w-px h-full bg-charcoal/5 hidden md:block"></div>
    </section>
  );
}
