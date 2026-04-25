"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Users, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: "Total Projects", value: "0", icon: FolderKanban, change: "+0%", changeType: "increase" },
    { name: "Total Views", value: "1,240", icon: Eye, change: "+12.5%", changeType: "increase" },
    { name: "Client Inquiries", value: "24", icon: Users, change: "+5.4%", changeType: "increase" },
    { name: "Revenue Growth", value: "18%", icon: TrendingUp, change: "+2.1%", changeType: "increase" },
  ]);

  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/system/sync", { method: "POST" });
      if (res.ok) {
        setSyncDone(true);
        setTimeout(() => setSyncDone(false), 5000);
      }
    } catch (e) {
      console.error("Sync failed", e);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
            Studio Command
          </h1>
          <h2 className="text-5xl md:text-6xl font-serif text-charcoal">
            Welcome back, <br /> <span className="italic text-accent-gold">Kavan.</span>
          </h2>
        </div>

        <div className="bg-charcoal p-6 rounded-2xl border border-cream/5 shadow-2xl flex items-center gap-6 group">
          <div className="space-y-1">
             <p className="text-[10px] uppercase tracking-widest font-black text-accent-gold">Environment Status</p>
             <p className="text-xs text-cream/60">Live Deployment Ready</p>
          </div>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="bg-accent-gold text-charcoal px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
          >
            {syncing ? "Syncing..." : syncDone ? "Identity Synced ✓" : "Sync Local to Cloud"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 border border-charcoal/5 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-charcoal text-cream rounded-xl group-hover:bg-accent-gold group-hover:text-charcoal transition-colors duration-500">
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-charcoal/40 text-[10px] uppercase tracking-widest font-black mb-1">
              {stat.name}
            </p>
            <p className="text-4xl font-serif text-charcoal">{stat.value}</p>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent-gold group-hover:w-full transition-all duration-700"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-12 border border-charcoal/5 shadow-sm">
          <h3 className="text-2xl font-serif text-charcoal mb-8 border-b border-charcoal/5 pb-6">Recent Activity</h3>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="w-10 h-10 rounded-full bg-cream border border-charcoal/5 flex items-center justify-center flex-shrink-0">
                  <span className="text-charcoal/40 text-[10px] font-bold">0{i}</span>
                </div>
                <div>
                  <p className="text-sm font-sans text-charcoal/80 mb-1">
                    <span className="font-bold text-charcoal">New project</span> "Modern Minimalist Loft" was added to the portfolio.
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/30">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal p-12 text-cream shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-serif text-accent-gold mb-6 italic">Quick Tip</h3>
            <p className="text-lg text-cream/70 font-sans leading-relaxed mb-8">
              Keep your projects updated with high-resolution imagery and detailed descriptions to improve your conversion rate.
            </p>
            <button className="text-xs uppercase tracking-widest font-bold text-cream underline underline-offset-8 decoration-accent-gold/40 hover:decoration-accent-gold transition-all duration-300">
              View Guidelines
            </button>
          </div>
          <div className="absolute -bottom-12 -right-12 text-[15rem] font-serif font-black text-white/5 pointer-events-none select-none">
            LUXE.
          </div>
        </div>
      </div>
    </div>
  );
}
