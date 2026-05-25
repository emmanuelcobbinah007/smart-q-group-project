"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";

function format12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function TicketContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { state, cancelTicket } = useQueue();

  const ticket = state.tickets.find((t) => t.id === id);
  const provider = ticket ? state.providers.find((p) => p.id === ticket.providerId) : null;

  if (!ticket || !provider) {
    return (
      <div className="w-full max-w-sm glass-card rounded-[2.5rem] p-10 z-10 text-center relative overflow-hidden animate-fade-up opacity-0">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500/60" />
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Ticket not found</h2>
        <p className="text-zinc-500 font-light mb-8">This ticket may have expired or the link is invalid.</p>
        <Link href="/" className="text-xs font-bold tracking-widest uppercase text-foreground hover:text-accent transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const position = state.tickets.filter(
    (t) => t.providerId === ticket.providerId && t.status === "Waiting" && t.joinedAt < ticket.joinedAt
  ).length;

  const waitTime = ticket.status === "Waiting" ? (position + 1) * 5 : 0;

  const handleCancel = () => {
    cancelTicket(ticket.id);
    router.push("/");
  };

  return (
    <div className="w-full max-w-sm glass-card rounded-[2.5rem] p-10 z-10 text-center relative overflow-hidden animate-fade-up opacity-0">
      {/* Status top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-1000 ${
        ticket.status === "Called" || ticket.status === "InProgress"
          ? "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          : ticket.status === "Scheduled"
          ? "bg-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          : ticket.status === "Completed"
          ? "bg-zinc-500"
          : ticket.status === "Cancelled"
          ? "bg-red-500"
          : "bg-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]"
      }`} />

      <div className="mb-10 mt-4">
        <p className="text-zinc-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">Entry Pass</p>
        <h1 className="text-7xl font-light tracking-tighter text-foreground clip-text-accent">
          #{ticket.id}
        </h1>
      </div>

      <div className="bg-background/40 backdrop-blur-md rounded-2xl p-6 mb-10 border border-surface-border">
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-surface-border border-dashed">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Client</span>
          <span className="text-foreground font-medium text-sm">{ticket.clientName}</span>
        </div>
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-surface-border border-dashed">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Provider</span>
          <span className="text-foreground font-medium text-sm">{provider.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">Service</span>
          <span className="text-foreground font-medium text-sm">{ticket.category}</span>
        </div>
      </div>

      {/* Status panels */}
      {ticket.status === "Waiting" && (
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-background/40 backdrop-blur-md rounded-2xl p-5 border border-surface-border">
            <p className="text-foreground font-light text-4xl mb-2 tracking-tighter">{position}</p>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em]">Ahead of you</p>
          </div>
          <div className="bg-background/40 backdrop-blur-md rounded-2xl p-5 border border-surface-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full pointer-events-none" />
            <p className="text-foreground font-light text-4xl mb-2 tracking-tighter">
              {waitTime}<span className="text-lg opacity-50 ml-1 font-sans">m</span>
            </p>
            <p className="text-accent text-[10px] font-bold uppercase tracking-[0.15em]">Est. Wait</p>
          </div>
        </div>
      )}

      {(ticket.status === "Called" || ticket.status === "InProgress") && (
        <div className="animate-blur-reveal bg-green-950/20 text-green-400 p-6 rounded-2xl border border-green-500/20 mb-10">
          <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-green-500/10 mb-4 border border-green-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">Proceed Forward</h2>
          <p className="text-sm font-light text-green-400/80">
            {ticket.status === "InProgress" ? "Session in progress." : "It's your turn."}
          </p>
        </div>
      )}

      {ticket.status === "Scheduled" && (
        <div className="animate-blur-reveal bg-accent/10 text-accent p-6 rounded-2xl border border-accent/20 mb-10">
          <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-accent/10 mb-4 border border-accent/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">Appointment Scheduled</h2>
          <p className="text-sm font-light text-accent/80">
            Return at <span className="font-semibold">{ticket.scheduledTime ? format12h(ticket.scheduledTime) : ticket.scheduledTime}</span>
          </p>
        </div>
      )}

      {ticket.status === "Completed" && (
        <div className="bg-surface-border/20 text-zinc-400 p-6 rounded-2xl border border-surface-border mb-10">
          <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-surface-border/30 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">Visit Complete</h2>
          <p className="text-sm font-light text-zinc-500">Thank you for using Smart-Q.</p>
        </div>
      )}

      {ticket.status === "Cancelled" && (
        <div className="bg-red-950/20 text-red-400 p-6 rounded-2xl border border-red-500/20 mb-10">
          <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-red-500/10 mb-4 border border-red-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-2">Ticket Cancelled</h2>
          <p className="text-sm font-light text-red-400/80">This ticket has been cancelled.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {ticket.status === "Waiting" && (
          <button
            onClick={handleCancel}
            className="w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border hover:bg-red-950/20 hover:border-red-500/30 hover:text-red-400 transition-colors"
          >
            Cancel Ticket
          </button>
        )}
        <div className="flex justify-center gap-6 mt-2">
          <Link href="/history" className="text-xs font-medium tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors">
            My History
          </Link>
          <Link href="/" className="text-xs font-medium tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TicketStatus() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
