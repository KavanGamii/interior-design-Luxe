"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Instagram, Linkedin, X, Image as ImageIcon } from "lucide-react";

export default function ContactContent({ config }: { config?: any }) {
  const containerRef = useRef(null);

  const email = config?.contactEmail || "hello@luxeinteriors.com";
  const phone = config?.contactPhone || "+44 (0) 20 7946 0123";
  const address = config?.contactAddress || "124 Baker Street, London, W1U 6TY";
  const socials = config?.socials || {
    instagram: "#",
    pinterest: "#",
    linkedin: "#",
  };

  useGSAP(() => {
    gsap.fromTo(
      ".contact-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="contact-reveal">
            <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
              Contact
            </h1>
            <h2 className="text-6xl md:text-8xl font-serif text-charcoal leading-tight mb-12">
              Let's <br /> <span className="italic text-accent-gold">Collaborate.</span>
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center rounded-full flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-black text-charcoal/40 mb-2">Email Us</h4>
                  <p className="text-2xl font-serif text-charcoal">{email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center rounded-full flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-black text-charcoal/40 mb-2">Call Us</h4>
                  <p className="text-2xl font-serif text-charcoal">{phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center rounded-full flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-black text-charcoal/40 mb-2">Visit Us</h4>
                  <p className="text-2xl font-serif text-charcoal" dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-charcoal/10">
              <h4 className="text-xs uppercase tracking-widest font-black text-charcoal/40 mb-6">Follow Our Journey</h4>
              <div className="flex space-x-6">
                <a href={socials.instagram} target="_blank" className="w-10 h-10 border border-charcoal/10 rounded-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href={socials.linkedin} target="_blank" className="w-10 h-10 border border-charcoal/10 rounded-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300">
                  <Linkedin size={18} />
                </a>
                <a href={socials.twitter || socials.pinterest} target="_blank" className="w-10 h-10 border border-charcoal/10 rounded-full flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300">
                   {socials.twitter ? <X size={18} /> : <ImageIcon size={18} />}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-reveal bg-white p-8 md:p-12 border border-charcoal/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 -z-10 translate-x-12 -translate-y-12 sm:block hidden"></div>
            <h3 className="text-3xl font-serif text-charcoal mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Full Name</label>
                  <input type="text" className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Email Address</label>
                  <input type="email" className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Project Type</label>
                <select className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors appearance-none">
                  <option>Residential Interior</option>
                  <option>Commercial Space</option>
                  <option>Hospitality Project</option>
                  <option>Bespoke Consultation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Your Message</label>
                <textarea rows={4} className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors resize-none" placeholder="Tell us about your vision..."></textarea>
              </div>
              <Button size="lg" className="w-full py-6 rounded-none">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
