"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Residential Interior",
    location: initialData?.location || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    description: initialData?.description || "",
    image: initialData?.image || "",
    details: initialData?.details || ["", "", ""],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing 
        ? `/api/admin/projects/${initialData._id}` 
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin-module/projects");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData({ ...formData, details: newDetails });
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <Link href="/admin-module/projects" className="flex items-center text-charcoal/40 hover:text-accent-gold transition-colors text-xs uppercase tracking-widest font-bold mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to directory
          </Link>
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
            {isEditing ? "Modify Project" : "New Creation"}
          </h1>
          <h2 className="text-5xl md:text-6xl font-serif text-charcoal">
            {isEditing ? "Refining" : "Designing"} <br /> <span className="italic text-accent-gold">the Vision.</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8 bg-white p-12 border border-charcoal/5 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              placeholder="e.g. The Glass Loft"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors appearance-none"
              >
                <option>Residential Interior</option>
                <option>Commercial Space</option>
                <option>Hospitality Project</option>
                <option>Interior Architecture</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Project Description</label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors resize-none"
              placeholder="Tell the story of this space..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1 block mb-4">Key Features / Details</label>
            {formData.details.map((detail: string, index: number) => (
              <input
                key={index}
                type="text"
                value={detail}
                onChange={(e) => handleDetailChange(index, e.target.value)}
                className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-2 focus:border-accent-gold outline-none transition-colors"
                placeholder={`Detail 0${index + 1}`}
              />
            ))}
            <button 
              type="button"
              onClick={() => setFormData({ ...formData, details: [...formData.details, ""] })}
              className="text-[10px] uppercase tracking-widest font-bold text-accent-gold hover:text-charcoal transition-colors px-1"
            >
              + Add another detail
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-charcoal p-8 text-cream shadow-2xl">
            <h3 className="text-xl font-serif mb-6 italic text-accent-gold">Main Asset</h3>
            <div className="space-y-6">
              <div className="aspect-[4/5] bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center group">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <Upload className="mx-auto mb-4 text-white/20" size={32} />
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">No Image Selected</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-white/40 ml-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors text-sm"
                  placeholder="Paste URL or path..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 border border-charcoal/5 shadow-sm">
            <h3 className="text-xl font-serif text-charcoal mb-6">Metadata</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-cream/50 border-b border-charcoal/10 px-4 py-2 focus:border-accent-gold outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full py-8 rounded-none flex items-center justify-center space-x-3"
            disabled={loading}
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
            <span>{isEditing ? "Save Changes" : "Publish Project"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
