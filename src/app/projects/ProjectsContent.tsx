"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ProjectsContent({ projects }: { projects: any[] }) {
  const containerRef = useRef(null);
  const displayProjects = projects || [];

  useGSAP(() => {
    gsap.fromTo(
      ".project-item",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
          Our Works
        </h1>
        <h2 className="text-6xl md:text-9xl font-serif text-charcoal leading-none">
          Curated <br /> Portfolio.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project) => (
          <Link 
            key={project._id} 
            href={`/projects/${project.slug}`}
            className="project-item group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5 mb-6">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-charcoal text-cream text-[10px] font-bold px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View
              </div>
            </div>
            <div className="flex justify-between items-end border-b border-charcoal/10 pb-4">
              <div>
                <p className="text-accent-gold text-[10px] uppercase tracking-widest mb-1 italic">
                  {project.category}
                </p>
                <h3 className="text-2xl font-serif text-charcoal group-hover:text-accent-gold transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <span className="text-charcoal/40 text-xs font-sans">{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
