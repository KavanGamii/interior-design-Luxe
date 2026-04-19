"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar({ config }: { config?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  const socials = config?.socials || {
    instagram: "#",
    pinterest: "#",
    linkedin: "#",
  };

  const toggleMenu = contextSafe(() => {
    if (!isOpen) {
      setIsOpen(true);
      gsap.to(overlayRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        linksRef.current?.querySelectorAll("a") || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.4,
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => setIsOpen(false),
      });
    }
  });

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 md:px-12 pointer-events-none mix-blend-difference text-white">
        <Link 
          href="/" 
          className="text-2xl font-serif font-bold tracking-tighter pointer-events-auto"
        >
          LUXE.
        </Link>
        
        <button
          onClick={toggleMenu}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-current pointer-events-auto overflow-hidden hover:scale-110 transition-transform duration-300"
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </nav>

      {/* Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[40] bg-charcoal flex flex-col justify-center px-6 md:px-24",
          !isOpen && "hidden"
        )}
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-end">
          {/* Main Links */}
          <div ref={linksRef} className="lg:col-span-8 flex flex-col space-y-4 md:space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={cn(
                  "group flex items-center text-4xl md:text-7xl lg:text-[7vw] font-serif text-cream/30 hover:text-accent-gold transition-colors duration-500 leading-none",
                  pathname === link.href && "text-cream"
                )}
              >
                <span className="mr-6 text-sm font-sans text-accent-gold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  0{NAV_LINKS.indexOf(link) + 1}
                </span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Socials & Contact Info */}
          <div className="lg:col-span-4 flex flex-col space-y-12 text-cream/50 font-sans text-[10px] uppercase tracking-[0.4em] font-black border-l border-cream/10 pl-8 hidden md:block">
            <div className="space-y-4">
              <p className="text-accent-gold/40">Editorial</p>
              <div className="flex flex-col space-y-2">
                <a href={socials.instagram} target="_blank" className="hover:text-cream transition-colors">Instagram</a>
                <a href={socials.pinterest} target="_blank" className="hover:text-cream transition-colors">Pinterest</a>
                <a href={socials.linkedin} target="_blank" className="hover:text-cream transition-colors">LinkedIn</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-accent-gold/40">Inquiries</p>
              <a href={`mailto:${config?.contactEmail || 'hello@luxeinteriors.com'}`} className="hover:text-cream transition-colors block underline underline-offset-4 decoration-accent-gold/20 leading-loose">
                {config?.contactEmail || "hello@luxeinteriors.com"}
              </a>
            </div>

            <div className="pt-8">
               <p className="text-cream/20 leading-relaxed">
                 © 2026 LUXE INTERIORS studio.<br />
                 THE ARCHITECTURE OF INTENT.
               </p>
            </div>
          </div>
        </div>

        {/* Mobile Info (Visible only on small screens) */}
        <div className="md:hidden mt-16 pt-12 border-t border-cream/10 flex flex-col space-y-8 text-cream/40 text-xs uppercase tracking-[0.2em]">
           <div className="flex flex-col space-y-4">
              <a href={socials.instagram} className="hover:text-cream transition-colors">Instagram</a>
              <a href={socials.linkedin} className="hover:text-cream transition-colors">LinkedIn</a>
              <a href={socials.pinterest} className="hover:text-cream transition-colors">Pinterest</a>
           </div>
           <a href={`mailto:${config?.contactEmail || 'hello@luxeinteriors.com'}`} className="text-accent-gold normal-case font-serif tabular-nums text-lg underline decoration-accent-gold/30 underline-offset-4">
              {config?.contactEmail || "hello@luxeinteriors.com"}
           </a>
        </div>
      </div>
    </>
  );
}
