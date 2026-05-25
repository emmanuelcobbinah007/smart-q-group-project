import { QueueState } from "./types";

export const DEFAULT_STATE: QueueState = {
  tickets: [],
  nextTicketNumber: 1,
  providers: [
    {
      id: "prov-smith",
      initials: "PS",
      name: "Prof. Smith",
      role: "Computer Science",
      categories: ["Course Registration", "Grade Query", "Lab Report", "Other"],
      isActive: true,
    },
    {
      id: "prov-allen",
      initials: "DA",
      name: "Dr. Allen",
      role: "Mathematics",
      categories: ["Course Registration", "Grade Query", "General Consultation", "Other"],
      isActive: true,
    },
    {
      id: "prov-admin",
      initials: "AO",
      name: "Admin Office A",
      role: "Student Services",
      categories: ["Document Collection", "ID Card", "Fee Payment", "Other"],
      isActive: false,
    },
  ],
};
