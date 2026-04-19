"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowLeft, Share2, Heart, ArrowRight, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  year: string;
  image: string;
  details: string[];
  stats?: {
    area: string;
    duration: string;
    client: string;
    status: string;
  };
  narrative?: {
    brief: string;
    vision: string;
    execution: string;
  };
  galleryImages?: string[];
}

export default function ProjectDetailContent({ project }: { project: Project }) {
  const containerRef = useRef(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Hero Reveal
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(".hero-image-wrap", 
      { clipPath: "inset(10% 10% 10% 10%)", scale: 1.2 }, 
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 2, ease: "expo.inOut" }
    )
    .fromTo(".hero-title", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2 }, 
      "-=1"
    )
    .fromTo(".hero-meta", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.8"
    );

    // Sequential Narrative Reveal
    const narrativeSteps = gsap.utils.toArray(".narrative-step");
    narrativeSteps.forEach((step: any, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(step.querySelector(".step-number"), {
        scrollTrigger: {
          trigger: step,
          start: "top 90%",
          scrub: 1
        },
        x: -100,
        opacity: 0
      });
    });

    // Technical Blueprint Drawing Animation
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".technical-drawing-wrap",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1.5,
        }
      });
    }

    // Quote Characters Reveal
    gsap.from(".tech-quote span", {
      scrollTrigger: {
        trigger: ".tech-quote",
        start: "top 80%",
      },
      opacity: 0,
      y: 10,
      stagger: 0.02,
      duration: 1,
      ease: "power2.out"
    });

    // CTA Section Animation
    gsap.from(".cta-headline", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      skewY: 5,
      duration: 1.5,
      ease: "power4.out"
    });

    gsap.to(".cta-pulse", {
      scale: 1.2,
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Staggered gallery reveals
    gsap.from(".gallery-item", {
       scrollTrigger: {
         trigger: ".gallery-grid",
         start: "top 70%",
       },
       y: 100,
       opacity: 0,
       stagger: 0.2,
       duration: 1.2,
       ease: "power3.out"
    });

    // Parallax effect on gallery items
    gsap.utils.toArray(".gallery-parallax").forEach((img: any) => {
      gsap.to(img, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true,
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-cream min-h-screen overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-image-wrap absolute inset-0 z-0 bg-charcoal">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-[0.7] grayscale-[0.3]"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="hero-meta mb-8">
            <span className="text-accent-gold uppercase tracking-[0.6em] text-xs font-black">
              {project.category}
            </span>
          </div>
          <h1 className="hero-title text-[12vw] md:text-[10rem] font-serif text-cream leading-[0.85] tracking-tighter mix-blend-difference mb-12">
            {project.title.split(' ').map((word, i) => (
               <span key={i} className={i === 1 ? "italic" : ""}>{word} </span>
            ))}
          </h1>
          <div className="hero-meta flex justify-center items-center gap-12 text-cream/60 uppercase tracking-[0.4em] text-[10px] font-bold">
            <span>{project.location}</span>
            <Minus className="text-accent-gold rotate-90" />
            <span>Est. {project.year}</span>
          </div>
        </div>

        {/* Floating Back Link */}
        <Link href="/projects" className="absolute top-12 left-12 z-20 flex items-center text-cream/40 hover:text-accent-gold transition-colors text-[10px] uppercase tracking-widest font-bold">
          <ArrowLeft size={14} className="mr-3" /> Close Project
        </Link>
      </section>

      {/* Project Statistics Grid */}
      <section className="bg-charcoal text-cream py-24 px-6 md:px-12 border-b border-cream/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {[
            { label: "Surfaced Area", value: project.stats?.area || "N/A" },
            { label: "Timeline", value: project.stats?.duration || "N/A" },
            { label: "Client", value: project.stats?.client || "Confidential" },
            { label: "Status", value: project.stats?.status || "Complete" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-accent-gold uppercase tracking-[0.3em] text-[10px] font-black">{stat.label}</span>
              <span className="text-2xl font-serif italic">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Narrative Section - Redesigned */}
      <section className="narrative-section py-48 px-6 md:px-12 max-w-7xl mx-auto border-b border-charcoal/5">
        <div className="mb-32">
          <h2 className="text-accent-gold uppercase tracking-[0.6em] text-[11px] font-black mb-4">Project Narrative</h2>
          <div className="h-[1px] w-24 bg-accent-gold"></div>
        </div>

        <div className="space-y-48">
          {/* Step 1: The Brief */}
          <div className="narrative-step grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
             <div className="md:col-span-4 relative">
                <span className="step-number text-[12rem] font-serif text-charcoal/[0.03] absolute -top-24 -left-12 pointer-events-none">01</span>
                <h3 className="text-5xl md:text-6xl font-serif text-charcoal italic mb-8">The Brief.</h3>
             </div>
             <div className="md:col-span-8">
                <p className="text-2xl md:text-4xl text-charcoal/80 font-sans leading-[1.3] tracking-tight selection:bg-accent-gold/20">
                  {project.narrative?.brief || project.description}
                </p>
             </div>
          </div>

          {/* Step 2: The Vision */}
          <div className="narrative-step grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
             <div className="md:col-span-4 relative order-1 md:order-2 md:text-right">
                <span className="step-number text-[12rem] font-serif text-charcoal/[0.03] absolute -top-24 md:-right-12 pointer-events-none">02</span>
                <h3 className="text-5xl md:text-6xl font-serif text-charcoal italic mb-8">The Vision.</h3>
             </div>
             <div className="md:col-span-8 order-2 md:order-1">
                <p className="text-2xl md:text-4xl text-charcoal/80 font-sans leading-[1.3] tracking-tight text-right selection:bg-accent-gold/20">
                  {project.narrative?.vision || "A minimalist approach centered on the dialogue between light and volume."}
                </p>
             </div>
          </div>

          {/* Step 3: The Execution */}
          <div className="narrative-step grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
             <div className="md:col-span-4 relative">
                <span className="step-number text-[12rem] font-serif text-charcoal/[0.03] absolute -top-24 -left-12 pointer-events-none">03</span>
                <h3 className="text-5xl md:text-6xl font-serif text-charcoal italic mb-8">The Execution.</h3>
             </div>
             <div className="md:col-span-8">
                <p className="text-2xl md:text-4xl text-charcoal/80 font-sans leading-[1.3] tracking-tight selection:bg-accent-gold/20">
                  {project.narrative?.execution || "Meticulous attention to materiality and light ensures a timeless presence."}
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Studio Gallery */}
      <section className="bg-white py-32 gallery-grid overflow-hidden border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {project.galleryImages?.map((img, i) => (
            <div 
              key={i} 
              className={`gallery-item relative overflow-hidden bg-charcoal/5 shadow-2xl rounded-sm ${
                i === 0 ? "md:col-span-8 aspect-video" : 
                i === 1 ? "md:col-span-4 aspect-[3/4] md:translate-y-24" :
                i === 2 ? "md:col-span-5 aspect-square" :
                "md:col-span-7 aspect-video md:-translate-y-12"
              }`}
            >
              <div className="gallery-parallax absolute inset-0 -top-20 -bottom-20">
                <Image
                  src={img}
                  alt={`Detail ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Depth Section - Redesigned with Blueprint Sketch */}
      <section className="bg-charcoal text-cream py-64 overflow-hidden relative technical-drawing-wrap">
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 800 400" className="w-[80%] h-auto text-accent-gold">
              <path 
                ref={pathRef}
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                d="M100,200 L700,200 M200,100 L200,300 M600,100 L600,300 M150,150 L650,150 M150,250 L650,250 M400,50 L400,350 M300,100 Q400,0 500,100 M300,300 Q400,400 500,300" 
              />
            </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-accent-gold uppercase tracking-[0.6em] text-[10px] font-black mb-12">Technical Integrity</p>
          <div className="tech-quote relative inline-block">
             <h3 className="text-4xl md:text-7xl font-serif italic mb-16 leading-tight">
               {"Architecture is the learned game, correct and magnificent, of forms assembled in light.".split("").map((char, i) => (
                 <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
               ))}
             </h3>
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-accent-gold opacity-40"></div>
          </div>
        </div>
      </section>

      {/* Transformation CTA Section - Redesigned */}
      <section className="cta-section relative py-64 bg-cream overflow-hidden">
        {/* Dynamic Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent-gold/5 rounded-full blur-[120px] cta-pulse z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="text-accent-gold uppercase tracking-[0.8em] text-[10px] font-black mb-16 block">The Finale</span>
          <h2 className="cta-headline text-6xl md:text-[12rem] font-serif text-charcoal leading-[0.8] tracking-tighter mb-24">
             Ready to <br /> <span className="italic">Elevate</span> Yours?
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
             <Button variant="primary" className="rounded-full px-20 h-24 transition-all font-serif italic text-3xl group relative overflow-hidden bg-charcoal hover:bg-accent-gold border-none">
                <span className="relative z-10 flex items-center">
                  Begin Enquiry <ArrowRight className="ml-6 transition-transform group-hover:translate-x-3 h-8 w-8" />
                </span>
             </Button>
             
             <div className="flex flex-col items-center md:items-start gap-2">
                <Link href="/projects" className="text-charcoal/60 uppercase tracking-[0.4em] text-[10px] font-black hover:text-accent-gold transition-colors flex items-center group">
                  Explore Full Portfolio <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
                <div className="w-full h-[1px] bg-charcoal/10 group-hover:bg-accent-gold/30"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Floating Inquiry Button (Clean & Modern) */}
      <div className="fixed bottom-12 right-12 z-50">
        <button className="flex items-center justify-center w-24 h-24 bg-charcoal text-cream rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-accent-gold hover:shadow-accent-gold/20 transition-all duration-700 hover:scale-110 active:scale-90 group overflow-hidden">
           <ArrowRight className="absolute transition-transform duration-700 -translate-x-16 group-hover:translate-x-0 h-8 w-8" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] transition-transform duration-700 group-hover:translate-x-24">Enquire</p>
        </button>
      </div>

    </div>
  );
}
