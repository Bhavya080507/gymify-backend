# DATABASE_DESIGN.md

# Database Overview

Database: MySQL 8
ORM: Prisma

Purpose:
Store trainers, clients, schedules, bookings, conversation states, and WhatsApp webhook logs.

---

# Tables

## gyms

- id
- name
- phone_number
- timezone
- created_at
- updated_at

Purpose:
Represents a gym.

---

## trainers

- id
- gym_id
- name
- phone_number
- is_active
- created_at
- updated_at

Purpose:
Represents a trainer.

---

## clients

- id
- gym_id
- trainer_id
- name
- phone_number
- is_active
- created_at
- updated_at

Purpose:
Represents a client assigned to a trainer.

---

## session_packages

- id
- client_id
- total_sessions
- remaining_sessions
- status
- created_at
- updated_at

Purpose:
Tracks remaining sessions.

---

## trainer_schedules

- id
- trainer_id
- schedule_date
- status
- published_at
- created_at
- updated_at

Purpose:
Represents one trainer's schedule for one day.

---

## slots

- id
- schedule_id
- start_time
- end_time
- capacity
- status
- created_at
- updated_at

Purpose:
Stores available slots for a trainer's schedule.

Notes:
- Capacity defaults to 2.
- Slot date is derived from trainer_schedules.

---

## bookings

- id
- slot_id
- client_id
- booking_date
- status
- created_at
- updated_at

Purpose:
Stores confirmed bookings.

Rules:
- One booking per client per day.
- Trainer is derived from Slot → TrainerSchedule.

---

## conversation_states

- id
- phone_number
- user_role
- current_state
- context_data
- last_interaction_at

Purpose:
Stores WhatsApp conversation state.

---

## webhook_idempotency_logs

- id
- message_id
- processed_at

Purpose:
Prevents duplicate webhook processing.

---

# Relationships

Gym
│
├── Trainers
│   ├── Trainer Schedule
│   │   ├── Slots
│   │   │   ├── Bookings
│
└── Clients
    ├── Session Packages

Conversation States

Webhook Logs

---

# Business Rules

- Maximum 2 clients per slot.
- One booking per client per day.
- No cancellations in MVP.
- Trainer cannot edit schedule after publishing.
- Sessions are deducted after successful booking.

---

# Database Constraints

- Unique trainer phone number.
- Unique client phone number.
- Unique trainer schedule per day.
- Unique slot start time per trainer schedule.
- Unique booking per client per day.

---

# Concurrency

Bookings must execute inside a database transaction.

Lock slot row before confirming booking.

Reject booking if capacity has been reached.

---

# Future Changes

- Booking cancellation
- Attendance
- Reports
- Multiple packages