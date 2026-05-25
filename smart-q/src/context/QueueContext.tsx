"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthSession, JoinInput, Provider, QueueState, QueueTicket } from "@/lib/types";
import { DEFAULT_STATE } from "@/lib/defaults";

const STORAGE_KEY = "smartq_state";
const SESSION_KEY = "smartq_session";

function loadState(): QueueState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function loadSession(): AuthSession {
  if (typeof window === "undefined") return { role: null };
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : { role: null };
  } catch {
    return { role: null };
  }
}

function padTicketId(n: number): string {
  return String(n).padStart(3, "0");
}

type QueueContextValue = {
  state: QueueState;
  session: AuthSession;
  joinQueue: (input: JoinInput) => QueueTicket;
  cancelTicket: (id: string) => void;
  callTicket: (id: string) => void;
  startInProgress: (id: string) => void;
  scheduleTicket: (id: string, time: string) => void;
  completeTicket: (id: string) => void;
  addProvider: (p: Omit<Provider, "id">) => void;
  removeProvider: (id: string) => void;
  addCategory: (providerId: string, category: string) => void;
  removeCategory: (providerId: string, category: string) => void;
  loginAsProvider: (providerId: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
};

const QueueContext = createContext<QueueContextValue | null>(null);

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QueueState>(loadState);
  const [session, setSession] = useState<AuthSession>(loadSession);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }, [session]);

  const joinQueue = (input: JoinInput): QueueTicket => {
    const ticket: QueueTicket = {
      id: padTicketId(state.nextTicketNumber),
      clientName: input.clientName,
      providerId: input.providerId,
      category: input.category,
      note: input.note,
      status: "Waiting",
      joinedAt: Date.now(),
    };
    setState((prev) => ({
      ...prev,
      tickets: [...prev.tickets, ticket],
      nextTicketNumber: prev.nextTicketNumber + 1,
    }));
    return ticket;
  };

  const updateTicket = (id: string, patch: Partial<QueueTicket>) => {
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  };

  const cancelTicket = (id: string) => updateTicket(id, { status: "Cancelled" });

  const callTicket = (id: string) =>
    updateTicket(id, { status: "Called", calledAt: Date.now() });

  const startInProgress = (id: string) =>
    updateTicket(id, { status: "InProgress" });

  const scheduleTicket = (id: string, time: string) =>
    updateTicket(id, { status: "Scheduled", scheduledTime: time });

  const completeTicket = (id: string) =>
    updateTicket(id, { status: "Completed", completedAt: Date.now() });

  const addProvider = (p: Omit<Provider, "id">) => {
    const id = `prov-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      providers: [...prev.providers, { ...p, id }],
    }));
  };

  const removeProvider = (id: string) => {
    setState((prev) => ({
      ...prev,
      providers: prev.providers.filter((p) => p.id !== id),
    }));
  };

  const addCategory = (providerId: string, category: string) => {
    setState((prev) => ({
      ...prev,
      providers: prev.providers.map((p) =>
        p.id === providerId && !p.categories.includes(category)
          ? { ...p, categories: [...p.categories, category] }
          : p
      ),
    }));
  };

  const removeCategory = (providerId: string, category: string) => {
    setState((prev) => ({
      ...prev,
      providers: prev.providers.map((p) =>
        p.id === providerId
          ? { ...p, categories: p.categories.filter((c) => c !== category) }
          : p
      ),
    }));
  };

  const loginAsProvider = (providerId: string) =>
    setSession({ role: "provider", providerId });

  const loginAsAdmin = () => setSession({ role: "admin" });

  const logout = () => setSession({ role: null });

  return (
    <QueueContext.Provider
      value={{
        state,
        session,
        joinQueue,
        cancelTicket,
        callTicket,
        startInProgress,
        scheduleTicket,
        completeTicket,
        addProvider,
        removeProvider,
        addCategory,
        removeCategory,
        loginAsProvider,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue(): QueueContextValue {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error("useQueue must be used inside QueueProvider");
  return ctx;
}
