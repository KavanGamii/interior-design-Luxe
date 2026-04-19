"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Scale, ArrowRight, Layout, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const [content, setContent] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch("/api/admin/config");
      const data = await res.json();
      setContent(data.termsContent || "Terms content coming soon.");
    };
    fetchConfig();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".terms-header",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 0.5 }
    )
    .fromTo(
      ".terms-sidebar-el",
      { height: 0, opacity: 0 },
      { height: "100%", opacity: 1, duration: 2, stagger: 0.3 },
      "-=1"
    )
    .fromTo(
      ".terms-content-node",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      "-=1.5"
    );
  }, { scope: containerRef });

  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      if (block.startsWith("# ")) {
        return (
          <h1 key={idx} className="terms-content-node text-7xl md:text-9xl font-serif font-black text-charcoal mb-24 uppercase tracking-tighter leading-none italic">
            {block.replace("# ", "")}
          </h1>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <div key={idx} className="terms-content-node group mt-20 mb-8 flex items-end gap-6 overflow-hidden">
             <span className="text-accent-gold font-serif font-bold text-4xl mb-[-4px]">0{idx}</span>
             <h2 className="text-3xl font-serif font-black text-charcoal uppercase tracking-tight">
               {block.replace("## ", "")}
             </h2>
             <div className="flex-1 h-[1px] bg-charcoal/5 mb-3 group-hover:bg-accent-gold/20 transition-colors duration-700"></div>
          </div>
        );
      }
      if (block.startsWith("- ")) {
        return (
          <div key={idx} className="terms-content-node bg-white/50 border border-charcoal/5 p-10 rounded-3xl mb-12 shadow-sm">
            {block.split("\n").map((li, i) => (
              <div key={i} className="flex items-start gap-6 mb-4 last:mb-0">
                <CheckCircle2 size={16} className="text-accent-gold mt-1 shrink-0" />
                <p className="text-sm font-sans font-bold text-charcoal/70 uppercase tracking-widest leading-relaxed">
                  {li.replace("- ", "")}
                </p>
              </div>
            ))}
          </div>
        );
      }
      return (
        <p key={idx} className="terms-content-node text-xl md:text-2xl font-serif text-charcoal/60 leading-relaxed mb-12 max-w-5xl">
          {block}
        </p>
      );
    });
  };

  return (
    <div ref={containerRef} className="bg-cream min-h-screen relative overflow-hidden">
      {/* Structural Framing */}
      <div className="fixed left-0 top-0 w-24 h-full border-r border-charcoal/5 pointer-events-none hidden lg:flex flex-col items-center justify-center py-24 gap-24">
         <div className="terms-sidebar-el w-[1px] bg-charcoal/10"></div>
         <Layout className="text-charcoal/20" size={20} />
         <div className="terms-sidebar-el w-[1px] bg-charcoal/10 flex-1"></div>
      </div>

      {/* Floating Meta Signage */}
      <div className="absolute top-12 left-32 hidden md:block">
        <span className="text-[9px] font-sans font-black uppercase tracking-[0.5em] text-accent-gold/40">Revision 2026.04.19.V1</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:pl-48 pt-48 pb-48 relative z-10">
        <div className="max-w-6xl">
          {/* Header Identity */}
          <div className="terms-header mb-32">
             <div className="flex items-center gap-6 mb-10">
               <div className="w-16 h-16 bg-charcoal text-cream rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
                 <Scale size={32} />
               </div>
               <div className="h-[1px] w-24 bg-charcoal/10"></div>
               <span className="text-[10px] font-sans font-black uppercase tracking-[1em] text-charcoal/30">Engagement Standards</span>
             </div>
             <p className="text-charcoal/50 font-serif italic text-2xl max-w-2xl leading-relaxed">
               Establishing the governing principles and architectural integrity of our studio partnerships.
             </p>
          </div>

          {/* Rendered Markdown Body */}
          <div className="terms-body">
             {renderContent(content)}
          </div>

          {/* Signature Block */}
          <div className="mt-48 terms-content-node">
             <div className="p-16 bg-charcoal rounded-[3rem] text-cream relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-bl-full -mr-32 -mt-32"></div>
                <h4 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase tracking-tighter leading-none italic">
                  Build with <br /> <span className="text-accent-gold not-italic">Purpose.</span>
                </h4>
                <p className="text-cream/40 font-sans font-medium uppercase tracking-[0.3em] text-[10px] mb-12 max-w-md">
                   By choosing LUXE INTERIORS, you align with a legacy of architectural intent and structural excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                   <button className="bg-accent-gold text-charcoal px-12 py-6 rounded-2xl font-sans font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                     Download Contract Spec
                   </button>
                   <button className="border border-white/20 text-white px-12 py-6 rounded-2xl font-sans font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                     Studio Philosophy
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terms-body h1 {
          line-height: 0.9;
        }
      `}</style>
    </div>
  );
}
