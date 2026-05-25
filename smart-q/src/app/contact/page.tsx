import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-lg z-10 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <div className="glass-card rounded-[2rem] p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">Contact</p>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Get in touch.</h1>
          <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10">
            For enquiries about Smart-Q — deployment, partnerships, or support — reach out to the team.
          </p>
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 w-20">Email</span>
              <span>hello@smart-q.io</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 w-20">Support</span>
              <span>support@smart-q.io</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
