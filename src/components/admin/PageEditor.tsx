"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Trash2, 
  Settings2, 
  Eye, 
  EyeOff, 
  Layout, 
  MoveVertical,
  Type,
  Image as ImageIcon,
  FolderOpen
} from "lucide-react";
import { MediaPickerModal } from "./MediaPickerModal";
import { StatusModal } from "./StatusModal";

interface PageEditorProps {
  pageId: string;
}

export default function PageEditor({ pageId }: PageEditorProps) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<any>(null);

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
    fetchPage();
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${pageId}`);
      const data = await res.json();
      setPage(data);
      if (data.sections && data.sections.length > 0) {
        setActiveTab(data.sections[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch page", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setModal({
      isOpen: true,
      type: "loading",
      title: "Syncing Layout",
      message: "Propagating architectural changes to the production environment..."
    });

    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (res.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "Blueprint Updated",
          message: "The site layout has been successfully refined and synchronized."
        });
      } else {
        setModal({
          isOpen: true,
          type: "error",
          title: "Update Failed",
          message: "A structural error occurred while attempting to save your changes."
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        title: "System Interrupt",
        message: "Connectivity issues detected. Please verify your network and retry."
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    setPage((prev: any) => ({
      ...prev,
      sections: prev.sections.map((s: any) => 
        s.id === sectionId ? { ...s, content: { ...s.content, [field]: value } } : s
      )
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...page.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setPage({ ...page, sections: newSections });
  };

  const deleteSection = (id: string) => {
    setModal({
      isOpen: true,
      type: "confirm",
      title: "Remove Section",
      message: "Are you sure you want to permanently remove this section from the blueprint?",
      onConfirm: () => {
        setPage({ ...page, sections: page.sections.filter((s: any) => s.id !== id) });
      }
    });
  };

  const openMediaPicker = (sectionId: string, field: string) => {
    setMediaPickerTarget({ sectionId, field });
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent-gold"></div>
    </div>
  );

  if (!page) return <div>Page not found.</div>;

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal/5 pb-12">
        <div>
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">Visual Builder</h1>
          <h2 className="text-5xl md:text-6xl font-serif text-charcoal">
            Editing: <span className="italic">{page.name}</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-3 bg-charcoal text-cream px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-accent-gold hover:text-charcoal transition-all shadow-2xl shadow-charcoal/20 disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar / Section List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-6 px-2">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40">Page Structure</h3>
             <button className="text-accent-gold hover:text-charcoal transition-colors">
                <Plus size={20} />
             </button>
          </div>
          
          <div className="space-y-3">
            {page.sections.map((section: any, index: number) => (
              <div 
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`
                  p-6 border rounded-3xl transition-all duration-300 cursor-pointer group relative
                  ${activeTab === section.id ? 'bg-charcoal text-cream border-charcoal shadow-xl' : 'bg-white text-charcoal border-charcoal/5 hover:border-charcoal/20'}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${activeTab === section.id ? 'bg-white/10' : 'bg-cream'}`}>
                        <Layout size={18} />
                     </div>
                     <div>
                        <p className={`text-[8px] font-black uppercase tracking-widest ${activeTab === section.id ? 'text-accent-gold' : 'text-charcoal/30'}`}>
                          Section 0{index + 1}
                        </p>
                        <h4 className="text-sm font-bold leading-none mt-1">{section.type.toUpperCase()}</h4>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }} className="p-2 hover:bg-white/10 rounded-lg"><ChevronUp size={14} /></button>
                     <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }} className="p-2 hover:bg-white/10 rounded-lg"><ChevronDown size={14} /></button>
                     <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="p-2 hover:bg-red-500 rounded-lg text-red-500 hover:text-white"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-8">
           {activeTab && page.sections.find((s: any) => s.id === activeTab) ? (
             <div className="bg-white border border-charcoal/5 rounded-[40px] shadow-2xl shadow-charcoal/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-8 bg-charcoal/5 border-b border-charcoal/5 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-charcoal text-cream rounded-full flex items-center justify-center">
                        <Settings2 size={18} />
                      </div>
                      <h3 className="text-xl font-serif text-charcoal">Edit <span className="italic">{page.sections.find((s: any) => s.id === activeTab).type}</span> Content</h3>
                   </div>
                </div>
                
                <div className="p-10 space-y-10">
                   {Object.entries(page.sections.find((s: any) => s.id === activeTab).content).map(([key, value]: [string, any]) => {
                     // Determine field type
                     const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('img') || key === 'src';
                     const isList = Array.isArray(value);

                     return (
                       <div key={key} className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/40 ml-1 flex items-center gap-2">
                             {isImage ? <ImageIcon size={12} /> : isList ? <MoveVertical size={12} /> : <Type size={12} />}
                             {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>

                          {isImage ? (
                            <div className="flex gap-4">
                               <div className="flex-1 relative">
                                  <input 
                                    type="text" 
                                    value={value} 
                                    onChange={(e) => updateSectionContent(activeTab, key, e.target.value)}
                                    className="w-full bg-cream border border-charcoal/10 rounded-2xl px-6 py-4 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-accent-gold/20"
                                  />
                               </div>
                               <button 
                                 onClick={() => openMediaPicker(activeTab, key)}
                                 className="px-6 bg-charcoal text-cream rounded-2xl flex items-center gap-3 hover:bg-accent-gold hover:text-charcoal transition-all"
                               >
                                  <FolderOpen size={18} />
                                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Browse</span>
                               </button>
                            </div>
                          ) : isList ? (
                            <div className="space-y-4 bg-cream/50 p-6 rounded-3xl border border-charcoal/5">
                               {value.map((item: any, idx: number) => (
                                 <div key={idx} className="flex gap-4 items-start">
                                    <div className="flex-1 space-y-2">
                                       {typeof item === 'string' ? (
                                          <input 
                                            type="text" 
                                            value={item} 
                                            onChange={(e) => {
                                              const newList = [...value];
                                              newList[idx] = e.target.value;
                                              updateSectionContent(activeTab, key, newList);
                                            }}
                                            className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-xs"
                                          />
                                       ) : (
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             {Object.entries(item).map(([subKey, subVal]: [string, any]) => (
                                                <div key={subKey}>
                                                   <span className="text-[8px] font-bold text-charcoal/30 uppercase block mb-1">{subKey}</span>
                                                   <input 
                                                      type="text" 
                                                      value={subVal} 
                                                      onChange={(e) => {
                                                        const newList = [...value];
                                                        newList[idx] = { ...newList[idx], [subKey]: e.target.value };
                                                        updateSectionContent(activeTab, key, newList);
                                                      }}
                                                      className="w-full bg-white border border-charcoal/10 rounded-xl px-4 py-3 text-xs"
                                                   />
                                                </div>
                                             ))}
                                          </div>
                                       )}
                                    </div>
                                    <button className="p-3 text-charcoal/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                 </div>
                               ))}
                               <button className="w-full py-4 border-2 border-dashed border-charcoal/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-charcoal/30 hover:border-accent-gold hover:text-accent-gold transition-all">
                                  Add Item to List
                               </button>
                            </div>
                          ) : (
                            <textarea 
                              rows={value.length > 50 ? 5 : 2}
                              value={value}
                              onChange={(e) => updateSectionContent(activeTab, key, e.target.value)}
                              className="w-full bg-cream border border-charcoal/10 rounded-2xl px-6 py-4 text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent-gold/20 scrollbar-hide resize-none"
                            />
                          )}
                       </div>
                     );
                   })}
                </div>
             </div>
           ) : (
             <div className="h-[40vh] border-2 border-dashed border-charcoal/10 rounded-[40px] flex flex-col items-center justify-center text-charcoal/20">
                <Layout size={48} className="mb-4" />
                <p className="font-serif italic text-xl">Select a section to begin building.</p>
             </div>
           )}
        </div>
      </div>

      <MediaPickerModal 
        isOpen={!!mediaPickerTarget}
        onClose={() => setMediaPickerTarget(null)}
        onSelect={(url) => {
          if (mediaPickerTarget) {
            updateSectionContent(mediaPickerTarget.sectionId, mediaPickerTarget.field, url);
          }
        }}
      />

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
