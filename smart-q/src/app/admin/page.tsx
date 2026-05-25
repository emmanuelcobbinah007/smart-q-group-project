"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-[30%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[10%] right-[10%] w-[20vw] h-[20vw] rounded-full bg-surface-border/50 blur-[120px] pointer-events-none" />

      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-surface-border">
        <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-foreground text-background">
              <span className="text-xl font-bold tracking-tighter">A</span>
            </div>
            <h1 className="text-lg font-medium tracking-wide">Administration</h1>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-zinc-500 font-medium tracking-wide hidden sm:inline-block">System Control</span>
            <Link href="/" className="px-4 py-2 border border-surface-border rounded-full hover:bg-foreground hover:text-background transition-colors text-xs font-bold tracking-widest uppercase">
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[90rem] w-full mx-auto px-6 py-12 space-y-12 z-10 animate-fade-up opacity-0">
        
        {/* Analytics Overview */}
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
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Throughput Vol.</h3>
              <div className="flex items-end gap-3">
                <p className="text-6xl sm:text-7xl font-light tracking-tighter text-foreground leading-none">142</p>
                <p className="text-sm font-medium text-green-500 pb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  12% MoM
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 sm:p-10 group hover:-translate-y-1 transition-transform">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Mean Wait</h3>
              <div className="flex items-end gap-3">
                <p className="text-6xl sm:text-7xl font-light tracking-tighter text-foreground leading-none">14<span className="text-3xl font-light text-zinc-500 ml-1">m</span></p>
                <p className="text-sm font-medium text-green-500 pb-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  Δ -3m
                </p>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 sm:p-10 group hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-8">Optimal Block</h3>
              <div className="flex items-end gap-3">
                <p className="text-6xl sm:text-7xl font-light tracking-tighter text-foreground leading-none">10<span className="text-3xl font-light text-zinc-500 ml-1">am</span></p>
              </div>
              <p className="text-xs font-medium text-zinc-400 mt-4 tracking-wide uppercase">
                45 passes issued max
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 pt-8">
          {/* Active Providers */}
          <section className="animate-fade-up opacity-0 delay-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Roster</h2>
              <button className="text-[10px] font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors">
                New Identity
              </button>
            </div>
            
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <ul className="divide-y divide-surface-border/50">
                {[
                  { id: "PS", name: "Prof. Smith", role: "Computer Science", active: true },
                  { id: "DA", name: "Dr. Allen", role: "Mathematics", active: true },
                  { id: "AO", name: "Admin Office A", role: "Student Services", active: false }
                ].map((p, i) => (
                  <li key={i} className="p-6 flex items-center justify-between hover:bg-surface-border/20 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center text-sm font-bold tracking-tighter opacity-80 group-hover:bg-foreground group-hover:text-background transition-colors">
                        {p.id}
                      </div>
                      <div>
                        <p className="text-lg font-medium tracking-tight text-foreground">{p.name}</p>
                        <p className="text-sm font-light text-zinc-500">{p.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${p.active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-surface-border'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                        {p.active ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Service Categories */}
          <section className="animate-fade-up opacity-0 delay-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Catalysts</h2>
              <button className="text-[10px] font-bold tracking-widest uppercase text-foreground bg-surface border border-surface-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors">
                New Scope
              </button>
            </div>
            
            <div className="glass-card rounded-[2rem] p-8">
              <div className="flex flex-wrap gap-4">
                {[
                  "Course Registration",
                  "Grade Query",
                  "Lab Report",
                  "General Consultation",
                  "Other"
                ].map((cat, i) => (
                  <span key={i} className="px-5 py-3 rounded-full text-sm font-medium bg-background border border-surface-border text-foreground hover:border-accent/50 transition-colors cursor-pointer">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
