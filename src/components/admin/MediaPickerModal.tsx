"use client";

import { useState, useEffect } from "react";
import { X, Search, Image as ImageIcon, CheckCircle2, Loader2, Upload } from "lucide-react";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) fetchMedia();
  }, [isOpen]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setMedia(data);
    } catch (error) {
      console.error("Failed to fetch media", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = media.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-cream rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-charcoal/5">
        {/* Header */}
        <div className="p-8 border-b border-charcoal/5 flex items-center justify-between bg-white/50 backdrop-blur-sm">
          <div>
            <h2 className="text-3xl font-serif text-charcoal">Studio <span className="italic">Media.</span></h2>
            <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-black mt-1">Select an asset for your design</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Toolbar */}
        <div className="px-8 py-6 bg-white flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 group-focus-within:text-accent-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-cream border border-charcoal/5 rounded-2xl pl-12 pr-6 py-3.5 text-xs outline-none focus:ring-2 focus:ring-accent-gold/20 transition-all"
            />
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-6 py-3.5 bg-charcoal text-cream rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-gold hover:text-charcoal transition-all">
                <Upload size={16} /> Upload New
             </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-cream/30">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-accent-gold" size={40} />
              <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">Scanning Library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <ImageIcon size={64} className="text-charcoal/5 mb-6" />
               <p className="text-lg font-serif text-charcoal/40 italic">No assets found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMedia.map((item) => (
                <div 
                  key={item.url}
                  onClick={() => setSelected(item.url)}
                  className={`
                    group relative aspect-square rounded-3xl overflow-hidden cursor-pointer border-4 transition-all duration-300
                    ${selected === item.url ? 'border-accent-gold scale-95 shadow-xl' : 'border-transparent hover:border-accent-gold/20'}
                  `}
                >
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <p className="text-[8px] text-white uppercase tracking-widest font-black truncate">{item.name}</p>
                  </div>
                  {selected === item.url && (
                    <div className="absolute top-4 right-4 bg-accent-gold text-charcoal rounded-full p-1 shadow-lg animate-in zoom-in-50">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-charcoal/5 bg-white flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">
            {media.length} Total Assets · {filteredMedia.length} filtered
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={!selected}
              className="px-10 py-4 bg-charcoal text-cream rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-accent-gold hover:text-charcoal transition-all disabled:opacity-50 shadow-xl shadow-charcoal/20"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
