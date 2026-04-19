"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    // Hide original cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // The dot stays precise and sharp
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // The ring provides the "Studio Lag" (Expensive architectural feel)
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out",
      });

      // Text follows with its own momentum
      gsap.to(text, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for different interaction states
      const isProject = target.closest('[data-cursor="project"]');
      const isMedia = target.closest('[data-cursor="media"]');
      const isLink = target.closest("a") || target.closest("button") || target.closest(".cursor-pointer");
      const isClose = target.closest('[data-cursor="close"]');

      if (isProject) {
        setCursorText("VIEW");
        gsap.to(ring, {
          scale: 4,
          backgroundColor: "#C5A059",
          borderColor: "transparent",
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.3 });
        gsap.to(text, { opacity: 1, scale: 1, duration: 0.4 });
      } else if (isMedia) {
        setCursorText("EXPAND");
        gsap.to(ring, {
          scale: 3.5,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "transparent",
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.3 });
        gsap.to(text, { opacity: 1, scale: 0.8, color: "#1A1A1A", duration: 0.4 });
      } else if (isClose) {
        setCursorText("ESC");
        gsap.to(ring, {
          scale: 3,
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          borderColor: "rgba(255, 0, 0, 0.5)",
          duration: 0.4,
        });
        gsap.to(text, { opacity: 1, scale: 0.7, color: "white", duration: 0.4 });
      } else if (isLink) {
        setCursorText("");
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: "transparent",
          borderColor: "rgba(197, 160, 89, 1)",
          borderWidth: "1px",
          opacity: 1,
          duration: 0.4,
        });
        gsap.to(dot, { scale: 1.5, backgroundColor: "#C5A059", duration: 0.3 });
        gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 });
      } else {
        setCursorText("");
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(197, 160, 89, 0.4)",
          borderWidth: "1px",
          opacity: 0.5,
          duration: 0.5,
        });
        gsap.to(dot, { 
          scale: 1, 
          opacity: 1, 
          backgroundColor: "#C5A059",
          duration: 0.3 
        });
        gsap.to(text, { opacity: 0, scale: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Precision Dot */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-gold rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference" 
      />

      {/* Atmospheric Ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-accent-gold/40 rounded-full -translate-x-1/2 -translate-y-1/2" 
      />

      {/* Contextual Text Overlay */}
      <div 
        ref={textRef} 
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 font-sans font-black text-[8px] uppercase tracking-[0.3em] text-white flex items-center justify-center pointer-events-none"
      >
        {cursorText}
      </div>

      {/* Aesthetic Particles (Optional subtle trail) */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
}
