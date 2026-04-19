"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceStickyDetail } from "@/components/sections/services/ServiceStickyDetail";
import { ServiceProcess } from "@/components/sections/services/ServiceProcess";
import { ServiceStats } from "@/components/sections/services/ServiceStats";
import { GrandCTA } from "@/components/sections/GrandCTA";

export function ServicesContent() {
  
  // Apply smooth Lenis scroll refresh globally if needed, though useGSAP usually handles it
  useEffect(() => {
    // Refresh scroll triggers when components mount
    gsap.delayedCall(0.1, () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        // @ts-ignore
        window.ScrollTrigger.refresh();
      }
    });
  }, []);

  return (
    <div className="bg-charcoal min-h-screen">
      <ServiceHero />
      <ServiceStickyDetail />
      <ServiceProcess />
      <ServiceStats />
      
      {/* We use the GrandCTA from the homepage for a spectacular finish */}
      <GrandCTA />
    </div>
  );
}
