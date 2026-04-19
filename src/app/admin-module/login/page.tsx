"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin-module");
        router.refresh();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-cream p-12 shadow-2xl">
        <div className="mb-12 text-center text-charcoal">
          <h1 className="text-4xl font-serif font-bold mb-4">LUXE ADMIN</h1>
          <p className="text-sm font-sans uppercase tracking-[0.3em] font-bold text-accent-gold">
            Secure Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-charcoal/5 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              placeholder="kavan@2026"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-black text-charcoal/40 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal/5 border-b border-charcoal/10 px-4 py-4 focus:border-accent-gold outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>}

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full py-6"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <p className="mt-12 text-center text-charcoal/40 text-[10px] uppercase tracking-widest font-bold">
          Protected System — Unauthorized Access is Prohibited
        </p>
      </div>
    </div>
  );
}
