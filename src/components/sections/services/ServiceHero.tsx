import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ServiceHero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".sh-word span", {
      y: "120%",
      duration: 1.5,
      stagger: 0.05,
      ease: "power4.out",
      rotate: 5
    })
    .fromTo(".sh-line", 
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.inOut" },
      "-=1"
    )
    .from(".sh-sub", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2
    }, "-=0.5");

    // Parallax on scroll
    gsap.to(".sh-content", {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-end pb-24 px-6 md:px-12 bg-cream overflow-hidden pt-32">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="sh-content w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-[12vw] md:text-[8rem] xl:text-[11rem] leading-[0.8] font-serif font-black text-charcoal tracking-tighter uppercase mb-12">
          <span className="block overflow-hidden relative"><span className="sh-word block inline-block"><span className="inline-block origin-bottom-left">M</span><span className="inline-block origin-bottom-left">A</span><span className="inline-block origin-bottom-left">S</span><span className="inline-block origin-bottom-left">T</span><span className="inline-block origin-bottom-left">E</span><span className="inline-block origin-bottom-left">R</span></span></span>
          <span className="block overflow-hidden relative"><span className="sh-word block inline-block"><span className="inline-block origin-bottom-left">C</span><span className="inline-block origin-bottom-left">R</span><span className="inline-block origin-bottom-left">A</span><span className="inline-block origin-bottom-left">F</span><span className="inline-block origin-bottom-left">T</span></span></span>
        </h1>
        
        <div className="w-full h-[1px] bg-charcoal/20 sh-line origin-left mb-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between w-full items-center md:items-end gap-8">
          <p className="sh-sub text-charcoal/60 max-w-md text-lg font-sans">
            We don’t just design spaces; we curate experiences. Our multidisciplinary approach bridges the gap between architecture, art, and emotion.
          </p>
          <div className="sh-sub text-xs font-mono uppercase tracking-[0.3em] font-bold text-accent-gold">
            [ Explore Disciplines ]
          </div>
        </div>
      </div>
    </section>
  );
}
