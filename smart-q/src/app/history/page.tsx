"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";
import { QueueTicket, TicketStatus } from "@/lib/types";

const HISTORY_KEY = "smartq_my_tickets";

const statusConfig: Record<TicketStatus, { label: string; color: string }> = {
  Waiting:    { label: "Waiting",     color: "text-accent bg-accent/10 border-accent/20" },
  Called:     { label: "Called",      color: "text-blue-400 bg-blue-950/20 border-blue-500/20" },
  InProgress: { label: "In Progress", color: "text-green-400 bg-green-950/20 border-green-500/20" },
  Scheduled:  { label: "Scheduled",   color: "text-zinc-400 bg-surface-border/30 border-surface-border" },
  Completed:  { label: "Completed",   color: "text-zinc-500 bg-surface-border/20 border-surface-border" },
  Cancelled:  { label: "Cancelled",   color: "text-red-400 bg-red-950/20 border-red-500/20" },
};

export default function TicketHistory() {
  const { state } = useQueue();
  const [myIds, setMyIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        setMyIds(raw ? JSON.parse(raw) : []);
      } catch {
        setMyIds([]);
      }
    }
  }, []);

  const myTickets: QueueTicket[] = myIds
    .map((id) => state.tickets.find((t) => t.id === id))
    .filter(Boolean) as QueueTicket[];

  const isActive = (t: QueueTicket) =>
    t.status === "Waiting" || t.status === "Called" || t.status === "InProgress" || t.status === "Scheduled";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-2xl mx-auto z-10 py-12 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <div className="space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent">My Tickets</p>
          <h1 className="text-4xl font-semibold tracking-tighter">Visit History</h1>
          <p className="text-zinc-500 font-light text-lg">All queues you have joined on this device.</p>
        </div>

        {myTickets.length === 0 ? (
          <div className="glass-card rounded-[2rem] p-16 text-center">
            <p className="text-zinc-500 font-light text-xl">No tickets yet.</p>
            <Link href="/join" className="mt-6 inline-block text-xs font-bold tracking-widest uppercase text-accent hover:text-foreground transition-colors">
              Join a Queue →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {[...myTickets].reverse().map((ticket) => {
              const provider = state.providers.find((p) => p.id === ticket.providerId);
              const cfg = statusConfig[ticket.status];
              const active = isActive(ticket);
              return (
                <div
                  key={ticket.id}
                  className={`glass-card rounded-2xl p-6 flex items-center gap-6 transition-all ${active ? "hover:-translate-y-0.5 hover:border-accent/30" : "opacity-70"}`}
                >
                  <div className="flex-shrink-0 text-center w-16">
                    <p className="text-2xl font-light tracking-tighter clip-text-accent">#{ticket.id}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold tracking-tight">{provider?.name ?? "Unknown Provider"}</p>
                    <p className="text-sm text-zinc-500">{ticket.category}</p>
                    {ticket.note && <p className="text-xs text-zinc-600 italic mt-1 truncate">"{ticket.note}"</p>}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    {active && (
                      <Link
                        href={`/ticket?id=${ticket.id}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors"
                      >
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
