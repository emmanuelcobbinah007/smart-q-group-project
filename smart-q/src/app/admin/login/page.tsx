"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueue } from "@/context/QueueContext";

export default function AdminLogin() {
  const router = useRouter();
  const { session, loginAsAdmin } = useQueue();

  useEffect(() => {
    if (session.role === "admin") {
      router.replace("/admin");
    }
  }, [session, router]);

  const handleEnter = () => {
    loginAsAdmin();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-surface-border/50 blur-[100px] pointer-events-none" />

      <main className="w-full max-w-sm z-10 animate-fade-up opacity-0">
        <Link href="/" className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-foreground transition-colors mb-10">
          <svg className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return
        </Link>

        <div className="glass-card rounded-[2rem] p-10 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

          <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold tracking-tighter mx-auto mb-8">
            A
          </div>

          <h1 className="text-3xl font-semibold tracking-tighter mb-3">Admin Panel</h1>
          <p className="text-zinc-500 font-light mb-10 text-balance">
            Manage providers, service categories, and view system analytics.
          </p>

          <button
            onClick={handleEnter}
            className="w-full group relative flex justify-center items-center py-4 px-4 rounded-full text-sm font-bold tracking-widest uppercase text-background bg-foreground hover:bg-zinc-800 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Enter Admin Panel</span>
          </button>

          <p className="mt-8 text-xs text-zinc-600">
            Provider access?{" "}
            <Link href="/provider/login" className="text-zinc-400 hover:text-foreground transition-colors underline underline-offset-4">
              Go to provider login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
