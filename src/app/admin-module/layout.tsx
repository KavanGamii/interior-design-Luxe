"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Image as ImageIcon,
  ChevronRight,
  FileText,
  Box,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin-module", icon: LayoutDashboard },
  { name: "Pages", href: "/admin-module/pages", icon: FileText },
  { name: "Common", href: "/admin-module/common", icon: Box },
  { name: "Media", href: "/admin-module/media", icon: ImageIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Don't show sidebar on login page
  if (pathname === "/admin-module/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-module/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-cream overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-charcoal text-cream flex items-center justify-between px-6 z-[60] border-b border-cream/5">
        <Link href="/" className="text-xl font-serif font-bold tracking-tighter">
          LUXE. <span className="text-[8px] uppercase tracking-widest text-accent-gold ml-1 font-sans font-bold">Admin</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-cream/70 hover:text-cream transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-[55] transition-opacity duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "bg-charcoal text-cream flex flex-col fixed inset-y-0 left-0 z-[58] transition-all duration-300 ease-in-out border-r border-cream/5",
          // Desktop behavior
          isHovered ? "w-72" : "w-20",
          // Mobile behavior
          "max-lg:w-72 max-lg:-translate-x-full",
          isMobileMenuOpen && "max-lg:translate-x-0"
        )}
      >
        <div className={cn(
          "p-8 border-b border-cream/10 flex items-center h-24 overflow-hidden transition-all duration-300",
          !isHovered && "lg:px-6"
        )}>
          <Link href="/admin-module" className="flex items-center whitespace-nowrap min-w-max">
            <span className="text-2xl font-serif font-bold tracking-tighter text-cream">L</span>
            <div className={cn(
              "flex items-center transition-all duration-500 ease-in-out",
              isHovered || isMobileMenuOpen ? "opacity-100 max-w-[200px] ml-0" : "opacity-0 max-w-0 -translate-x-2 overflow-hidden lg:hidden"
            )}>
              <span className="text-2xl font-serif font-bold tracking-tighter text-cream">UXE.</span>
              <span className="text-[10px] uppercase tracking-widest text-accent-gold ml-3 font-sans font-black">Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center p-4 rounded-xl transition-all duration-300 relative whitespace-nowrap overflow-hidden transition-all duration-300",
                pathname === item.href 
                  ? "bg-accent-gold text-charcoal shadow-lg shadow-accent-gold/10" 
                  : "hover:bg-cream/5 text-cream/40 hover:text-cream",
                !isHovered && "lg:justify-center lg:px-0"
              )}
            >
              <item.icon size={20} className={cn("shrink-0 transition-all duration-300", isHovered ? "mr-4" : "lg:mr-0")} />
              <span className={cn(
                "font-sans font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap",
                isHovered || isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 lg:hidden"
              )}>
                {item.name}
              </span>

              {/* Tooltip for collapsed state */}
              {!isHovered && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-charcoal border border-cream/10 rounded-lg text-cream text-[10px] uppercase tracking-widest opacity-0 invisible group-hover:opacity-100 group-hover:visible lg:block transition-all z-[70] pointer-events-none whitespace-nowrap hidden">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className={cn(
          "p-4 border-t border-cream/10 transition-all duration-300 h-24 flex items-center",
          !isHovered && "lg:justify-center"
        )}>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full p-4 text-cream/40 hover:text-red-400 font-sans font-bold text-[10px] uppercase tracking-widest transition-all duration-300 group overflow-hidden",
              !isHovered && "lg:p-2 lg:h-12 lg:w-12 lg:justify-center"
            )}
            title="Sign Out"
          >
            <LogOut size={20} className={cn("shrink-0 transition-all", isHovered ? "mr-4" : "lg:mr-0")} />
            <span className={cn(
              "transition-all duration-300 whitespace-nowrap",
              isHovered || isMobileMenuOpen ? "opacity-100" : "opacity-0 -translate-x-4 lg:hidden"
            )}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 min-h-screen transition-all duration-300 ease-in-out p-6 md:p-12",
          // Desktop padding adjustment
          isHovered ? "lg:ml-72" : "lg:ml-20",
          // Mobile padding
          "max-lg:pt-24"
        )}
      >
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
