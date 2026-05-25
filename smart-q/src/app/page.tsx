import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Abstract Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-accent/5 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-surface-border/50 blur-[100px]" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] opacity-50 dark:invert" />
      </div>

      <header className="w-full flex justify-between items-center p-8 z-10 animate-fade-up opacity-0">
        <div className="text-xl font-bold tracking-tighter">SMART<span className="text-accent">—Q</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <Link href="/about" className="hover:text-accent transition-colors">Vision</Link>
          <Link href="/solutions" className="hover:text-accent transition-colors">Solutions</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
        <Link href="/admin" className="text-xs font-semibold tracking-widest uppercase py-2 px-4 border border-surface-border rounded-full hover:bg-foreground hover:text-background transition-all duration-300">
          Admin
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 z-10 text-center">
        <div className="max-w-5xl space-y-8 animate-blur-reveal opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            The Future of Waiting
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-9xl font-semibold tracking-tighter leading-[0.9] text-balance">
            Time, <br />
            <span className="italic font-light text-zinc-400 dark:text-zinc-600">Elevated.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light tracking-wide mt-8 animate-fade-up opacity-0 delay-200 text-balance">
            Experience intelligent queueing. Seamlessly manage walk-ins and appointments with a system designed for extraordinary service environments.
          </p>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 animate-fade-up opacity-0 delay-300 w-full sm:w-auto">
          <Link 
            href="/join" 
            className="group relative w-full sm:w-64 h-16 flex items-center justify-center gap-3 bg-foreground text-background rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="relative z-10 font-medium tracking-wide text-sm uppercase">Join a Queue</span>
            <div className="absolute inset-0 bg-accent transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </Link>
          
          <Link 
            href="/provider" 
            className="group w-full sm:w-64 h-16 flex items-center justify-center gap-3 bg-transparent border border-surface-border hover:border-foreground text-foreground rounded-full transition-all hover:bg-surface active:scale-95"
          >
            <span className="font-medium tracking-wide text-sm uppercase">Provider Access</span>
          </Link>
        </div>
      </main>

      <footer className="w-full p-8 flex justify-between items-center text-xs font-medium text-zinc-500 tracking-widest uppercase z-10 animate-fade-up opacity-0 delay-400">
        <span>© {new Date().getFullYear()} Smart-Q</span>
        <span>Redefining Service</span>
      </footer>
    </div>
  );
}
