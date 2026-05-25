"use client";

import { useState } from "react";
import Link from "next/link";

type Ticket = {
  id: string;
  name: string;
  category: string;
  note: string;
  status: "Waiting" | "Currently Serving" | "Scheduled";
  time?: string;
};

export default function ProviderDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "010", name: "John Smith", category: "Grade Query", note: "CSC201 midterm", status: "Waiting" },
    { id: "011", name: "Jane Doe", category: "Course Reg", note: "", status: "Waiting" },
    { id: "012", name: "Alex Brown", category: "Other", note: "Need form signed ASAP", status: "Waiting" },
  ]);
  
  const [currentlyServing, setCurrentlyServing] = useState<Ticket | null>({
    id: "009", name: "Mary Lee", category: "Course Reg", note: "Timetable clash", status: "Currently Serving"
  });

  const handleNext = (id: string) => {
    const ticketToCall = tickets.find(t => t.id === id);
    if (!ticketToCall) return;
    
    // Complete current if any
    setTickets(tickets.filter(t => t.id !== id));
    setCurrentlyServing({ ...ticketToCall, status: "Currently Serving" });
  };

  const handleSchedule = (id: string) => {
    // Mock scheduling for 2:30 PM
    setTickets(tickets.map(t => 
      t.id === id ? { ...t, status: "Scheduled", time: "2:30 PM" } : t
    ));
  };

  const completeCurrent = () => {
    setCurrentlyServing(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-[0%] left-[20%] w-[50vw] h-[20vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-accent/20 bg-accent/5">
              <span className="text-xl font-bold tracking-tighter">Q</span>
            </div>
            <h1 className="text-lg font-medium tracking-wide">Provider Console</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-zinc-500 font-medium tracking-wide hidden sm:inline-block">Dr. Allen</span>
            <Link href="/" className="px-4 py-2 border border-surface-border rounded-full hover:bg-foreground hover:text-background transition-colors text-xs font-bold tracking-widest uppercase">
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90rem] w-full mx-auto px-6 py-12 space-y-12 z-10 animate-fade-up opacity-0">
        
        {/* Currently Serving Banner */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Live Session</h2>
          </div>
          {currentlyServing ? (
            <div className="glass-card rounded-[2rem] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent to-transparent" />
              <div className="flex items-center gap-8 pl-4">
                <div className="hidden sm:flex flex-col items-center">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Ticket</span>
                  <div className="text-5xl font-light tracking-tighter text-foreground clip-text-accent">
                    #{currentlyServing.id}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-foreground mb-2">{currentlyServing.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-surface-border/50 text-xs font-medium tracking-wide">
                      {currentlyServing.category}
                    </span>
                    {currentlyServing.note && (
                      <span className="text-sm text-zinc-500 italic max-w-md truncate">"{currentlyServing.note}"</span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={completeCurrent}
                className="w-full sm:w-auto mt-4 sm:mt-0 px-8 py-4 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 whitespace-nowrap"
              >
                Conclude Session
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-[2rem] p-12 text-center border-dashed border-zinc-700/30">
              <p className="text-zinc-500 font-light text-xl">Queue is open. Ready for the next client.</p>
            </div>
          )}
        </section>

        {/* Live Queue */}
        <section className="animate-fade-up opacity-0 delay-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Waiting Global</h2>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium text-zinc-400">
                {tickets.filter(t => t.status === "Waiting").length} Clients
              </span>
            </div>
          </div>
          
          <div className="glass-card rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-surface-border/50">
                  <tr>
                    <th scope="col" className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Pass</th>
                    <th scope="col" className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Client</th>
                    <th scope="col" className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hidden md:table-cell">Request</th>
                    <th scope="col" className="px-8 py-6 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">State</th>
                    <th scope="col" className="px-8 py-6 text-right text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/50">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-surface-border/20 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-light tracking-tighter text-foreground">
                        #{ticket.id}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-base font-semibold text-foreground tracking-tight">{ticket.name}</div>
                      </td>
                      <td className="px-8 py-6 hidden md:table-cell max-w-sm">
                        <div className="text-sm font-medium text-zinc-400">{ticket.category}</div>
                        {ticket.note && <div className="text-sm text-zinc-600 italic truncate mt-1">"{ticket.note}"</div>}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        {ticket.status === "Waiting" ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                            Waiting
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-surface-border/50 text-zinc-400">
                            Sched • {ticket.time}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        {ticket.status === "Waiting" && (
                          <div className="flex justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleNext(ticket.id)}
                              className="px-4 py-2 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                            >
                              Call
                            </button>
                            <button 
                              onClick={() => handleSchedule(ticket.id)}
                              className="px-4 py-2 border border-surface-border text-foreground text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-surface-border transition-colors"
                            >
                              Delay
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {tickets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-16 text-center">
                        <p className="text-zinc-500 font-light text-lg">No tickets remain in the local queue.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
