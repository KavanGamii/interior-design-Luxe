"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FooterUnveil } from "@/components/layout/FooterUnveil";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export function PublicLayoutWrapper({ children, config }: { children: React.ReactNode, config: any }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin-module");

  if (isAdmin) {
    return (
      <div className="admin-wrapper bg-white text-black min-h-screen">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Preloader />
      <FooterUnveil footer={<Footer config={config} />}>
        <Navbar config={config} />
        <main className="flex-grow">{children}</main>
      </FooterUnveil>
    </SmoothScroll>
  );
}
