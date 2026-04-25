"use client";
// Force Vercel cache clear for types

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Minus } from "lucide-react";

export function Hero({ config, content }: { config: any, content?: any }) {
  const containerRef = useRef(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  
  const fullTitle = content?.title 
    ? `${content.title}${content.titleSuffix ? ' ' + content.titleSuffix : ''}`
    : config?.heroTitle || "Crafting Elevated Spaces.";

  const words = fullTitle.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    // 1. Horizontal Curtain Reveal
    tl.set(".curtain", { xPercent: 0 })
      .to(".curtain-left", { xPercent: -101, duration: 1.8 })
      .to(".curtain-right", { xPercent: 101, duration: 1.8 }, "-=1.8")
      
      // 2. Image Scale & Reveal
      .fromTo(".hero-bg-image", 
        { scale: 1.4, filter: "blur(10px)" }, 
        { scale: 1.1, filter: "blur(0px)", duration: 2.5 }, 
        "-=1.5"
      )

      // 3. Typography Reveal (Character by Character)
      .fromTo(".hero-word span", 
        { y: "110%", rotate: 5, opacity: 0 }, 
        { y: "0%", rotate: 0, opacity: 1, duration: 2, stagger: 0.05, ease: "power4.out" }, 
        "-=1.8"
      )

      // 4. Details Reveal
      .fromTo(".hero-ui-element", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 }, 
        "-=1"
      );

    // Scroll Animations
    gsap.to(".hero-bg-image", {
      y: 150,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(".hero-main-content", {
      y: -150,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Mouse Parallax on Image
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * 40;

      gsap.to(".hero-bg-image", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-charcoal">
      
      {/* Horizontal Curtains */}
      <div className="curtain curtain-left absolute inset-y-0 left-0 w-1/2 bg-charcoal z-30 border-r border-white/5"></div>
      <div className="curtain curtain-right absolute inset-y-0 right-0 w-1/2 bg-charcoal z-30 border-l border-white/5"></div>

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content?.image || "/luxury_living_room_hero.png"}
          alt="Cinematic Architectural Hero"
          fill
          className="hero-bg-image object-cover brightness-[0.4] grayscale-[0.3]"
          priority
        />
        {/* Aggressive Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-charcoal/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/60"></div>
        {/* Subtle Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="hero-main-content max-w-5xl text-center md:text-left mt-32">
          
          {/* Headline Reveal - Reduced Size for Header Safety */}
          <h1 className="text-[10vw] md:text-[8.5rem] font-serif font-black leading-[0.8] tracking-tighter text-cream mb-20 uppercase pointer-events-none">
            {words.map((word: string, wordIndex: number) => (
              <span key={wordIndex} className="inline-block mr-[0.2em] whitespace-nowrap hero-word overflow-hidden">
                {word.split("").map((char: string, charIndex: number) => (
                  <span key={charIndex} className="inline-block origin-bottom-left">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Floating UI Metadata - Fixed Spacing */}
          <div className="hero-ui-element flex flex-col md:flex-row gap-12 md:gap-20 text-cream/40 uppercase tracking-[0.4em] text-[9px] font-black items-center md:items-start">
            <div className="flex flex-col gap-3 items-center md:items-start group cursor-default">
              <span className="text-accent-gold/40 group-hover:text-accent-gold transition-colors duration-500">
                {content?.pill || "The Location"}
              </span>
              <span className="text-cream font-serif italic text-lg tracking-normal normal-case group-hover:translate-x-2 transition-transform duration-500">
                {content?.titleAccent || "Mumbai Studio"}
              </span>
            </div>
            
            <Minus className="hidden md:block text-accent-gold/20 h-10 w-[1px] rotate-180" />
            
            <div className="flex flex-col gap-3 items-center md:items-start group cursor-default">
              <span className="text-accent-gold/40 group-hover:text-accent-gold transition-colors duration-500">
                {content?.eraPill || "The Era"}
              </span>
              <span className="text-cream font-serif italic text-lg tracking-normal normal-case group-hover:translate-x-2 transition-transform duration-500">
                {content?.eraText || "Est. MMXXVI"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Button - Repositioned to Bottom Right for clarity */}
      <div className="hero-ui-element absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-6 group cursor-pointer">
         <div className="w-20 h-20 rounded-full border border-cream/20 flex items-center justify-center group-hover:bg-cream group-hover:text-charcoal transition-all duration-700 hover:scale-110">
           <div className="w-[1px] h-8 bg-current animate-bounce"></div>
         </div>
         <span className="text-cream/80 text-[10px] tracking-[0.6em] group-hover:translate-x-2 transition-transform duration-500 uppercase font-black">Discover</span>
      </div>

      {/* Edge Accents - Reduced opacity for cleaner look */}
      <div className="hero-ui-element absolute bottom-12 left-12 hidden md:block">
         <p className="text-cream/5 text-[6rem] font-serif font-black uppercase tracking-tighter leading-none pointer-events-none">Studio</p>
      </div>

    </section>
  );
}
