"use client";

import { useEffect } from "react";

export function ThemeProvider({ theme }: { theme?: any }) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    
    // Map theme tokens to CSS variable names
    const tokens = {
      "--accent-gold": theme.accentGold,
      "--charcoal": theme.charcoal,
      "--cream": theme.cream,
      "--muted-brown": theme.mutedBrown,
    };

    // Apply each token
    Object.entries(tokens).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(key, value);
      }
    });

    // Also update Tailwind colors if they are mapped to variables
    // For this to work, tailwind.config.ts should use var(--accent-gold) etc.
  }, [theme]);

  return null;
}
