"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export default function PhilosophyPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hero Animation
    gsap.fromTo(
      ".philosophy-hero-text",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );

    gsap.fromTo(
      ".hero-image",
      { scale: 1.2 },
      { scale: 1, duration: 2, ease: "power2.out" }
    );

    // Section Reveals
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section.querySelectorAll(".reveal-text"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Materiality Section Parallax
    gsap.to(".material-item", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".materiality-grid",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-cream">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 hero-image">
          <Image
            src="/assets/philosophy_hero.png"
            alt="Philosophy Hero"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="philosophy-hero-text text-7xl md:text-9xl font-serif text-white tracking-tight leading-none mb-8">
            The <span className="italic">Soul</span> of <br /> Architecture.
          </h1>
          <p className="philosophy-hero-text text-xl md:text-2xl text-white/80 font-sans max-w-2xl mx-auto uppercase tracking-widest">
            A celebration of space, light, and materiality.
          </p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="reveal-section py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="reveal-text text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
              Our Vision
            </h2>
            <h3 className="reveal-text text-5xl md:text-7xl font-serif text-charcoal leading-tight">
              Spaces that <br /> <span className="italic text-muted-brown">Speak</span> to the <br /> Human Spirit.
            </h3>
          </div>
          <div className="flex flex-col gap-8">
            <p className="reveal-text text-xl text-charcoal/80 font-sans leading-relaxed">
              We believe that architecture is more than just structure; it is a backdrop for life’s most profound moments. Every shadow cast and every surface touched is an intentional choice in our narrative of design.
            </p>
            <p className="reveal-text text-lg text-charcoal/60 font-sans leading-relaxed">
              Our philosophy is rooted in the concept of "Quiet Luxury"—an understated elegance that doesn't scream for attention but commands respect through impeccable craftsmanship and thoughtful detail.
            </p>
          </div>
        </div>
      </section>

      {/* Full Width Quote */}
      <section className="reveal-section bg-charcoal py-40 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <blockquote className="reveal-text text-4xl md:text-6xl font-serif text-cream italic leading-snug mb-12">
            "Design is not for philosophy, it's for life. But a life lived well requires a philosophy of beauty."
          </blockquote>
          <cite className="reveal-text text-accent-gold uppercase tracking-[0.3em] font-sans not-italic">
            — Luxe Design Manifesto
          </cite>
        </div>
      </section>

      {/* Materiality Section */}
      <section className="py-32 px-6 md:px-12 bg-white materiality-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <h2 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
                Materiality
              </h2>
              <h3 className="text-5xl font-serif text-charcoal mb-8">
                The Language of <span className="italic">Textures</span>.
              </h3>
              <p className="text-lg text-charcoal/60 font-sans leading-relaxed">
                We source only the finest natural materials—stone that has weathered centuries, timber that breathes, and fabrics hand-loomed with precision.
              </p>
            </div>
            <div className="lg:col-span-2 relative h-[70vh] overflow-hidden rounded-sm material-item">
              <Image
                src="/assets/materiality.png"
                alt="Material Textures"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Placeholder */}
      <section className="py-24 bg-cream text-center">
        <div className="max-w-4xl mx-auto px-6">
          <hr className="border-accent-gold/20 mb-16" />
          <p className="text-sm uppercase tracking-[0.5em] text-charcoal/40 mb-4">Discover More</p>
          <a href="/projects" className="text-4xl md:text-6xl font-serif text-charcoal hover:text-accent-gold transition-colors duration-500">
            View Our <span className="italic underline decoration-accent-gold/30">Works</span>
          </a>
        </div>
      </section>
    </div>
  );
}
