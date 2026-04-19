"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export default function JournalContent({ posts }: { posts: Post[] }) {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useGSAP(() => {
    // Reveal newly loaded cards
    gsap.fromTo(
      ".journal-card-new",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
      }
    );
  }, { dependencies: [visibleCount], scope: containerRef });

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-6">
            The Journal
          </h1>
          <h2 className="text-5xl md:text-8xl font-serif text-charcoal leading-tight">
            Insights & <br /> <span className="italic">Inspiration</span>.
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {visiblePosts.map((post, index) => (
            <div 
              key={post.id} 
              className={`journal-card group cursor-pointer ${
                index >= visibleCount - 6 ? "journal-card-new" : ""
              } ${
                index % 3 === 1 ? "md:mt-12" : index % 3 === 2 ? "md:mt-24" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-charcoal/5">
                <Image
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <Link href={`/journal/${post.slug}`} className="text-white uppercase tracking-[0.2em] text-xs font-bold border border-white/40 px-4 py-2 hover:bg-white hover:text-charcoal transition-all duration-300">
                     Read Story
                   </Link>
                </div>
              </div>
              
              <Link href={`/journal/${post.slug}`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase tracking-widest text-accent-gold font-bold">{post.category}</span>
                    <span className="text-xs text-charcoal/40 font-sans">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-charcoal group-hover:text-accent-gold transition-colors duration-300 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-charcoal/60 font-sans leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {posts.length > 6 && visibleCount < posts.length && (
          <div className="mt-24 text-center">
            <button 
              onClick={loadMore}
              className="group relative px-8 py-4 overflow-hidden border border-charcoal/10 hover:border-accent-gold transition-colors duration-500"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.3em] font-bold text-charcoal group-hover:text-cream transition-colors duration-500">View All Stories</span>
              <div className="absolute inset-x-0 bottom-0 h-0 bg-accent-gold group-hover:h-full transition-all duration-500 ease-in-out"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
