"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin-module", icon: LayoutDashboard },
  { name: "Projects", href: "/admin-module/projects", icon: FolderKanban },
  { name: "Media", href: "/admin-module/media", icon: ImageIcon },
  { name: "Settings", href: "/admin-module/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-72 bg-charcoal text-cream flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-cream/10">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
            LUXE. <span className="text-[10px] uppercase tracking-widest text-accent-gold ml-2 font-sans font-bold">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl transition-all duration-300",
                pathname === item.href 
                  ? "bg-accent-gold text-charcoal" 
                  : "hover:bg-cream/5 text-cream/60 hover:text-cream"
              )}
            >
              <div className="flex items-center">
                <item.icon size={20} className="mr-4" />
                <span className="font-sans font-bold text-sm uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
              <ChevronRight 
                size={16} 
                className={cn(
                  "opacity-0 transition-opacity",
                  pathname === item.href && "opacity-100"
                )} 
              />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-cream/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 text-cream/40 hover:text-red-400 font-sans font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <LogOut size={20} className="mr-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
