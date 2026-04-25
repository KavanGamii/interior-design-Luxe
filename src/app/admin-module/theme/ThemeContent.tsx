"use client";

import { StatusModal } from "../../components/admin/StatusModal";

const THEME_LABELS = {
  accentGold: {
    label: "Accent Color",
    desc: "Used for highlights, pills, icons, and emphasized text. Defines the 'Luxury' feel.",
    default: "#c5a572"
  },
  charcoal: {
    label: "Primary Text / Dark Background",
    desc: "The main text color and the dark background for high-contrast sections.",
    default: "#1a1a1a"
  },
  cream: {
    label: "Main Background",
    desc: "The primary light background color for the entire website. Evokes 'Quiet Luxury'.",
    default: "#fcfaf5"
  },
  mutedBrown: {
    label: "Subtle Accent",
    desc: "Used for secondary highlights and muted background elements.",
    default: "#8d775f"
  }
};

export default function ThemeContent() {
  const [config, setConfig] = useState<any>(null);
  const [theme, setTheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Status Modal State
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "confirm" | "loading";
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: ""
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/config");
      const data = await res.json();
      setConfig(data);
      setTheme(data.theme || {
        accentGold: "#c5a572",
        charcoal: "#1a1a1a",
        cream: "#fcfaf5",
        mutedBrown: "#8d775f"
      });
    } catch (error) {
      console.error("Failed to fetch config", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setModal({
      isOpen: true,
      type: "loading",
      title: "Deploying Identity",
      message: "Propagating brand color tokens across the global digital infrastructure..."
    });

    try {
      const newConfig = { ...config, theme };
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Identity Synced",
          message: "The studio's visual atmosphere has been successfully updated. The system will now refresh to apply changes.",
          onConfirm: () => window.location.reload()
        });
      } else {
        setModal({
          isOpen: true,
          type: "error",
          title: "Deployment Failed",
          message: "Could not synchronize theme tokens. Please verify your cloud connection."
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        title: "System Interrupt",
        message: "An unexpected error occurred during the identity deployment."
      });
    } finally {
      setSaving(false);
    }
  };

  const updateColor = (key: string, value: string) => {
    setTheme((prev: any) => ({ ...prev, [key]: value }));
  };

  const resetToDefault = () => {
    setModal({
      isOpen: true,
      type: "confirm",
      title: "Reset Identity",
      message: "Are you sure you want to revert the design system to its original architectural defaults?",
      onConfirm: () => {
        const defaults = Object.fromEntries(
          Object.entries(THEME_LABELS).map(([key, val]) => [key, val.default])
        );
        setTheme(defaults);
      }
    });
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-gold"></div>
    </div>
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal/5 pb-12">
        <div>
          <div className="flex items-center gap-3 text-accent-gold mb-2">
            <Palette size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Design System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-charcoal">
            Studio <span className="italic">Identity.</span>
          </h1>
          <p className="max-w-xl text-charcoal/40 text-sm mt-4 font-medium leading-relaxed">
            Curate your brand's atmosphere by adjusting the architectural color palette. Changes apply globally to all pages.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={resetToDefault}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors px-6 py-4 border border-charcoal/5 rounded-full"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-4 bg-charcoal text-cream px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-accent-gold hover:text-charcoal transition-all shadow-2xl shadow-charcoal/20 disabled:opacity-50"
          >
            {saving ? (
               <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
            ) : (
              <Save size={16} />
            )}
            {saving ? "Deploying..." : "Deploy Theme"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Color Controls */}
        <div className="space-y-6">
          {Object.entries(THEME_LABELS).map(([key, info]) => (
            <div 
              key={key} 
              className="p-8 bg-white border border-charcoal/5 rounded-[32px] hover:shadow-xl hover:shadow-charcoal/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal flex items-center gap-2 mb-1">
                    {info.label}
                  </h3>
                  <p className="text-[10px] text-charcoal/40 leading-relaxed max-w-xs">{info.desc}</p>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl shadow-inner border border-charcoal/5" 
                  style={{ backgroundColor: theme[key] }}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={theme[key]} 
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="w-full bg-cream border border-charcoal/10 rounded-xl px-12 py-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent-gold/20"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-charcoal/5" style={{ backgroundColor: theme[key] }} />
                </div>
                <input 
                  type="color" 
                  value={theme[key]} 
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-none p-0 overflow-hidden"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live Preview Card */}
        <div className="lg:sticky lg:top-12 space-y-8">
          <div className="p-1 border border-charcoal/5 rounded-[40px] bg-charcoal/5">
            <div className="bg-white rounded-[36px] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-charcoal/5 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full border-2 border-accent-gold" style={{ borderColor: theme.accentGold }} />
                   <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.charcoal }}>Live Preview</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accentGold }} />
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.mutedBrown }} />
                </div>
              </div>

              <div className="p-12 space-y-12" style={{ backgroundColor: theme.cream }}>
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accentGold }}>Atmosphere</span>
                  <h2 className="text-4xl font-serif leading-none" style={{ color: theme.charcoal }}>
                    Redefining <span className="italic" style={{ color: theme.mutedBrown }}>Luxury</span> Living.
                  </h2>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="h-px w-full" style={{ backgroundColor: theme.charcoal + '20' }} />
                  <div className="flex items-end justify-between">
                    <p className="max-w-xs text-xs leading-relaxed" style={{ color: theme.charcoal + '60' }}>
                      Visualizing your choices in real-time. This block demonstrates the contrast between your primary background and text colors.
                    </p>
                    <div className="px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg" style={{ backgroundColor: theme.charcoal }}>
                      Sample Action
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme.accentGold + '10', color: theme.accentGold }}>
                    <Palette size={24} />
                  </div>
                  <div className="aspect-square rounded-2xl flex items-center justify-center border-2 border-dashed" style={{ borderColor: theme.charcoal + '10', color: theme.mutedBrown }}>
                    <Info size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent-gold/5 p-8 rounded-[32px] border border-accent-gold/10 flex gap-6">
            <div className="w-12 h-12 bg-accent-gold text-white rounded-full flex items-center justify-center shrink-0">
               <Info size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-charcoal mb-2">Technical Note</h4>
              <p className="text-[10px] text-charcoal/50 leading-relaxed">
                Color choices use CSS Variables. After deployment, the entire platform (including pages and components) will adapt to your new identity tokens.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StatusModal 
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
}
