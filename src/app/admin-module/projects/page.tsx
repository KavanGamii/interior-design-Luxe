"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project");
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-accent-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
            Content Manager
          </h1>
          <h2 className="text-5xl md:text-6xl font-serif text-charcoal">
            Portfolio <br /> <span className="italic text-accent-gold">Directory.</span>
          </h2>
        </div>
        <Link href="/admin-module/projects/new">
          <Button variant="primary" size="lg" className="rounded-full flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Project</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-charcoal/5 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal text-cream uppercase tracking-widest text-[10px] font-bold">
              <th className="px-8 py-6">Project</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Year</th>
              <th className="px-8 py-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-8 py-24 text-center text-charcoal/40 font-sans italic">
                  Loading projects...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-24 text-center text-charcoal/40 font-sans italic">
                  No projects found. Create your first masterpiece.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project._id} className="hover:bg-accent-gold/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative w-16 h-16 bg-cream border border-charcoal/5 overflow-hidden">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-serif text-charcoal font-bold">{project.title}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-charcoal/30">{project.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-sans text-charcoal/60 uppercase tracking-widest border-l border-charcoal/5">
                    {project.category}
                  </td>
                  <td className="px-8 py-6 text-sm font-sans text-charcoal/60 border-l border-charcoal/5">
                    {project.year}
                  </td>
                  <td className="px-8 py-6 border-l border-charcoal/5">
                    <div className="flex items-center space-x-4">
                      <Link 
                        href={`/projects/${project.id || project._id}`} 
                        target="_blank"
                        className="p-2 text-charcoal/20 hover:text-accent-gold transition-colors"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link 
                        href={`/admin-module/projects/${project._id}`}
                        className="p-2 text-charcoal/20 hover:text-charcoal transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(project._id)}
                        className="p-2 text-charcoal/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
