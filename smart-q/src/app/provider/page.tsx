"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";
import { QueueTicket } from "@/lib/types";

function format12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function ProviderDashboard() {
  const router = useRouter();
  const { state, session, logout, callTicket, startInProgress, scheduleTicket, completeTicket } = useQueue();

  const [activeTab, setActiveTab] = useState<"queue" | "schedule">("queue");
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [scheduleTime, setScheduleTime] = useState("");

  useEffect(() => {
    if (session.role !== "provider") {
      router.replace("/provider/login");
    }
  }, [session, router]);

  if (session.role !== "provider") return null;

  const currentProvider = state.providers.find((p) => p.id === session.providerId);
  if (!currentProvider) return null;

  const myTickets = state.tickets.filter((t) => t.providerId === session.providerId);
  const activeSession = myTickets.find((t) => t.status === "Called" || t.status === "InProgress");
  const waitingTickets = myTickets.filter((t) => t.status === "Waiting");
  const scheduledTickets = myTickets
    .filter((t) => t.status === "Scheduled")
    .sort((a, b) => (a.scheduledTime ?? "").localeCompare(b.scheduledTime ?? ""));

  const handleCall = (ticket: QueueTicket) => {
    callTicket(ticket.id);
  };

  const handleScheduleConfirm = (id: string) => {
    if (!scheduleTime) return;
    scheduleTicket(id, scheduleTime);
    setSchedulingId(null);
    setScheduleTime("");
  };

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  const statusBadge = (ticket: QueueTicket) => {
    if (ticket.status === "Waiting") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
          Waiting
        </span>
      );
    }
    if (ticket.status === "Scheduled") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-surface-border/50 text-zinc-400">
          Sched • {format12h(ticket.scheduledTime!)}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute top-[0%] left-[20%] w-[50vw] h-[20vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />

      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-accent/20 bg-accent/5 text-sm font-bold tracking-tighter">
              {currentProvider.initials}
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">{currentProvider.name}</h1>
              <p className="text-xs text-zinc-500">{currentProvider.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-xs text-zinc-500 hover:text-foreground transition-colors hidden sm:block">Home</Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 border border-surface-border rounded-full hover:bg-foreground hover:text-background transition-colors text-xs font-bold tracking-widest uppercase"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90rem] w-full mx-auto px-6 py-12 space-y-12 z-10 animate-fade-up opacity-0">

        {/* Currently Serving */}
        <section>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Live Session</h2>
          {activeSession ? (
            <div className="glass-card rounded-[2rem] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden hover:border-accent/30 transition-colors">
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent to-transparent" />
              <div className="flex items-center gap-8 pl-4">
                <div className="hidden sm:flex flex-col items-center">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Ticket</span>
                  <div className="text-5xl font-light tracking-tighter clip-text-accent">#{activeSession.id}</div>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight mb-2">{activeSession.clientName}</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-surface-border/50 text-xs font-medium tracking-wide">
                      {activeSession.category}
                    </span>
                    {activeSession.note && (
                      <span className="text-sm text-zinc-500 italic max-w-md truncate">"{activeSession.note}"</span>
                    )}
                    {activeSession.status === "InProgress" && (
                      <span className="px-3 py-1 rounded-full bg-green-950/30 text-green-400 text-xs font-bold tracking-widest uppercase border border-green-500/20">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {activeSession.status === "Called" && (
                  <button
                    onClick={() => startInProgress(activeSession.id)}
                    className="px-6 py-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold uppercase tracking-widest hover:bg-green-500/20 transition-all whitespace-nowrap"
                  >
                    Begin Session
                  </button>
                )}
                <button
                  onClick={() => completeTicket(activeSession.id)}
                  className="px-8 py-4 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 whitespace-nowrap"
                >
                  Conclude Session
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[2rem] p-12 text-center border-dashed border-zinc-700/30">
              <p className="text-zinc-500 font-light text-xl">Queue is open. Ready for the next client.</p>
            </div>
          )}
        </section>

        {/* Tab Bar */}
        <div className="flex gap-1 border-b border-surface-border">
          {(["queue", "schedule"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors relative ${
                activeTab === tab ? "text-foreground" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab === "queue" ? "Live Queue" : "Daily Schedule"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 pb-2">
            {activeTab === "queue" && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-sm font-medium text-zinc-400">{waitingTickets.length} Waiting</span>
              </>
            )}
            {activeTab === "schedule" && (
              <span className="text-sm font-medium text-zinc-400">{scheduledTickets.length} Scheduled</span>
            )}
          </div>
        </div>

        {/* Live Queue Tab */}
        {activeTab === "queue" && (
          <section className="animate-fade-up opacity-0 delay-200 -mt-4">
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-surface-border/50">
                    <tr>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Pass</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Client</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hidden md:table-cell">Request</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">State</th>
                      <th className="px-8 py-6 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {waitingTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-surface-border/20 transition-colors group">
                        <td className="px-8 py-6 text-lg font-light tracking-tighter">#{ticket.id}</td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-base font-semibold tracking-tight">{ticket.clientName}</div>
                        </td>
                        <td className="px-8 py-6 hidden md:table-cell max-w-sm">
                          <div className="text-sm font-medium text-zinc-400">{ticket.category}</div>
                          {ticket.note && <div className="text-sm text-zinc-600 italic truncate mt-1">"{ticket.note}"</div>}
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">{statusBadge(ticket)}</td>
                        <td className="px-8 py-6 whitespace-nowrap text-right">
                          {schedulingId === ticket.id ? (
                            <div className="flex justify-end items-center gap-2">
                              <input
                                type="time"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                className="rounded-lg border border-surface-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                              />
                              <button
                                onClick={() => handleScheduleConfirm(ticket.id)}
                                disabled={!scheduleTime}
                                className="px-4 py-2 bg-accent text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-accent/80 disabled:opacity-40 transition-all"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => { setSchedulingId(null); setScheduleTime(""); }}
                                className="px-3 py-2 border border-surface-border text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-surface-border transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleCall(ticket)}
                                disabled={!!activeSession}
                                className="px-4 py-2 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                              >
                                Call
                              </button>
                              <button
                                onClick={() => { setSchedulingId(ticket.id); setScheduleTime(""); }}
                                className="px-4 py-2 border border-surface-border text-foreground text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-surface-border transition-colors"
                              >
                                Delay
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {waitingTickets.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-8 py-16 text-center">
                          <p className="text-zinc-500 font-light text-lg">No clients waiting.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Daily Schedule Tab */}
        {activeTab === "schedule" && (
          <section className="animate-fade-up opacity-0 delay-200 -mt-4">
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-surface-border/50">
                    <tr>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Time</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Pass</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Client</th>
                      <th className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hidden md:table-cell">Request</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/50">
                    {scheduledTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-surface-border/20 transition-colors">
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className="text-accent font-semibold text-sm tracking-wide">
                            {format12h(ticket.scheduledTime!)}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-lg font-light tracking-tighter">#{ticket.id}</td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-base font-semibold tracking-tight">{ticket.clientName}</div>
                        </td>
                        <td className="px-8 py-6 hidden md:table-cell max-w-sm">
                          <div className="text-sm font-medium text-zinc-400">{ticket.category}</div>
                          {ticket.note && <div className="text-sm text-zinc-600 italic truncate mt-1">"{ticket.note}"</div>}
                        </td>
                      </tr>
                    ))}
                    {scheduledTickets.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-16 text-center">
                          <p className="text-zinc-500 font-light text-lg">No appointments scheduled.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
