"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ShieldCheck, ArrowRight, ArrowDown } from "lucide-react";

export default function PrivacyPage() {
  const [content, setContent] = useState("");
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch("/api/admin/config");
      const data = await res.json();
      setContent(data.privacyContent || "Privacy content coming soon.");
    };
    fetchConfig();
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".privacy-header",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
    )
    .fromTo(
      ".privacy-icon",
      { scale: 0, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1 },
      "-=1"
    )
    .fromTo(
      ".privacy-content-block",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "-=0.5"
    );
  }, { scope: containerRef });

  // Simple parser to make it look luxe
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      if (block.startsWith("# ")) {
        return (
          <h1 key={idx} className="privacy-content-block text-6xl md:text-8xl font-serif font-black text-charcoal mb-16 uppercase tracking-tight leading-none">
            {block.replace("# ", "")}
          </h1>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={idx} className="privacy-content-block text-2xl font-serif font-bold text-accent-gold mt-16 mb-8 uppercase tracking-widest flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent-gold/30"></span>
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        return (
          <ul key={idx} className="privacy-content-block space-y-4 mb-8 pl-4 border-l border-accent-gold/20">
            {block.split("\n").map((li, i) => (
              <li key={i} className="text-charcoal/60 font-sans font-medium uppercase tracking-widest text-xs flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent-gold rounded-full shrink-0"></span>
                {li.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="privacy-content-block text-xl md:text-2xl font-sans font-medium text-charcoal/60 leading-relaxed mb-8 max-w-4xl italic">
          {block}
        </p>
      );
    });
  };

  return (
    <div ref={containerRef} className="bg-cream min-h-screen relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-gold/[0.02] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-charcoal/[0.01] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
      
      {/* Floating Signage */}
      <div className="fixed top-12 right-12 z-10 hidden md:block vertical-text">
        <span className="text-[10px] font-sans font-black uppercase tracking-[1em] text-charcoal/10">Architecture of Discretion</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-48 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="mb-32">
             <div className="privacy-icon w-24 h-24 bg-charcoal text-accent-gold rounded-[2rem] flex items-center justify-center mb-12 shadow-2xl">
               <ShieldCheck size={48} />
             </div>
             <div className="privacy-header overflow-hidden">
               <h3 className="text-accent-gold uppercase tracking-[0.5em] text-xs font-black mb-6">Security & Protocols</h3>
               <p className="text-charcoal/40 font-sans font-bold text-[10px] uppercase tracking-widest max-w-sm mb-12">
                 Your project vision and personal data are handled with surgical precision and studio confidentiality.
               </p>
               <ArrowDown className="text-charcoal/20 animate-bounce" size={24} />
             </div>
          </div>

          {/* Dynamic Content */}
          <div ref={contentRef} className="privacy-body">
            {renderContent(content)}
          </div>

          {/* Footer Call to Action */}
          <div className="mt-48 pt-24 border-t border-charcoal/5 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div>
               <h4 className="text-3xl font-serif font-black text-charcoal mb-4 uppercase">Direct Inquiries</h4>
               <p className="text-charcoal/50 font-sans font-medium uppercase tracking-widest text-xs">Reach out to our compliance lead for detailed security specs.</p>
            </div>
            <a 
              href="mailto:privacy@luxeinteriors.com"
              className="group flex items-center gap-6 bg-charcoal text-cream px-12 py-6 rounded-2xl font-sans font-black uppercase tracking-widest text-xs hover:bg-accent-gold hover:text-charcoal transition-all duration-500 shadow-2xl shadow-charcoal/20"
            >
              Contact Lead <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
}
