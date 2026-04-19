"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const pathname = usePathname();
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Initial Load Check
  useEffect(() => {
    const skipLoader = sessionStorage.getItem("hasVisited");
    if (skipLoader) {
      setIsFirstVisit(false);
      setIsLoading(false);
    } else {
      // Start initial loading sequence
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            sessionStorage.setItem("hasVisited", "true");
            gsap.to(loaderRef.current, {
              yPercent: -100,
              duration: 1.2,
              ease: "power4.inOut",
              onComplete: () => setIsLoading(false),
            });
          }
        });

        // 5-6s sequence
        tl.to({}, { duration: 4.5 }); // Buffer for the counter

        // Counter animation
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 100,
          duration: 4.5,
          ease: "none",
          onUpdate: () => setPercent(Math.floor(counter.val)),
        });
      });

      return () => ctx.revert();
    }
  }, []);

  // Handle Page Transitions
  useEffect(() => {
    if (!isLoading) {
      // Trigger short transition (1.5s)
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.set(transitionRef.current, { yPercent: 100, display: "flex" })
          .to(transitionRef.current, {
            yPercent: 0,
            duration: 0.6,
            ease: "power4.inOut"
          })
          .to({}, { duration: 0.3 }) // Brief pause for content to settle
          .to(transitionRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
               gsap.set(transitionRef.current, { display: "none" });
            }
          });
      });
      return () => ctx.revert();
    }
  }, [pathname]);

  return (
    <>
      {/* Initial Global Loader */}
      {isLoading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center text-cream"
        >
          <div className="relative overflow-hidden mb-8">
            <span className="text-[10px] uppercase tracking-[0.8em] font-black opacity-40">Luxe Interiors Studio</span>
          </div>
          
          <div ref={counterRef} className="text-[12vw] font-serif italic leading-none flex items-baseline">
            {percent} <span className="text-xl ml-4 not-italic font-sans opacity-20">%</span>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-6 text-[10px] uppercase tracking-widest font-bold opacity-30">
            <span>Mumbai</span>
            <div className="w-1 h-1 bg-accent-gold rounded-full"></div>
            <span>London</span>
            <div className="w-1 h-1 bg-accent-gold rounded-full"></div>
            <span>Dubai</span>
          </div>
        </div>
      )}

      {/* Page Transition Overlay */}
      <div 
        ref={transitionRef}
        className="fixed inset-0 z-[99] bg-accent-gold flex items-center justify-center hidden"
        style={{ pointerEvents: "none" }}
      >
         <div className="text-charcoal font-serif italic text-4xl">Unveiling...</div>
      </div>
    </>
  );
}
