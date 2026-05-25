export type TicketStatus =
  | "Waiting"
  | "Called"
  | "InProgress"
  | "Scheduled"
  | "Completed"
  | "Cancelled";

export type QueueTicket = {
  id: string;
  clientName: string;
  providerId: string;
  category: string;
  note: string;
  status: TicketStatus;
  scheduledTime?: string;
  joinedAt: number;
  calledAt?: number;
  completedAt?: number;
};

export type Provider = {
  id: string;
  initials: string;
  name: string;
  role: string;
  categories: string[];
  isActive: boolean;
};

export type QueueState = {
  tickets: QueueTicket[];
  providers: Provider[];
  nextTicketNumber: number;
};

export type AuthSession = {
  role: "provider" | "admin" | null;
  providerId?: string;
};

export type JoinInput = {
  clientName: string;
  providerId: string;
  category: string;
  note: string;
};
