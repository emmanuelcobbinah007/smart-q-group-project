"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { state, session, logout, addProvider, removeProvider, addCategory, removeCategory } = useQueue();

  // New provider form
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newInitials, setNewInitials] = useState("");

  // Category management
  const [selectedProviderId, setSelectedProviderId] = useState(state.providers[0]?.id ?? "");
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    if (session.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [session, router]);

  if (session.role !== "admin") return null;

  const totalTickets = state.tickets.length;
  const completedTickets = state.tickets.filter((t) => t.status === "Completed");
  const waitingNow = state.tickets.filter((t) => t.status === "Waiting").length;

  const avgWait = completedTickets.length > 0
    ? Math.round(
        completedTickets.reduce((sum, t) => sum + ((t.completedAt ?? t.joinedAt) - t.joinedAt), 0) /
          completedTickets.length /
          60000
      )
    : 0;

  const handleAddProvider = () => {
    if (!newName.trim() || !newRole.trim() || !newInitials.trim()) return;
    addProvider({
      name: newName.trim(),
      role: newRole.trim(),
      initials: newInitials.trim().toUpperCase().slice(0, 2),
      categories: ["General Consultation", "Other"],
      isActive: true,
    });
    setNewName("");
    setNewRole("");
    setNewInitials("");
    setShowAddProvider(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim() || !selectedProviderId) return;
    addCategory(selectedProviderId, newCategory.trim());
    setNewCategory("");
    setShowAddCategory(false);
  };

  const selectedProviderObj = state.providers.find((p) => p.id === selectedProviderId);

  const inputClass =
    "block w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 text-foreground placeholder:text-zinc-600 focus:border-accent focus:ring-1 focus:ring-accent text-sm transition-all outline-none";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="absolute top-[30%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[10%] right-[10%] w-[20vw] h-[20vw] rounded-full bg-surface-border/50 blur-[120px] pointer-events-none" />

      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-foreground text-background text-sm font-bold">
              A
            </div>
            <h1 className="text-lg font-medium tracking-wide">Administration</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-xs text-zinc-500 hover:text-foreground transition-colors hidden sm:block">Home</Link>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="px-4 py-2 border border-surface-border rounded-full hover:bg-foreground hover:text-background transition-colors text-xs font-bold tracking-widest uppercase"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90rem] w-full mx-auto px-6 py-12 space-y-12 z-10 animate-fade-up opacity-0">

        {/* Analytics */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Global Metrics</h2>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-[2rem] p-8 sm:p-10 group hover:-translate-y-1 transition-transform">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Total Tickets</h3>
              <div className="flex items-end gap-3">
                <p className="text-6xl sm:text-7xl font-light tracking-tighter leading-none">{totalTickets}</p>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 sm:p-10 group hover:-translate-y-1 transition-transform">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Avg Wait</h3>
              <div className="flex items-end gap-3">
                <p className="text-6xl sm:text-7xl font-light tracking-tighter leading-none">
                  {avgWait}<span className="text-3xl font-light text-zinc-500 ml-1">m</span>
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 sm:p-10 group hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Waiting Now</h3>
              <p className="text-6xl sm:text-7xl font-light tracking-tighter leading-none">{waitingNow}</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 pt-8">

          {/* Providers */}
          <section className="animate-fade-up opacity-0 delay-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Roster</h2>
              <button
                onClick={() => setShowAddProvider((v) => !v)}
                className="text-[10px] font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                {showAddProvider ? "Cancel" : "New Identity"}
              </button>
            </div>

            {showAddProvider && (
              <div className="glass-card rounded-2xl p-6 mb-4 space-y-3 animate-fade-up opacity-0">
                <input className={inputClass} placeholder="Full name..." value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input className={inputClass} placeholder="Role / Department..." value={newRole} onChange={(e) => setNewRole(e.target.value)} />
                <input className={inputClass} placeholder="Initials (e.g. DA)..." maxLength={2} value={newInitials} onChange={(e) => setNewInitials(e.target.value)} />
                <button
                  onClick={handleAddProvider}
                  disabled={!newName.trim() || !newRole.trim() || !newInitials.trim()}
                  className="w-full py-3 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest disabled:opacity-40 hover:bg-zinc-800 transition-colors"
                >
                  Add Provider
                </button>
              </div>
            )}

            <div className="glass-card rounded-[2rem] overflow-hidden">
              <ul className="divide-y divide-surface-border/50">
                {state.providers.map((p) => (
                  <li key={p.id} className="p-6 flex items-center justify-between hover:bg-surface-border/20 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center text-sm font-bold tracking-tighter opacity-80 group-hover:bg-foreground group-hover:text-background transition-colors">
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-lg font-medium tracking-tight">{p.name}</p>
                        <p className="text-sm font-light text-zinc-500">{p.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${p.isActive ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-surface-border"}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                          {p.isActive ? "Online" : "Offline"}
                        </span>
                      </div>
                      <button
                        onClick={() => removeProvider(p.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-surface-border text-zinc-500 hover:border-red-500/30 hover:text-red-400 hover:bg-red-950/20 transition-colors text-xs opacity-0 group-hover:opacity-100"
                        title="Remove provider"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Categories */}
          <section className="animate-fade-up opacity-0 delay-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Service Categories</h2>
              <button
                onClick={() => setShowAddCategory((v) => !v)}
                className="text-[10px] font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                {showAddCategory ? "Cancel" : "New Scope"}
              </button>
            </div>

            {/* Provider selector */}
            <div className="mb-4 relative">
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="block w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none focus:border-accent appearance-none"
              >
                {state.providers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {showAddCategory && (
              <div className="glass-card rounded-2xl p-4 mb-4 flex gap-3 animate-fade-up opacity-0">
                <input
                  className={`${inputClass} flex-1`}
                  placeholder="New category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategory.trim()}
                  className="px-5 py-2 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-widest disabled:opacity-40 hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            )}

            <div className="glass-card rounded-[2rem] p-8">
              <div className="flex flex-wrap gap-3">
                {selectedProviderObj?.categories.map((cat) => (
                  <span
                    key={cat}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-background border border-surface-border text-foreground hover:border-accent/50 transition-colors cursor-default"
                  >
                    {cat}
                    <button
                      onClick={() => removeCategory(selectedProviderId, cat)}
                      className="text-zinc-600 hover:text-red-400 transition-colors text-xs leading-none"
                      title="Remove category"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {!selectedProviderObj?.categories.length && (
                  <p className="text-zinc-500 font-light text-sm">No categories defined yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
