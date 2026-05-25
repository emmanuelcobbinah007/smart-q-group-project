"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";

export default function ProviderLogin() {
  const router = useRouter();
  const { state, session, loginAsProvider } = useQueue();

  useEffect(() => {
    if (session.role === "provider") {
      router.replace("/provider");
    }
  }, [session, router]);

  const handleSelect = (providerId: string) => {
    loginAsProvider(providerId);
    router.push("/provider");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-lg z-10 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <div className="space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent">Provider Access</p>
          <h1 className="text-4xl font-semibold tracking-tighter text-foreground">Who are you?</h1>
          <p className="text-zinc-500 font-light text-lg">Select your identity to access your queue.</p>
        </div>

        <div className="space-y-4">
          {state.providers.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSelect(provider.id)}
              disabled={!provider.isActive}
              className="w-full glass-card rounded-2xl p-6 flex items-center gap-6 text-left hover:border-accent/30 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
            >
              <div className="w-14 h-14 rounded-full bg-surface-border flex items-center justify-center text-sm font-bold tracking-tighter flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                {provider.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold tracking-tight text-foreground">{provider.name}</p>
                <p className="text-sm font-light text-zinc-500">{provider.role}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`w-2 h-2 rounded-full ${provider.isActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-surface-border"}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {provider.isActive ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-8 tracking-wide">
          Need admin access?{" "}
          <Link href="/admin/login" className="text-zinc-400 hover:text-foreground transition-colors underline underline-offset-4">
            Enter admin panel
          </Link>
        </p>
      </main>
    </div>
  );
}
