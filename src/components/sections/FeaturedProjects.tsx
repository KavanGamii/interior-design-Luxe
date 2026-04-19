"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjects({ projects }: { projects: any[] }) {
  const containerRef = useRef(null);
  
  // Use provided projects or fall back to empty array
  const displayProjects = projects || [];

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">
            Our Portfolio
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif text-charcoal max-w-2xl leading-tight">
            Selected Works of <br /> Architectural Art.
          </h3>
        </div>
        <Link 
          href="/projects" 
          className="group flex items-center text-charcoal font-sans font-bold uppercase tracking-widest text-sm"
        >
          View All Projects
          <span className="ml-2 w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:bg-charcoal group-hover:text-cream transition-all duration-300">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {displayProjects.map((project, index) => (
          <div key={project._id || index} className="project-card group cursor-none">
            <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden aspect-[4/5] bg-cream">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-cream font-serif text-3xl italic">View Project</span>
              </div>
            </Link>
            <div className="mt-8 flex justify-between items-start">
              <div>
                <p className="text-accent-gold text-xs uppercase tracking-[0.2em] font-bold mb-2">
                  {project.category}
                </p>
                <h4 className="text-3xl font-serif text-charcoal">
                  {project.title}
                </h4>
              </div>
              <span className="text-charcoal/20 text-5xl font-serif">0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
