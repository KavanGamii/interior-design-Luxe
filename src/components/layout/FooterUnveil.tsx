"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function FooterUnveil({ children, footer }: { children: React.ReactNode, footer: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerMargin, setFooterMargin] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        // Only apply sticky bottom margin on desktop
        if (window.innerWidth >= 768) {
          setFooterMargin(footerRef.current.offsetHeight);
        } else {
          setFooterMargin(0); // Flow normally on mobile
        }
      }
    };

    updateHeight();
    // Safety fallback for dynamically loading images
    setTimeout(updateHeight, 500);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="relative">
      {/* Main Content Wrap */}
      <div 
        className="relative z-10 bg-cream shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
        style={{ marginBottom: footerMargin }}
      >
        {children}
      </div>

      {/* Sticky Reveal Footer */}
      {/* Uses normal relative stack on mobile to prevent overlay issues */}
      <div 
        ref={footerRef}
        className="w-full z-0 h-auto max-md:relative md:fixed md:bottom-0 md:left-0"
      >
        {footer}
      </div>
    </div>
  );
}
