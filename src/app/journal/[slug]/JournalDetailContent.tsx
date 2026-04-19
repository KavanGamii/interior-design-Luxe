"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readingTime: string;
  content: string;
}

export default function JournalDetailContent({ post }: { post: Post }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Top-down reveals
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.fromTo(".post-image", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1 })
      .fromTo(".post-meta", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.8")
      .fromTo(".post-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, "-=1")
      .fromTo(".post-content", { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=1");

    // Scroll reveal for content blocks
    const contentBlocks = gsap.utils.toArray(".content-block");
    contentBlocks.forEach((block: any) => {
      gsap.from(block, {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: block,
          start: "top 90%",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-cream min-h-screen pt-32 pb-40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/journal" 
          className="group inline-flex items-center gap-3 text-accent-gold mb-16 hover:text-charcoal transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-2" />
          <span className="text-xs uppercase tracking-[0.3em] font-bold">Back to Journal</span>
        </Link>
        
        {/* Post Image Hero */}
        <div className="post-image relative aspect-video overflow-hidden mb-16 rounded-sm shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Post Meta */}
        <div className="post-meta flex items-center justify-between border-b border-charcoal/5 pb-8 mb-12">
          <div className="flex items-center gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-2">Author</p>
              <p className="font-serif text-lg text-charcoal">{post.author}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-2">Reading Time</p>
              <p className="font-serif text-lg text-charcoal">{post.readingTime}</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-2">Date</p>
             <p className="font-serif text-lg text-charcoal">{post.date}</p>
          </div>
        </div>

        {/* Main Content */}
        <article className="max-w-3xl">
          <header className="mb-16">
            <span className="text-accent-gold uppercase tracking-[0.4em] text-xs font-bold block mb-6">{post.category}</span>
            <h1 className="post-title text-5xl md:text-7xl font-serif text-charcoal leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="post-content space-y-12">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="content-block text-xl md:text-2xl text-charcoal/80 font-sans leading-relaxed selection:bg-accent-gold/20"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-24 pt-24 border-t border-charcoal/5 text-center">
             <p className="text-charcoal/40 uppercase tracking-[0.4em] text-sm font-bold mb-8">Ready to start your project?</p>
             <Link 
              href="/contact" 
              className="text-4xl md:text-6xl font-serif text-charcoal hover:text-accent-gold transition-colors duration-500 italic underline decoration-accent-gold/20"
             >
               Work with <span className="text-accent-gold">Luxe</span>.
             </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
