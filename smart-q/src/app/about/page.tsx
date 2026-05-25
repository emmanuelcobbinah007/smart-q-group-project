import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-2xl z-10 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <div className="glass-card rounded-[2rem] p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">Vision</p>
          <h1 className="text-5xl font-semibold tracking-tighter mb-8">About Smart-Q</h1>
          <div className="space-y-5 text-zinc-400 font-light text-lg leading-relaxed">
            <p>
              Smart-Q modernises the traditional "take-a-number" queue experience found in banks, clinics, and service offices.
              Clients join a virtual queue and receive a ticket, while service providers manage their queue in real time.
            </p>
            <p>
              The system bridges the gap between walk-in queuing and appointment booking — giving providers two simple actions:
              call the next person immediately, or schedule them for a specific time.
            </p>
            <p>
              Applicable across universities, clinics, IT support desks, and public service offices.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
