"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

export function Footer({ config }: { config?: any }) {
  const [time, setTime] = useState("");
  const footerRef = useRef(null);

  const email = config?.contactEmail || "hello@luxeinteriors.com";
  const socials = config?.socials || {
    instagram: "#",
    pinterest: "#",
    linkedin: "#",
  };

  useEffect(() => {
    // Update India Time (IST)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-IN", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // 1s for real-time feel
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Reveal animations for footer tiers
    gsap.fromTo(
      ".footer-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      }
    );

    // Marquee animation for social links
    gsap.to(".social-marquee", {
      xPercent: -25,
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-charcoal text-cream overflow-hidden z-0"
    >
      {/* Texture & Gold Dust Layer */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tier 1: Massive Headline */}
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="footer-reveal mb-32 overflow-hidden">
          <h2 className="text-[14vw] font-serif font-black leading-[0.8] tracking-tighter text-cream/5 uppercase whitespace-nowrap">
            WE CRAFT THE FUTURE. WE CRAFT THE FUTURE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start relative z-10">
          {/* Logo Section */}
          <div className="md:col-span-6 footer-reveal">
            <Link href="/" className="group block">
              <span className="text-8xl md:text-[12rem] font-serif font-bold tracking-tighter leading-none group-hover:text-accent-gold transition-colors duration-700">
                LUXE.
              </span>
            </Link>
            <div className="mt-12 max-w-sm">
              <p className="text-xl text-cream/60 font-sans leading-relaxed italic">
                Defining the architecture of tomorrow through the lens of quiet luxury.
              </p>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-3 footer-reveal pt-8 md:pt-16">
            <h4 className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-black mb-10">Navigation</h4>
            <ul className="space-y-6">
              {['Projects', 'Services', 'Philosophy', 'Journal', 'Contact'].map((item) => (
                <li key={item} className="overflow-hidden">
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-2xl font-serif hover:text-accent-gold transition-colors block transform hover:translate-x-4 transition-transform duration-500"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-3 footer-reveal pt-8 md:pt-16">
            <h4 className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-black mb-10">Inquiries</h4>
            <div className="space-y-8">
              <div>
                <p className="text-xs text-cream/40 uppercase tracking-widest mb-2 font-black">Business</p>
                <a href={`mailto:hello@luxeinteriors.in`} className="text-xl font-serif hover:text-accent-gold border-b border-cream/10 pb-1">hello@luxeinteriors.in</a>
              </div>
              <div>
                <p className="text-xs text-cream/40 uppercase tracking-widest mb-2 font-black">Mumbai HQ</p>
                <p className="text-xl font-serif text-cream/80">Worli Sea Face, Mumbai</p>
              </div>
              <div>
                <p className="text-xs text-cream/40 uppercase tracking-widest mb-2 font-black">Studio Local Time</p>
                <p className="text-3xl font-serif text-accent-gold">
                  {time} — {(() => {
                    const istDate = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
                    const hours = istDate.getHours();
                    return hours >= 9 && hours < 21 ? "Open" : "Closed";
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3: Social Marquee & Legal */}
      <div className="border-t border-cream/5 relative z-10 bg-charcoal/50 backdrop-blur-3xl">
        <div className="py-8 overflow-hidden whitespace-nowrap flex items-center border-b border-cream/5 uppercase tracking-[0.8em] font-black text-[10px] text-cream/20">
          <div className="social-marquee flex items-center gap-24">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-24 pr-24">
                <a href={socials.instagram} className="hover:text-accent-gold transition-colors">Instagram</a>
                <a href={socials.linkedin} className="hover:text-accent-gold transition-colors">LinkedIn</a>
                <a href={socials.pinterest} className="hover:text-accent-gold transition-colors">Pinterest</a>
                <a href="#" className="hover:text-accent-gold transition-colors">Vimeo</a>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.4em] font-black text-cream/30 gap-8">
          <p>© 2026 LUXE INTERIORS — THE ARCHITECTURE OF INTENT</p>
          <div className="flex space-x-12">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms</Link>
          </div>
          <p className="flex items-center text-accent-gold">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Studio Active
          </p>
        </div>
      </div>
    </footer>
  );
}
