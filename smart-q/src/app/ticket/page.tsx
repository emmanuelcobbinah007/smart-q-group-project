"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function TicketContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("p") || "Unknown Provider";
  const category = searchParams.get("c") || "General";
  
  // Mock live data state
  const [position, setPosition] = useState(3);
  const [waitTime, setWaitTime] = useState(15);
  const [status, setStatus] = useState<"Waiting" | "Called">("Waiting");

  // Simulate queue movement
  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prev) => {
        if (prev > 1) {
          setWaitTime((w) => Math.max(0, w - 5));
          return prev - 1;
        }
        setStatus("Called");
        setWaitTime(0);
        clearInterval(timer);
        return 0;
      });
    }, 10000); // Move up every 10 seconds for demo

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm glass-card rounded-[2.5rem] p-10 z-10 text-center relative overflow-hidden animate-fade-up opacity-0">
      {/* Dynamic top edge glow */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-1000 ${status === "Called" ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]" : "bg-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]"}`} />
      
      <div className="mb-10 mt-4">
        <p className="text-zinc-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">Entry Pass</p>
        <h1 className="text-7xl font-light tracking-tighter text-foreground clip-text-accent">
          #012
        </h1>
      </div>

      <div className="bg-background/40 backdrop-blur-md rounded-2xl p-6 mb-10 border border-surface-border">
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-surface-border border-dashed">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Provider</span>
          <span className="text-foreground font-medium text-sm">{provider}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Service</span>
          <span className="text-foreground font-medium text-sm">{category}</span>
        </div>
      </div>

      {status === "Called" ? (
        <div className="animate-blur-reveal bg-green-950/20 text-green-400 p-6 rounded-2xl border border-green-500/20 mb-10">
          <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-green-500/10 mb-4 border border-green-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">Proceed Forward</h2>
          <p className="text-sm font-light text-green-400/80">It's your turn.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-background/40 backdrop-blur-md rounded-2xl p-5 border border-surface-border">
            <p className="text-foreground font-light text-4xl mb-2 tracking-tighter">{position}</p>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em]">Ahead of you</p>
          </div>
          <div className="bg-background/40 backdrop-blur-md rounded-2xl p-5 border border-surface-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full pointer-events-none" />
            <p className="text-foreground font-light text-4xl mb-2 tracking-tighter">{waitTime}<span className="text-lg opacity-50 ml-1 font-sans">m</span></p>
            <p className="text-accent text-[10px] font-bold uppercase tracking-[0.15em]">Est. Wait</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <button className="w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border hover:bg-surface-border transition-colors">
          Cancel Ticket
        </button>
        <Link href="/" className="text-xs font-medium tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mt-2">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function TicketStatus() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Minimal ambient light */}
      <div className="absolute top-[20%] right-[10%] w-[30vh] h-[30vh] rounded-full bg-accent/5 blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[20%] left-[10%] w-[40vh] h-[40vh] rounded-full bg-surface-border/50 blur-[120px] pointer-events-none" />
      
      <Suspense fallback={
        <div className="w-full max-w-sm glass-card rounded-[2.5rem] p-10 h-[600px] flex items-center justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-accent animate-ping" />
        </div>
      }>
        <TicketContent />
      </Suspense>
    </div>
  );
}
