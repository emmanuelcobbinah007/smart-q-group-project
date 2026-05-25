# Smart-Q — Intelligent Queue & Appointment Management System

## Overview

**Smart-Q** is a web-based queue management system that modernises the traditional "take-a-number" experience found in banks, clinics, and service offices. It allows clients to join a virtual queue and receive a ticket, while service providers can manage their queue in real time — calling the next person in or scheduling them for a specific time.

The system bridges the gap between walk-in queuing and appointment booking by giving the service provider two simple actions: **"Come in now"** or **"Come at a specific time."**

---

## Problem Statement

In many service environments — university consultation hours, clinic walk-ins, school admin offices — people waste time sitting in physical queues with no visibility into wait times. Service providers have no easy way to manage flow, and clients have no way of knowing when it's their turn without physically being present.

Existing solutions are either too complex (enterprise queue management) or too basic (simple appointment calendars). There is a need for a **lightweight, practical system** that combines both queuing and scheduling.

---

## How It Works

### 1. Client Joins the Queue

A client (student, patient, visitor) opens the system, selects a **provider**, chooses a **service category**, and optionally adds a **brief note** describing their issue. They then join the queue and receive a **ticket number** (e.g., `#012`).

**Service Selection (Hybrid Approach):**
- The **provider pre-defines service categories** for their queue (e.g., "Course Registration", "Grade Query", "Lab Report", "Other")
- The **client selects a category** from the list when joining
- The client can add an **optional short note** (max 100 characters) for extra context (e.g., *"Can't enrol in CSC301"*)
- If **"Other"** is selected, the note becomes required

This keeps the system structured for analytics while still allowing clients to describe their specific need.

Once in the queue, the client can see:

- Their **position** in the queue (e.g., "3 people ahead of you")
- The **estimated wait time**
- Their **ticket status** (Waiting → Called → In Progress → Completed)

### 2. Provider Manages the Queue

The provider (lecturer, doctor, officer) sees a real-time dashboard showing everyone in their queue. When they are ready for the next person, they choose one of two actions:

| Action | What Happens |
|---|---|
| **"Next"** | The next ticket in queue is called. The client receives a notification: *"It's your turn — come in now."* |
| **"Schedule"** | The provider assigns a specific time (e.g., 2:30 PM). The client is notified: *"Your appointment is at 2:30 PM."* This frees up the queue for others. |

### 3. Client Gets Notified

The client's ticket screen updates in real time. They can see whether they need to **come now** or **come at a scheduled time**, without needing to sit in a waiting room.

### 4. Visit Completes

Once the client has been served, the provider marks the ticket as **completed**, and the system moves on.

---

## User Roles

| Role | Description |
|---|---|
| **Client** | Joins a queue, views their ticket and position, receives notifications when called or scheduled. |
| **Provider** | Manages their queue — calls the next client, schedules clients for later, and marks visits as complete. |
| **Admin** | Sets up the system — creates provider accounts, defines services, and views usage reports/analytics. |

---

## Core Features

### For Clients
- Join a queue by selecting a service category and optionally adding a short note
- Receive a virtual ticket with a queue number
- View real-time queue position and estimated wait time
- Receive notifications (called now or scheduled for later)
- View ticket history

### For Providers
- **Define service categories** for their queue (e.g., "Grade Query", "Course Registration")
- View a real-time queue of waiting clients — including their selected category and note
- Call the next client or schedule them for a specific time
- Mark clients as "in progress" or "completed"
- View daily schedule of all scheduled and walk-in clients

### For Admins
- Create and manage provider accounts
- Define available services (e.g., "General Consultation", "Document Collection")
- View analytics — total tickets, average wait times, peak hours
- System configuration and settings

---

## Example Use Cases

| Scenario | How Smart-Q Helps |
|---|---|
| **University Lecturer** | Students join the consultation queue online. The lecturer calls students one by one, or schedules some for later in the day. |
| **Walk-in Clinic** | Patients check in and join the queue. The doctor calls "next" or tells a patient to return at 3 PM. |
| **School Admin Office** | Students take a ticket for registration services. Officers manage the queue from their dashboard. |
| **IT Support Desk** | Staff submit tickets for IT help. Technicians call the next person or schedule a time to assist. |

---

## System Flow

```
 ┌──────────────────────────────────────────────────────────────┐
 │                        CLIENT                                │
 │                                                              │
 │   1. Select Provider                                         │
 │   2. Choose Category: [Grade Query ▾]                        │
 │   3. Add Note (optional): "CSC201 midterm mark missing"      │
 │   4. Join Queue → Receive Ticket #012                        │
 │   5. View: Position #3 · Est. Wait: 15 min                  │
 │   6. Wait for notification...                                │
 │                                                              │
 │   ┌──────────────────────┐  ┌─────────────────────────────┐  │
 │   │ 🟢 "Come in now"     │  │ 🕐 "Come at 2:30 PM"        │  │
 │   │   Proceed to room    │  │   Return at scheduled time  │  │
 │   └──────────────────────┘  └─────────────────────────────┘  │
 └──────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────┐
 │                       PROVIDER                               │
 │                                                              │
 │   Queue Dashboard:                                           │
 │   ┌──────┬─────────────┬──────────────────┬────────┬────────────────┐ │
 │   │ #010 │ John Smith  │ Grade Query      │ Wait   │ [Next] [Sched] │ │
 │   │      │             │ "CSC201 midterm"  │        │                │ │
 │   │ #011 │ Jane Doe    │ Course Reg       │ Wait   │ [Next] [Sched] │ │
 │   │ #012 │ Alex Brown  │ Other            │ Wait   │ [Next] [Sched] │ │
 │   │      │             │ "Need form signed"│        │                │ │
 │   └──────┴─────────────┴──────────────────┴────────┴────────────────┘ │
 │                                                              │
 │   Currently Serving: #009 — Mary Lee                         │
 │   [Mark Complete]                                            │
 └──────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────┐
 │                         ADMIN                                │
 │                                                              │
 │   • Manage Providers and Services                            │
 │   • View Analytics (tickets/day, avg wait, peak hours)       │
 │   • System Settings                                          │
 └──────────────────────────────────────────────────────────────┘
```

---

## Summary

**QueueSmart** is a simple, practical system that digitises the "take-a-number" queue experience with an added layer of intelligence — allowing service providers to either call the next person or schedule them for a later time. It is applicable across multiple environments (universities, clinics, offices) and solves a real, everyday problem.
