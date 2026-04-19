import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MoveRight } from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "Step 01",
    title: "Discovery & Vision",
    text: "We begin by understanding your lifestyle, aspirations, and the unique potential of the space. It’s a dialogue to define the emotional core of the project."
  },
  {
    id: "Step 02",
    title: "Spatial Architecture",
    text: "Translating words into volume. We map out the flow, light, and boundaries, ensuring the structural bones of the design are perfectly aligned with the vision."
  },
  {
    id: "Step 03",
    title: "Materiality & Curation",
    text: "Selecting finishes, textiles, and bespoke art that speak the language of quiet luxury. Every material must feel as profound as it looks."
  },
  {
    id: "Step 04",
    title: "Flawless Execution",
    text: "Our artisans and project managers bring the concept to reality, obsessing over the final millimeter to deliver an uncompromising turnkey experience."
  }
];

export function ServiceProcess() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scrollWrapperRef.current) return;

    // The total width to translate is the width of the scroll wrapper minus the viewport width
    const getScrollAmount = () => {
       const wrapperWidth = scrollWrapperRef.current?.scrollWidth || 0;
       return -(wrapperWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollWrapperRef.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll duration matches the width
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true // Recalculate on resize
      }
    });

    return () => {
      tween.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-cream text-charcoal h-screen overflow-hidden flex flex-col justify-center relative">
      <div className="absolute top-20 left-6 md:left-12 flex items-center gap-6 z-10">
        <h2 className="text-xl md:text-3xl font-serif font-bold uppercase tracking-widest block">The Process</h2>
        <MoveRight className="w-12 h-12 text-accent-gold/50" strokeWidth={1} />
      </div>

      <div ref={scrollWrapperRef} className="flex flex-nowrap items-center h-full pt-20 px-6 md:px-12 gap-12 md:gap-32 w-max">
        {PROCESS_STEPS.map((step, i) => (
          <div key={i} className="w-[85vw] md:w-[50vw] lg:w-[35vw] flex-shrink-0 flex flex-col gap-8">
            <span className="text-accent-gold font-mono text-sm tracking-[0.3em] font-bold py-2 border-b border-charcoal/10">{step.id}</span>
            <h3 className="text-5xl md:text-6xl font-serif font-black uppercase text-charcoal leading-none">
              {step.title}
            </h3>
            <p className="text-charcoal/60 text-lg md:text-xl font-sans max-w-sm mt-4">
              {step.text}
            </p>
          </div>
        ))}
        {/* End Spacer */}
        <div className="w-[10vw] flex-shrink-0"></div>
      </div>
    </section>
  );
}
