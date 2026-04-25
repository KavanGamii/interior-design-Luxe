"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Upload, 
  Search, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Download,
  Copy,
  LayoutGrid,
  List,
  Maximize2,
  Trash,
  Info,
  FileText,
  PlayCircle,
  File
} from "lucide-react";
import { StatusModal } from "@/components/admin/StatusModal";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
  type: "image" | "video" | "pdf";
}

export function MediaContent() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setMedia(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setModal({
        isOpen: true,
        type: "error",
        title: "File Too Large",
        message: "Maximum size allowed is 50MB for architectural assets."
      });
      return;
    }

    setIsUploading(true);
    setModal({
      isOpen: true,
      type: "loading",
      title: "Uploading",
      message: "Processing asset and connecting to cloud storage..."
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await fetchMedia();
        setModal({
          isOpen: true,
          type: "success",
          title: "Asset Archived",
          message: `${file.name} has been successfully added to your studio library.`
        });
      } else {
        const errorData = await res.json();
        setModal({
          isOpen: true,
          type: "error",
          title: "Upload Failed",
          message: errorData.message || "Could not complete the upload to cloud storage."
        });
      }
    } catch (e) {
      setModal({
        isOpen: true,
        type: "error",
        title: "System Error",
        message: "An unexpected error occurred during the secure upload process."
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (url: string) => {
    setModal({
      isOpen: true,
      type: "confirm",
      title: "Remove Asset",
      message: "Are you sure you want to permanently delete this asset? This action cannot be undone.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/media?url=${encodeURIComponent(url)}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setSelected(null);
            setIsPreviewOpen(false);
            await fetchMedia();
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  const filteredMedia = media.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.url.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPreviewOpen || !selected || filteredMedia.length <= 1) return;

      const currentIndex = filteredMedia.findIndex(m => m.url === selected.url);
      
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % filteredMedia.length;
        setSelected(filteredMedia[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
        setSelected(filteredMedia[prevIndex]);
      } else if (e.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen, selected, filteredMedia]);

  const renderGridIcon = (item: MediaFile) => {
    if (item.type === "image") {
      return (
        <img 
          src={item.url} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      );
    }
    
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-cream/30 gap-3 group-hover:scale-110 transition-transform duration-700">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-charcoal/20 group-hover:text-accent-gold group-hover:shadow-2xl transition-all">
          {item.type === "video" ? <PlayCircle size={32} /> : <FileText size={32} />}
        </div>
        <span className="text-[10px] font-sans font-black tracking-widest text-charcoal/30 uppercase">
          {item.type}
        </span>
      </div>
    );
  };

  const renderPreview = (item: MediaFile) => {
    if (item.type === "image") {
      return (
        <img 
          src={item.url} 
          alt={item.name} 
          className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
        />
      );
    }

    if (item.type === "video") {
      return (
        <video 
          src={item.url} 
          controls 
          autoPlay
          className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-1000"
        />
      );
    }

    if (item.type === "pdf") {
      return (
        <object 
          data={item.url} 
          type="application/pdf" 
          className="w-full h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-1000"
        >
          <div className="flex flex-col items-center justify-center h-full text-cream p-12 text-center">
             <File size={64} className="mb-6 text-accent-gold" />
             <h3 className="text-2xl font-serif font-black mb-4 uppercase">PDF Documentation</h3>
             <p className="text-cream/50 mb-8 max-w-md">Your browser does not support inline PDF viewing. Please download the file to view its full architectural content.</p>
             <a href={item.url} download className="px-10 py-5 bg-accent-gold text-charcoal rounded-2xl font-sans font-black uppercase tracking-widest hover:scale-105 transition-transform">
               Download PDF
             </a>
          </div>
        </object>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header / Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-4xl font-serif font-black text-charcoal mb-4 uppercase tracking-tight">Studio Archive</h1>
          <p className="text-charcoal/50 font-sans font-medium uppercase tracking-widest text-xs">
            Central repository for visual assets, cinema reels, and architectural documentation.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
            <input 
              type="text" 
              placeholder="Search archive..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-charcoal/10 rounded-xl pl-12 pr-6 py-3 font-sans font-bold text-xs uppercase tracking-widest text-charcoal focus:outline-none focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all w-full md:w-64"
            />
          </div>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-charcoal text-cream flex items-center gap-3 px-6 py-3 rounded-xl font-sans font-black text-[10px] uppercase tracking-widest hover:bg-accent-gold hover:text-charcoal transition-all disabled:opacity-50 shadow-xl shadow-charcoal/10"
          >
            {isUploading ? "Uploading..." : "Upload New (Max 50MB)"}
            <Upload size={14} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept="image/*,video/*,.pdf"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {/* Gallery Grid */}
        <div className="h-full overflow-y-auto pr-4 no-scrollbar">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-white animate-pulse rounded-2xl border border-charcoal/5"></div>
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-charcoal/20">
                <ImageIcon size={64} className="mb-4 opacity-20" />
                <p className="font-sans font-black uppercase tracking-widest text-xs">No assets found</p>
              </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-12">
              {filteredMedia.map((item) => (
                <div 
                  key={item.url}
                  onClick={() => {
                    setSelected(item);
                    setIsPreviewOpen(true);
                  }}
                  className={cn(
                    "group relative aspect-square bg-white rounded-3xl border border-charcoal/5 transition-all duration-700 cursor-pointer overflow-hidden hover:border-charcoal/20 hover:shadow-2xl hover:scale-[1.02]",
                  )}
                  data-cursor="media"
                >
                  {renderGridIcon(item)}
                  
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[8px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/40 group-hover:text-accent-gold transition-colors">
                      {item.type}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-[10px] font-sans font-black uppercase tracking-widest text-cream truncate">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Preview Modal with Integrated Details */}
      {isPreviewOpen && selected && (
        <div className="fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-3xl flex animate-in fade-in duration-700">
          
          {/* Main Preview Area */}
          <div className="flex-1 flex flex-col relative min-w-0">
            <div className="h-24 flex items-center justify-between px-10 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent-gold">
                   {selected.type === "video" ? <PlayCircle size={24} /> : selected.type === "pdf" ? <FileText size={24} /> : <ImageIcon size={24} />}
                </div>
                <div>
                  <h4 className="text-white font-serif font-black text-xl uppercase tracking-tight">{selected.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-cream/30 text-[10px] uppercase tracking-widest font-sans font-black">{selected.type} Asset</span>
                    <span className="w-1 h-1 bg-accent-gold rounded-full" />
                    <span className="text-accent-gold text-[10px] uppercase tracking-widest font-sans font-black">{formatSize(selected.size)}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="w-14 h-14 bg-white/5 text-cream hover:bg-white hover:text-charcoal transition-all duration-500 flex items-center justify-center rounded-2xl group shadow-2xl"
                data-cursor="close"
              >
                <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-12 overflow-hidden bg-black/20">
              {renderPreview(selected)}
            </div>
          </div>

          {/* Details Sidebar (Integrated) */}
          <aside className="w-[450px] bg-white border-l border-charcoal/5 p-12 flex flex-col shadow-[-40px_0_80px_rgba(0,0,0,0.2)] animate-in slide-in-from-right duration-700 delay-100">
            <div className="flex items-center gap-4 mb-10">
              <Info className="text-accent-gold" size={24} />
              <h2 className="text-2xl font-serif font-black text-charcoal uppercase tracking-tight">Specifications</h2>
            </div>

            <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar pr-2">
              <div className="group">
                <label className="block text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 mb-3">Asset Filename</label>
                <div className="bg-cream/50 p-5 rounded-2xl border border-charcoal/5 group-hover:border-accent-gold/20 transition-colors">
                  <p className="text-sm font-sans font-bold text-charcoal leading-relaxed break-all">{selected.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 mb-3">Public Access URL</label>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${window.location.origin}${selected.url}`}
                    className="w-full bg-cream/50 border border-charcoal/5 group-hover/input:border-accent-gold/20 rounded-2xl px-5 py-4 text-[11px] font-mono text-charcoal focus:outline-none transition-all pr-16"
                  />
                  <button 
                    onClick={() => copyUrl(`${window.location.origin}${selected.url}`)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white border border-charcoal/5 rounded-xl text-charcoal/40 hover:text-accent-gold hover:shadow-xl transition-all"
                    title="Copy to Clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-cream/50 p-6 rounded-2xl border border-charcoal/5">
                  <label className="block text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 mb-2">Memory Footprint</label>
                  <p className="text-lg font-serif font-black text-charcoal">{formatSize(selected.size)}</p>
                </div>
                <div className="bg-cream/50 p-6 rounded-2xl border border-charcoal/5">
                  <label className="block text-[10px] font-sans font-black uppercase tracking-[0.2em] text-charcoal/30 mb-2">Capture Date</label>
                  <p className="text-lg font-serif font-black text-charcoal">
                    {new Date(selected.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="bg-accent-gold/[0.05] border border-accent-gold/10 p-8 rounded-3xl">
                <h5 className="font-serif font-black text-charcoal uppercase tracking-widest text-[10px] mb-3">System Identity</h5>
                <p className="text-[11px] text-charcoal/50 leading-relaxed font-sans font-medium">
                   This {selected.type} asset is managed within the project's root filesystem. Any modifications here will replicate across all instances where this source is referenced.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-charcoal/5 flex flex-col gap-4">
              <div className="flex gap-4">
                <a 
                  href={selected.url} 
                  download 
                  className="flex-[2] flex items-center justify-center gap-3 bg-charcoal text-cream py-5 rounded-2xl font-sans font-black text-[11px] uppercase tracking-[0.2em] hover:bg-accent-gold hover:text-charcoal transition-all shadow-2xl shadow-charcoal/20"
                >
                  <Download size={18} /> Download
                </a>
                <button 
                  onClick={() => handleDelete(selected.url)}
                  className="w-20 h-[60px] flex items-center justify-center bg-white border-2 border-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20"
                  title="Remove Source"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          </aside>

        </div>
      )}

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
