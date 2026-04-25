"use client";

import { X, AlertCircle, CheckCircle2, HelpCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface StatusModalProps {
  isOpen: boolean;
  type: "success" | "error" | "confirm" | "loading";
  title: string;
  message: string;
  onConfirm?: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function StatusModal({
  isOpen,
  type,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: StatusModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="text-green-500" size={48} />,
    error: <AlertCircle className="text-red-500" size={48} />,
    confirm: <HelpCircle className="text-accent-gold" size={48} />,
    loading: <Loader2 className="text-accent-gold animate-spin" size={48} />
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={type !== "loading" ? onClose : undefined} 
      />
      
      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden border border-charcoal/5 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
        {/* Content */}
        <div className="p-10 flex flex-col items-center text-center">
          <div className="mb-6 p-4 bg-cream rounded-3xl">
            {icons[type]}
          </div>
          
          <h3 className="text-2xl font-serif text-charcoal mb-3 uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-charcoal/50 font-sans leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        {type !== "loading" && (
          <div className="p-8 bg-cream/30 border-t border-charcoal/5 flex flex-col sm:flex-row gap-4">
            {type === "confirm" ? (
              <>
                <button 
                  onClick={onClose}
                  className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors border border-charcoal/5 bg-white"
                >
                  {cancelText}
                </button>
                <button 
                  onClick={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  className="flex-1 px-8 py-4 rounded-2xl bg-charcoal text-cream text-[10px] font-black uppercase tracking-widest hover:bg-accent-gold hover:text-charcoal transition-all shadow-xl shadow-charcoal/10"
                >
                  {confirmText}
                </button>
              </>
            ) : (
              <button 
                onClick={onClose}
                className="w-full px-8 py-4 rounded-2xl bg-charcoal text-cream text-[10px] font-black uppercase tracking-widest hover:bg-accent-gold hover:text-charcoal transition-all shadow-xl shadow-charcoal/10"
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
