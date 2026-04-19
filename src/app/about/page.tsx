"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function AboutPage() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    // Hero & Reveal Animations
    gsap.fromTo(
      ".about-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
    );

    // Horizontal Scroll for Process
    const sections = gsap.utils.toArray(".process-step");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${horizontalRef.current ? (horizontalRef.current as HTMLElement).offsetWidth : 0}`,
      }
    });

    // Team Card Animations
    const teamCards = gsap.utils.toArray(".team-card");
    teamCards.forEach((card: any) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        }
      });
    });

    // Marquee Reveal
    gsap.from(".awards-marquee", {
      xPercent: 20,
      opacity: 0,
      scrollTrigger: {
        trigger: ".awards-marquee",
        start: "top 95%",
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-cream min-h-screen overflow-x-hidden">
      {/* Intro Section */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="about-item">
            <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
              Our Agency
            </h1>
            <h2 className="text-6xl md:text-8xl font-serif text-charcoal leading-tight mb-8">
              Redefining <br /> <span className="italic">Luxury</span> Living.
            </h2>
          </div>
          <div className="about-item flex flex-col justify-end">
            <p className="text-2xl text-charcoal/80 font-sans leading-relaxed mb-6">
              Luxe Interiors was founded on the principle that your home should be a reflection of your soul. We create environments that are not just seen, but felt.
            </p>
            <p className="text-lg text-charcoal/60 font-sans leading-relaxed">
              Based in London with projects globally, our award-winning team brings a unique blend of architectural precision and visionary artistry to every residential and hospitality project.
            </p>
          </div>
        </div>

        <div className="about-item relative h-[60vh] md:h-[80vh] overflow-hidden mb-24">
          <Image
            src="/luxury_living_room_hero.png"
            alt="Studio Image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Process Section - Horizontal Scroll */}
      <section ref={horizontalRef} className="h-screen flex items-center bg-charcoal text-cream overflow-hidden">
        <div className="flex w-[400%] h-full">
          {[
            { step: "01", title: "Discovery", desc: "We begin by understanding your rhythm of life, aspirations, and the unique spirit of the space." },
            { step: "02", title: "Curation", desc: "A meticulous selection of materials, palettes, and pieces that form the bedrock of your space." },
            { step: "03", title: "Craftsmanship", desc: "Collaborating with master artisans to bring the vision into physical reality with obsessive precision." },
            { step: "04", title: "Reveal", desc: "The transformation is complete. A space that is uniquely yours, ready for the life you live." }
          ].map((item, i) => (
            <div key={i} className="process-step w-screen h-full flex flex-col justify-center px-6 md:px-24">
              <span className="text-accent-gold font-serif text-8xl md:text-[12rem] opacity-20 mb-8">{item.step}</span>
              <h3 className="text-5xl md:text-8xl font-serif mb-6">{item.title}</h3>
              <p className="text-xl md:text-3xl font-sans max-w-2xl opacity-70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">The Studio</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-charcoal italic">Visionaries Behind the Design.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            { name: "Elena Rossi", role: "Founding Partner", img: "/assets/team_1.png" },
            { name: "Julian Thorne", role: "Director of Architecture", img: "/assets/team_2.png" }
          ].map((member, i) => (
            <div key={i} className="team-card group">
              <div className="relative aspect-[3/4] overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <h4 className="text-3xl font-serif text-charcoal mb-2">{member.name}</h4>
              <p className="text-accent-gold uppercase tracking-[0.2em] text-xs font-bold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards Section - Marquee Style */}
      <section className="py-32 bg-white border-y border-charcoal/5">
        <div className="awards-marquee flex whitespace-nowrap overflow-hidden">
          {[
            "Award for Innovation 2024", "•", "Best Luxury Design '23", "•", "Architectural Digest Top 100", "•", "Interior of the Year", "•"
          ].concat([
            "Award for Innovation 2024", "•", "Best Luxury Design '23", "•", "Architectural Digest Top 100", "•", "Interior of the Year", "•"
          ]).map((text, i) => (
            <span key={i} className="text-5xl md:text-9xl font-serif text-charcoal/10 px-12 tracking-tighter">
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <p className="about-item text-charcoal/40 uppercase tracking-[0.4em] text-sm font-bold mb-12">Our Mission</p>
          <h3 className="about-item text-4xl md:text-6xl font-serif text-charcoal leading-tight mb-16 italic">
            "To curate environments where every detail is a testament to the client’s legacy, blending contemporary soul with timeless craftsmanship."
          </h3>
          <div className="about-item">
             <a href="/contact" className="inline-block border-b-2 border-accent-gold pb-2 text-xl font-serif text-charcoal hover:text-accent-gold transition-colors duration-300">Work with us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
