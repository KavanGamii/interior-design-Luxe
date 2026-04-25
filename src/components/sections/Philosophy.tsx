"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export function Philosophy({ content }: { content?: any }) {
  const sectionRef = useRef(null);
  const imageRevealRef = useRef(null);

  useGSAP(() => {
    // Large background text reveal
    gsap.fromTo(
      ".philosophy-bg-text",
      { x: "20%", opacity: 0 },
      {
        x: "-20%",
        opacity: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Image reveal animation
    gsap.fromTo(
      imageRevealRef.current,
      { clipPath: "inset(10% 40% 10% 40%)", scale: 1.2 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: true,
        },
      }
    );

    // Content reveal
    gsap.fromTo(
      ".philosophy-content > *",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".philosophy-content",
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-64 bg-cream overflow-hidden">
      {/* Background Large Text */}
      <h2 className="philosophy-bg-text absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif font-black text-charcoal pointer-events-none whitespace-nowrap z-0">
        THE ESSENCE OF SPACE.
      </h2>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[3/4] md:aspect-square overflow-hidden shadow-2xl">
            <div ref={imageRevealRef} className="w-full h-full relative">
              <Image
                src={content?.image || "/luxury_bedroom.png"}
                alt="Architecture Philosophy"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="philosophy-content space-y-12">
            <h3 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold">
              {content?.subtitle || "Our Vision"}
            </h3>
            <h4 className="text-5xl md:text-7xl font-serif text-charcoal leading-tight">
               {content?.title ? (
                 <span>{content.title}</span>
               ) : (
                <>Designing with <br /> <span className="italic text-accent-gold">Quiet Intent.</span></>
               )}
            </h4>
            <p className="text-xl text-charcoal/70 font-sans leading-relaxed max-w-lg">
              {content?.text || "We believe that true luxury lies in the unspoken. It is the harmony of texture, light, and volume that creates an atmosphere of timeless elegance. We craft sanctuaries that resonate with the soul."}
            </p>
            <div className="pt-8">
              <button className="group flex items-center space-x-6 text-charcoal">
                <span className="text-xs uppercase tracking-[0.3em] font-black group-hover:text-accent-gold transition-colors">Read Full Philosophy</span>
                <span className="w-12 h-px bg-charcoal/20 group-hover:w-24 group-hover:bg-accent-gold transition-all duration-500"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
