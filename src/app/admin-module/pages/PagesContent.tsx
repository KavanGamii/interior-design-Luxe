"use client";

import { useState } from "react";
import { 
  File, 
  ExternalLink, 
  Layout, 
  BookOpen, 
  Sparkles,
  Phone,
  Info,
  Briefcase,
  Layers,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CORE_PAGES = [
  { id: "home", name: "Home", href: "/", icon: Sparkles, desc: "Main landing experience with cinematic hero and featured work." },
  { id: "about", name: "About", href: "/about", icon: Info, desc: "Our story, studio philosophy, and design methodology." },
  { id: "services", name: "Services", href: "/services", icon: Layers, desc: "Detailed breakdown of our architectural and design disciplines." },
  { id: "philosophy", name: "Philosophy", href: "/philosophy", icon: BookOpen, desc: "Deep dive into our 'Quiet Luxury' and architectural intent." },
  { id: "projects", name: "Projects", href: "/projects", icon: Briefcase, desc: "Complete archive of all completed and ongoing work." },
  { id: "journal", name: "Journal", href: "/journal", icon: File, desc: "Editorial articles, design news, and seasonal inspirations." },
  { id: "contact", name: "Contact", href: "/contact", icon: Phone, desc: "Direct inquiries and studio location details." },
];

export function PagesContent({ projects, journalPosts }: { projects: any[], journalPosts: any[] }) {
  const [filter, setFilter] = useState("all");

  const filteredCorePages = filter === "all" 
    ? CORE_PAGES 
    : CORE_PAGES.filter(p => p.id === filter);

  const showProjects = filter === "all" || filter === "projects";
  const showJournal = filter === "all" || filter === "journal";

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-black text-charcoal mb-4 uppercase tracking-tight">Site Map & Pages</h1>
          <p className="text-charcoal/50 font-sans font-medium uppercase tracking-widest text-xs">
            Manage your website architecture and content hierarchy.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative group min-w-[200px]">
          <label className="block text-[10px] font-sans font-black uppercase tracking-widest text-charcoal/30 mb-2 ml-1">Filter by Section</label>
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white border border-charcoal/10 rounded-xl px-5 py-3 pr-10 appearance-none font-sans font-bold text-xs uppercase tracking-widest text-charcoal focus:outline-none focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all cursor-pointer"
            >
              <option value="all">All Pages</option>
              <option value="home">Home Page</option>
              <option value="about">About Us</option>
              <option value="services">Services</option>
              <option value="philosophy">Philosophy</option>
              <option value="projects">Projects Hub</option>
              <option value="journal">Journal Hub</option>
              <option value="contact">Contact</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
              <Filter size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Core Pages Section */}
      {filteredCorePages.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 mb-8 border-b border-charcoal/5 pb-4">
            <Layout className="text-accent-gold" size={20} />
            <h2 className="text-sm font-sans font-black text-charcoal/40 uppercase tracking-[0.2em]">Main Navigation Nodes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCorePages.map((page) => (
              <Link 
                key={page.href} 
                href={`/admin-module/pages/${page.id}`}
                className="group bg-white border border-charcoal/5 p-8 rounded-2xl hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="w-12 h-12 bg-charcoal text-cream flex items-center justify-center rounded-xl mb-6 group-hover:bg-accent-gold group-hover:text-charcoal transition-colors duration-300">
                    <page.icon size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-3">{page.name}</h3>
                  <p className="text-charcoal/40 text-sm leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                    {page.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-accent-gold">
                      {page.id === 'home' ? '/' : `/${page.id}`}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(page.href, '_blank');
                      }}
                      className="flex items-center text-[10px] font-sans font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors"
                    >
                      View Live <ExternalLink size={12} className="ml-2" />
                    </button>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="mt-8 pt-6 border-t border-charcoal/5 flex items-center justify-between transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">Enter Visual Builder</span>
                   <ChevronRight size={16} className="text-accent-gold" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Projects Hub */}
        {showProjects && (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="flex items-center gap-4 mb-8 border-b border-charcoal/5 pb-4">
              <Briefcase className="text-accent-gold" size={20} />
              <h2 className="text-sm font-sans font-black text-charcoal/40 uppercase tracking-[0.2em]">Project Archive ({projects.length})</h2>
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-charcoal/5">
                {projects.map((proj: any) => (
                  <div key={proj.slug} className="p-6 hover:bg-cream/50 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-charcoal/5 rounded-lg flex items-center justify-center text-charcoal/40 font-serif font-bold italic group-hover:bg-accent-gold group-hover:text-charcoal transition-colors">
                        P
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-bold text-charcoal uppercase tracking-tighter">{proj.title}</h4>
                        <p className="text-[10px] text-accent-gold tracking-widest uppercase">/projects/{proj.slug}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/projects/${proj.slug}`} 
                      target="_blank"
                      className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/20 group-hover:text-charcoal group-hover:border-charcoal/20 group-hover:bg-white transition-all transform group-hover:scale-110"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Journal Hub */}
        {showJournal && (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="flex items-center gap-4 mb-8 border-b border-charcoal/5 pb-4">
              <BookOpen className="text-accent-gold" size={20} />
              <h2 className="text-sm font-sans font-black text-charcoal/40 uppercase tracking-[0.2em]">Journal Entries ({journalPosts.length})</h2>
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-charcoal/5">
                {journalPosts.map((post: any) => (
                  <div key={post.slug} className="p-6 hover:bg-cream/50 transition-colors group flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-charcoal/5 rounded-lg flex items-center justify-center text-charcoal/40 font-serif font-bold italic group-hover:bg-accent-gold group-hover:text-charcoal transition-colors">
                        J
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-bold text-charcoal uppercase tracking-tighter">{post.title}</h4>
                        <p className="text-[10px] text-accent-gold tracking-widest uppercase">/journal/{post.slug}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/journal/${post.slug}`} 
                      target="_blank"
                      className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/20 group-hover:text-charcoal group-hover:border-charcoal/20 group-hover:bg-white transition-all transform group-hover:scale-110"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
