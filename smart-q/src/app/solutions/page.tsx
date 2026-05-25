import Link from "next/link";

const solutions = [
  { title: "University Offices", desc: "Students join consultation queues online. Lecturers call them one by one or schedule for later in the day." },
  { title: "Walk-in Clinics", desc: "Patients check in and join the queue. Doctors call 'next' or assign a return time without anyone sitting in a waiting room." },
  { title: "School Admin", desc: "Students take a virtual ticket for registration services. Officers manage the queue from their dashboard." },
  { title: "IT Support Desks", desc: "Staff submit tickets for IT help. Technicians call the next person or schedule a convenient time to assist." },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-3xl z-10 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Solutions</p>
        <h1 className="text-5xl font-semibold tracking-tighter mb-12">Built for real environments.</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card rounded-[2rem] p-8 hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <h2 className="text-xl font-semibold tracking-tight mb-4">{s.title}</h2>
              <p className="text-zinc-400 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
