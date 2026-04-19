"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Save, Loader2, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function AdminSettings() {
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
      setConfig(data);
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
        alert("Settings saved successfully");
      }
    } catch (err) {
      console.error("Failed to save config");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-charcoal/40 italic">Loading settings...</div>;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
          Configurations
        </h1>
        <h2 className="text-5xl md:text-6xl font-serif text-charcoal">
          Site <br /> <span className="italic text-accent-gold">Preferences.</span>
        </h2>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-12 border border-charcoal/5 shadow-sm space-y-8">
            <h3 className="text-2xl font-serif text-charcoal mb-4 flex items-center">
              <Globe className="mr-4 text-accent-gold" size={24} /> Homepage Content
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Hero Title</label>
              <input
                type="text"
                value={config.heroTitle}
                onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Hero Subtitle</label>
              <input
                type="text"
                value={config.heroSubtitle}
                onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div className="bg-white p-12 border border-charcoal/5 shadow-sm space-y-8">
            <h3 className="text-2xl font-serif text-charcoal mb-4 flex items-center">
              <Mail className="mr-4 text-accent-gold" size={24} /> Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Email Address</label>
                <div className="flex items-center space-x-4 bg-cream/50 border-b border-charcoal/10 px-4">
                  <Mail size={16} className="text-charcoal/20" />
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full py-4 bg-transparent focus:border-accent-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Phone Number</label>
                <div className="flex items-center space-x-4 bg-cream/50 border-b border-charcoal/10 px-4">
                  <Phone size={16} className="text-charcoal/20" />
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                    className="w-full py-4 bg-transparent focus:border-accent-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Office Address</label>
                <div className="flex items-start space-x-4 bg-cream/50 border-b border-charcoal/10 px-4 py-4">
                  <MapPin size={16} className="text-charcoal/20 mt-1" />
                  <textarea
                    rows={3}
                    value={config.contactAddress}
                    onChange={(e) => setConfig({ ...config, contactAddress: e.target.value })}
                    className="w-full bg-transparent focus:border-accent-gold outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-charcoal p-12 text-cream shadow-2xl space-y-8">
            <h3 className="text-2xl font-serif text-accent-gold italic">Social Links</h3>
            
            {Object.keys(config.socials || {}).map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1 capitalize">{key} URL</label>
                <input
                  type="text"
                  value={config.socials[key]}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    socials: { ...config.socials, [key]: e.target.value } 
                  })}
                  className="w-full bg-white/5 border-b border-white/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors text-sm"
                />
              </div>
            ))}
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full py-8 rounded-none flex items-center justify-center space-x-4"
            disabled={saving}
          >
            {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
            <span>Save All Configurations</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
