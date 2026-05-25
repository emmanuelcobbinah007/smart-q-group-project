"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueue } from "@/context/QueueContext";

const HISTORY_KEY = "smartq_my_tickets";

export default function JoinQueue() {
  const router = useRouter();
  const { state, joinQueue } = useQueue();

  const [clientName, setClientName] = useState("");
  const [providerId, setProviderId] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeProviders = state.providers.filter((p) => p.isActive);
  const selectedProvider = state.providers.find((p) => p.id === providerId);
  const categories = selectedProvider?.categories ?? [];

  const isOther = category === "Other";
  const isValid =
    clientName.trim().length > 0 &&
    providerId &&
    category &&
    (!isOther || note.trim().length > 0);

  const handleProviderChange = (id: string) => {
    setProviderId(id);
    setCategory("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const ticket = joinQueue({ clientName: clientName.trim(), providerId, category, note });

      // Track ticket in client history
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(HISTORY_KEY);
        const ids: string[] = raw ? JSON.parse(raw) : [];
        if (!ids.includes(ticket.id)) {
          localStorage.setItem(HISTORY_KEY, JSON.stringify([...ids, ticket.id]));
        }
      }

      router.push(`/ticket?id=${ticket.id}`);
    }, 800);
  };

  const inputClass =
    "block w-full rounded-xl border border-surface-border bg-background/50 backdrop-blur-sm px-4 py-4 text-foreground placeholder:text-zinc-600 focus:border-accent focus:ring-1 focus:ring-accent sm:text-base transition-all outline-none appearance-none font-medium";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-lg glass-card rounded-[2rem] z-10 animate-fade-up opacity-0 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

        <div className="p-8 sm:p-12">
          <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
            <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return
          </Link>

          <div className="space-y-3 mb-10">
            <h1 className="text-4xl font-semibold tracking-tighter text-foreground">Secure your spot.</h1>
            <p className="text-zinc-500 font-light text-balance text-lg">Please provide your details below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Client Name */}
            <div className="space-y-2">
              <label htmlFor="clientName" className="block text-xs font-semibold tracking-widest uppercase text-zinc-400">
                Full Name
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your full name..."
                className={inputClass}
                required
              />
            </div>

            {/* Provider */}
            <div className="space-y-2">
              <label htmlFor="provider" className="block text-xs font-semibold tracking-widest uppercase text-zinc-400">
                Service Provider
              </label>
              <div className="relative">
                <select
                  id="provider"
                  value={providerId}
                  onChange={(e) => handleProviderChange(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="" disabled>Select a professional...</option>
                  {activeProviders.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-xs font-semibold tracking-widest uppercase text-zinc-400">
                Service Type
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                  required
                  disabled={!providerId}
                >
                  <option value="" disabled>{providerId ? "Nature of your visit?" : "Select a provider first..."}</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label htmlFor="note" className="flex justify-between text-xs font-semibold tracking-widest uppercase text-zinc-400">
                <span>Brief Note {isOther && <span className="text-accent">*</span>}</span>
                <span className="font-normal opacity-50">{note.length}/100</span>
              </label>
              <textarea
                id="note"
                maxLength={100}
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={isOther ? "Please specify (required)..." : "Additional context..."}
                className={`block w-full rounded-xl border ${isOther && note.length === 0 ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-surface-border focus:border-accent focus:ring-1 focus:ring-accent"} bg-background/50 backdrop-blur-sm px-4 py-4 text-foreground placeholder:text-zinc-600 sm:text-base transition-all outline-none resize-none font-medium`}
                required={isOther}
              />
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full relative flex justify-center items-center py-4 px-4 rounded-full text-sm font-bold tracking-widest uppercase text-background bg-foreground hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-8 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-current relative z-10" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Enter Queue</span>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
