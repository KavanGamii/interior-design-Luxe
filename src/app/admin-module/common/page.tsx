"use client";

import { useEffect, useState } from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  Layout,
  Save,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ExternalLink,
  Settings,
  ShieldCheck,
  FileText,
  Youtube,
  Bird,
  Framer,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const OVERVIEW_SECTIONS = [
  {
    id: "header",
    name: "Website Header",
    icon: ArrowUp,
    desc: "Global navigation system including the luxe branding, hamburger menu, and blend-mode visibility logic.",
    details: [
      { label: "Branding", value: "LUXE." },
      { label: "Navigation", value: "Fixed Overlay" },
      { label: "Interactions", value: "GSAP / Mix-Blend" }
    ]
  },
  {
    id: "footer",
    name: "Website Footer",
    icon: ArrowDown,
    desc: "Global footer reveal system containing contact information, social links, and the studio's architectural sign-off.",
    details: [
      { label: "Inquiries", value: "hello@luxeinteriors.com" },
      { label: "Signature", value: "THE ARCHITECTURE OF INTENT" },
      { label: "System", value: "GSAP Footer Unveil" }
    ]
  },
  {
    id: "privacy",
    name: "Privacy Architecture",
    icon: ShieldCheck,
    desc: "Studio data protection protocols and client confidentiality agreements.",
    details: [
      { label: "Compliance", value: "GDPR / Global" },
      { label: "Last Audit", value: "April 2026" },
      { label: "Security", value: "Studio Encryption" }
    ]
  },
  {
    id: "terms",
    name: "Terms of Service",
    icon: FileText,
    desc: "Governing frameworks for architectural consultations and studio engagement.",
    details: [
      { label: "Framework", value: "Studio Standards" },
      { label: "Jurisdiction", value: "Maharashtra, IN" },
      { label: "Updated", value: "2026.04.19" }
    ]
  }
];

export default function AdminCommonPage() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/config");
      const data = await res.json();
      
      // Ensure all potential fields exist for the form
      const defaultSocials = {
        instagram: "#",
        pinterest: "#",
        linkedin: "#",
        facebook: "#",
        twitter: "#",
        vimeo: "#",
        youtube: "#"
      };
      
      const mergedConfig = {
        ...data,
        socials: { ...defaultSocials, ...(data.socials || {}) },
        privacyContent: data.privacyContent || "",
        termsContent: data.termsContent || ""
      };
      
      setConfig(mergedConfig);
    } catch (err) {
      console.error("Failed to fetch config");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        alert("Studio configurations updated successfully");
      }
    } catch (err) {
      console.error("Failed to save config");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-[400px] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-accent-gold" size={32} />
      <p className="text-[10px] font-sans font-black uppercase tracking-widest text-charcoal/20">Establishing connection to studio database...</p>
    </div>
  );

  return (
    <div className="space-y-24 pb-32">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-black text-charcoal mb-4 uppercase tracking-tight">Studio Commons</h1>
          <p className="text-charcoal/50 font-sans font-medium uppercase tracking-widest text-xs">
            Orchestrate global architecture and primary branding signatures.
          </p>
        </div>
        
        <Button 
          onClick={handleSave}
          variant="primary" 
          disabled={saving}
          className="bg-charcoal text-cream hover:bg-accent-gold hover:text-charcoal px-10 py-5 rounded-2xl flex items-center gap-3 transition-all shadow-2xl shadow-charcoal/10"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span className="font-sans font-black text-[10px] uppercase tracking-[0.2em]">Deploy Global Updates</span>
        </Button>
      </div>

      {/* SECTION 01: GLOBAL COMPONENTS ARCHITECTURE */}
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
          <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-charcoal/20">Section 01 / Navigation Architecture</h2>
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {OVERVIEW_SECTIONS.map((section) => (
            <div key={section.id} className="group bg-white border border-charcoal/5 p-10 rounded-[2.5rem] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/[0.03] rounded-bl-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex-1">
                <div className="w-14 h-14 bg-charcoal text-cream flex items-center justify-center rounded-2xl mb-8 group-hover:bg-accent-gold group-hover:text-charcoal transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                  <section.icon size={24} />
                </div>
                
                <h3 className="text-2xl font-serif font-black text-charcoal mb-4 uppercase tracking-tight">{section.name}</h3>
                <p className="text-charcoal/50 text-[11px] leading-relaxed mb-10 max-sm font-medium uppercase tracking-wider">
                  {section.desc}
                </p>

                <div className="space-y-4 mb-10 border-t border-charcoal/5 pt-8">
                  {section.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30">{detail.label}</span>
                      <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-accent-gold font-bold">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4 mt-auto">
                <div className="flex-1 px-6 py-4 border border-charcoal/5 rounded-xl font-sans font-black text-[8px] uppercase tracking-widest text-charcoal/20 bg-cream/5 text-center">
                  Production Asset
                </div>
                <Link 
                  href={section.id === "privacy" ? "/privacy" : section.id === "terms" ? "/terms" : "/"} 
                  target="_blank"
                  className="w-12 h-12 border border-charcoal/10 flex items-center justify-center rounded-xl text-charcoal/40 hover:text-charcoal hover:border-charcoal/20 transition-all bg-white shadow-sm"
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 02: STUDIO SIGNATURE & BRANDING */}
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
          <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-charcoal/20">Section 02 / Presence & Identity</h2>
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Identity Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-white p-12 border border-charcoal/5 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/[0.03] rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              <h3 className="text-2xl font-serif font-black text-charcoal mb-8 flex items-center gap-4 uppercase tracking-tight">
                <span className="w-10 h-10 bg-charcoal text-cream rounded-lg flex items-center justify-center text-sm">
                  <Mail size={18} />
                </span>
                Contact Signature
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 ml-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/20" size={16} />
                    <input
                      type="email"
                      value={config.contactEmail}
                      onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                      className="w-full bg-cream/30 border border-charcoal/5 rounded-2xl pl-16 pr-6 py-4 focus:border-accent-gold outline-none transition-all font-sans font-bold text-charcoal"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 ml-2">Studio Headquarters</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-6 text-charcoal/20" size={16} />
                    <textarea
                      rows={4}
                      value={config.contactAddress}
                      onChange={(e) => setConfig({ ...config, contactAddress: e.target.value })}
                      className="w-full bg-cream/30 border border-charcoal/5 rounded-2xl pl-16 pr-6 py-6 focus:border-accent-gold outline-none transition-all font-sans font-bold text-charcoal resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-gold/[0.05] border border-accent-gold/10 p-8 rounded-3xl flex items-start gap-6">
              <Layout className="text-accent-gold mt-1 shrink-0" size={24} />
              <div>
                <h4 className="font-serif font-bold text-charcoal mb-2 uppercase tracking-tight">Architectural Synergy</h4>
                <p className="text-[10px] text-charcoal/60 leading-relaxed max-w-sm font-bold uppercase tracking-widest">
                  Any refinement made to your signature data here will propagate instantly across the entire studio ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-7">
            <div className="bg-charcoal p-12 text-cream rounded-[2.5rem] shadow-2xl space-y-10 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-bl-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-black text-accent-gold uppercase tracking-tight mb-2 italic">Social Presence</h3>
                <p className="text-cream/30 text-[10px] font-sans font-black uppercase tracking-[0.2em]">Global Studio Networks</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 relative z-10 flex-1">
                {Object.keys(config.socials).map((key) => {
                  const getIcon = () => {
                    switch(key) {
                      case 'instagram': return Instagram;
                      case 'facebook': return Facebook;
                      case 'twitter': return Bird;
                      case 'linkedin': return Linkedin;
                      case 'youtube': return Youtube;
                      case 'vimeo': return PlayCircle;
                      case 'pinterest': return Globe;
                      default: return Globe;
                    }
                  }
                  const Icon = getIcon();
                  
                  let CurrentIcon = Icon;
                  if (key === 'twitter') CurrentIcon = X;

                  return (
                    <div key={key} className="space-y-3">
                      <label className="text-[10px] font-sans font-black uppercase tracking-[1em] text-white/20 ml-2 capitalize">{key}</label>
                      <div className="relative">
                        <CurrentIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10" size={16} />
                        <input
                          type="text"
                          value={config.socials[key]}
                          onChange={(e) => setConfig({ 
                            ...config, 
                            socials: { ...config.socials, [key]: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-4 focus:border-accent-gold outline-none transition-all text-[11px] font-sans font-bold text-cream tracking-wider"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-6 bg-white/[0.03] rounded-2xl border border-white/5 relative z-10">
                <p className="text-[9px] text-cream/40 leading-relaxed font-sans font-black uppercase tracking-[0.2em] text-center">
                  Social links enable global discoverability and digital studio outreach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 03: LEGAL DOCUMENTATION */}
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
          <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-charcoal/20">Section 03 / Studio Documentation</h2>
          <div className="h-[1px] flex-1 bg-charcoal/5"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Privacy Editor */}
          <div className="bg-white p-12 border border-charcoal/5 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/[0.03] rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            <h3 className="text-2xl font-serif font-black text-charcoal mb-8 flex items-center gap-4 uppercase tracking-tight">
              <span className="w-10 h-10 bg-charcoal text-cream rounded-lg flex items-center justify-center text-sm">
                <ShieldCheck size={18} />
              </span>
              Privacy Protocol
            </h3>
            <textarea
              rows={15}
              value={config.privacyContent}
              onChange={(e) => setConfig({ ...config, privacyContent: e.target.value })}
              className="w-full bg-cream/30 border border-charcoal/5 rounded-3xl p-8 focus:border-accent-gold outline-none transition-all font-sans text-sm text-charcoal leading-relaxed resize-none"
              placeholder="Draft your studio's privacy architecture..."
            />
            <p className="mt-4 text-[9px] font-sans font-black uppercase tracking-widest text-charcoal/20 italic">
              Supports raw text and studio architectural standards.
            </p>
          </div>

          {/* Terms Editor */}
          <div className="bg-white p-12 border border-charcoal/5 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/[0.03] rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            <h3 className="text-2xl font-serif font-black text-charcoal mb-8 flex items-center gap-4 uppercase tracking-tight">
              <span className="w-10 h-10 bg-charcoal text-cream rounded-lg flex items-center justify-center text-sm">
                <Scale size={18} />
              </span>
              Terms of Engagement
            </h3>
            <textarea
              rows={15}
              value={config.termsContent}
              onChange={(e) => setConfig({ ...config, termsContent: e.target.value })}
              className="w-full bg-cream/30 border border-charcoal/5 rounded-3xl p-8 focus:border-accent-gold outline-none transition-all font-sans text-sm text-charcoal leading-relaxed resize-none"
              placeholder="Establish your studio's professional engagement terms..."
            />
            <p className="mt-4 text-[9px] font-sans font-black uppercase tracking-widest text-charcoal/20 italic">
              Define the governance of your architectural consultations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
  );
}

function X({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 4l16 16M4 20L20 4"/>
    </svg>
  );
}
