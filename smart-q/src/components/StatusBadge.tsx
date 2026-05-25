import { TicketStatus } from "@/lib/types";

const config: Record<TicketStatus, { label: string; classes: string }> = {
  Waiting:    { label: "Waiting",     classes: "bg-accent/10 text-accent border-accent/20" },
  Called:     { label: "Called",      classes: "bg-blue-950/20 text-blue-400 border-blue-500/20" },
  InProgress: { label: "In Progress", classes: "bg-green-950/20 text-green-400 border-green-500/20" },
  Scheduled:  { label: "Scheduled",   classes: "bg-surface-border/50 text-zinc-400 border-surface-border" },
  Completed:  { label: "Completed",   classes: "bg-surface-border/20 text-zinc-500 border-surface-border" },
  Cancelled:  { label: "Cancelled",   classes: "bg-red-950/20 text-red-400 border-red-500/20" },
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const { label, classes } = config[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${classes}`}>
      {label}
    </span>
  );
}
