"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide original cursor
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Quick dot
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Trailing ring for cinematic feel (Plan V3: Subtle Lag)
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('input[type="submit"]') ||
        target.classList.contains("cursor-pointer");

      if (isSelectable) {
        gsap.to(ring, {
          scale: 3,
          backgroundColor: "rgba(197, 160, 89, 0.2)",
          borderColor: "rgba(197, 160, 89, 1)",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(197, 160, 89, 0.5)",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
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
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent-gold/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[transform] duration-100 hidden md:block" 
      />
    </>
  );
}
