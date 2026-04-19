"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      // ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Reset scroll on path change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [pathname]);

  return <>{children}</>;
}
