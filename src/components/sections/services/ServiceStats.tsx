import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: "15", suffix: "+", label: "Years of Master Architecture" },
  { value: "120", suffix: "+", label: "Luxury Turnkey Projects Delivered" },
  { value: "18", suffix: "", label: "International Design Awards" },
  { value: "12", suffix: "", label: "Global Locations Covered" }
];

export function ServiceStats() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Number counter animation
    const numbers = gsap.utils.toArray('.stat-num');
    numbers.forEach((num: any) => {
      const targetObj = { val: 0 };
      const endValue = parseInt(num.getAttribute("data-val"));
      
      gsap.to(targetObj, {
        val: endValue,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: num,
          start: "top 80%",
        },
        onUpdate: () => {
          num.innerText = Math.floor(targetObj.val);
        }
      });
    });

    // Reveal lines and labels
    gsap.fromTo(".stat-line", 
      { scaleY: 0 },
      { scaleY: 1, duration: 1.5, stagger: 0.1, ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );

    gsap.from(".stat-label", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%"
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-charcoal text-cream px-6 md:px-12 relative border-t border-cream/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-24 max-w-2xl leading-[1.1]">
          By the numbers. Defined by excellence.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-y-16 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center relative group">
              {/* Divider lines on desktop */}
              {i !== 0 && (
                <div className="hidden md:block absolute left-0 top-0 h-full w-[1px] bg-cream/10 stat-line origin-top"></div>
              )}
              
              <div className="text-6xl md:text-8xl font-serif font-black text-accent-gold mb-6 flex">
                <span className="stat-num" data-val={stat.value}>0</span>
                <span className="text-4xl md:text-6xl lg:text-7xl mt-1">{stat.suffix}</span>
              </div>
              
              <p className="stat-label text-cream/50 text-xs md:text-sm font-bold uppercase tracking-widest px-4 max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
