# PROJECT_SPEC.md

# Gym WhatsApp Booking Bot

## Project Overview

Gym WhatsApp Booking Bot is a backend application that automates the daily booking process between personal trainers and their clients using the WhatsApp Cloud API.

The entire interaction happens on WhatsApp. No mobile app or website is required for trainers or clients.

The goal is to eliminate the need for trainers to manually coordinate bookings every day.

---

# Users

## Trainer

Responsibilities:
- Publish today's availability
- Keep yesterday's schedule
- Mark themselves as on leave

## Client

Responsibilities:
- Receive trainer's availability automatically
- Book one session
- Skip today's session

## Gym Owner

Responsibilities:
- View booking data
- Export booking data to Excel (Future Feature)

---

# MVP Features

## Trainer Flow

Every day at 7:00 AM, the bot sends the trainer:

Good Morning Coach 👋

Choose one option:

1. Keep Yesterday's Schedule
2. Edit Today's Schedule
3. I'm On Leave Today

### Keep Yesterday

- Yesterday's slots are copied.
- Clients are notified automatically.

### Edit Today's Schedule

Trainer enters available slots.

Example:

6 PM
7 PM
8 PM

Bot stores these slots.

Clients are notified automatically.

### On Leave

Bot marks trainer unavailable.

All clients are informed that no sessions are available today.

---

# Client Flow

Once trainer publishes schedule, every client automatically receives:

Good Morning 👋

Sessions Remaining: X

Choose:

1. Book Session
2. Skip Today

If client chooses Book Session:

Bot displays available slots.

Example:

6 PM (1/2)

7 PM (0/2)

8 PM (FULL)

Client replies with slot.

Bot confirms booking.

Trainer receives notification.

If client chooses Skip Today:

Bot acknowledges.

Trainer receives notification.

---

# Booking Rules

Each slot has capacity = 2.

A client can only book one slot per day.

No double booking.

Bookings cannot be cancelled in MVP.

Trainer cannot modify schedule after publishing.

---

# Trainer Notification

Whenever a booking occurs:

Trainer receives:

Client Name

Booked Slot

Current occupancy

Example:

Bhavya booked 7 PM

Occupancy:
7 PM (1/2)

---

# Daily Scheduler

Runs every day at:

07:00

Timezone:

Asia/Kolkata

---

# Technology Stack

Backend:
Node.js
TypeScript
Express

Database:
MySQL

ORM:
Prisma

Scheduler:
node-cron

WhatsApp:
Meta Cloud API

Deployment:
Railway

Development Tunnel:
ngrok

---

# Database Entities

Gym

Trainer

Client

Slot

Booking

SessionPackage

---

# Conversation State Machine

Trainer States:

IDLE

WAITING_MENU_SELECTION

WAITING_FOR_SLOTS

SCHEDULE_PUBLISHED

ON_LEAVE

Client States:

IDLE

WAITING_BOOK_OR_SKIP

WAITING_SLOT_SELECTION

BOOKED

SKIPPED

---

# Environment Variables

DATABASE_URL

WHATSAPP_TOKEN

WHATSAPP_PHONE_NUMBER_ID

WHATSAPP_VERIFY_TOKEN

WHATSAPP_API_VERSION

TIMEZONE

MORNING_PROMPT_HOUR

MORNING_PROMPT_MINUTE

---

# Non Functional Requirements

- No hardcoded credentials.
- Use environment variables.
- Modular architecture.
- Proper error handling.
- TypeScript strict mode.
- SOLID principles.
- Logging for all webhook events.
- RESTful APIs.
- Prisma transactions for booking.
- Production-ready code.

---

# Future Features

- Excel reports
- Attendance tracking
- Session reminders
- AI scheduling
- Payment integration
- Dashboard