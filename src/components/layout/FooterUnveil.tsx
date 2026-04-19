"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function FooterUnveil({ children, footer }: { children: React.ReactNode, footer: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="relative">
      {/* Main Content Wrap */}
      <div 
        className="relative z-10 bg-cream shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>

      {/* Sticky Reveal Footer */}
      <div 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full z-0 h-auto"
      >
        {footer}
      </div>
    </div>
  );
}
