# ARCHITECTURE.md

# Gym WhatsApp Booking Bot - Technical Architecture

---

# 1. System Overview

The Gym WhatsApp Booking Bot is a backend-only application that automates communication between personal trainers and their clients using the WhatsApp Cloud API.

The system consists of:

- WhatsApp Cloud API
- Express Backend
- MySQL Database
- Prisma ORM
- Cron Scheduler

The backend receives incoming WhatsApp webhooks, processes the user's current conversation state, performs business logic, stores/retrieves data from MySQL, and sends responses through the WhatsApp Cloud API.

---

# 2. Tech Stack

## Backend

- Node.js
- Express
- TypeScript

## Database

- MySQL
- Prisma ORM

## Scheduler

- node-cron

## Messaging

- Meta WhatsApp Cloud API

## Development

- ngrok

## Deployment

- Railway

---

# 3. High Level Architecture

WhatsApp User

↓

Meta WhatsApp Cloud API

↓

Webhook Endpoint

↓

Controller

↓

Conversation Manager

↓

Business Services

↓

Repositories

↓

MySQL Database

↓

WhatsApp Service

↓

Meta Cloud API

↓

User

---

# 4. Folder Structure

src/

config/

controllers/

routes/

middleware/

services/

repositories/

conversation/

templates/

constants/

utils/

types/

prisma/

app.ts

server.ts

---

# 5. Layer Responsibilities

## Controllers

Receive HTTP requests from Meta.

No business logic.

---

## Services

Contain business logic.

Examples:

- Booking Service
- Trainer Service
- Client Service
- Scheduler Service
- WhatsApp Service

---

## Repositories

Only interact with the database.

No business logic.

---

## Conversation

Manages conversation state for trainers and clients.

Responsible for deciding what a user's next message means.

---

## Templates

Stores reusable WhatsApp message templates.

Example:

- Morning prompt
- Booking confirmation
- Slot list
- On leave notification

---

## Config

Loads and validates environment variables.

---

## Constants

Stores fixed values such as:

- Max clients per slot
- Morning reminder time
- Default timezone

---

# 6. Conversation State Machine

## Trainer

IDLE

↓

WAITING_MENU_SELECTION

↓

WAITING_SLOT_INPUT

↓

SCHEDULE_PUBLISHED

↓

IDLE

---

## Client

IDLE

↓

WAITING_BOOK_OR_SKIP

↓

WAITING_SLOT_SELECTION

↓

BOOKED

↓

IDLE

---

# 7. Daily Scheduler Flow

Every day at 7:00 AM (Asia/Kolkata)

↓

Send trainer morning prompt

↓

Trainer replies

↓

Store schedule

↓

Notify all clients

↓

Clients respond

↓

Notify trainer of bookings

---

# 8. Request Flow

Incoming WhatsApp Message

↓

Webhook Controller

↓

Conversation Manager

↓

Business Service

↓

Repository

↓

Database

↓

WhatsApp Service

↓

Outgoing WhatsApp Message

---

# 9. Database Entities

Gym

Trainer

Client

Slot

Booking

SessionPackage

---

# 10. Booking Rules

- Maximum 2 clients per slot
- One booking per client per day
- No overlapping bookings
- Trainer cannot edit schedule after publishing
- No cancellation in MVP

---

# 11. Design Principles

- Modular architecture
- SOLID principles
- TypeScript strict mode
- Environment variables only
- No business logic inside controllers
- Repository pattern for database access
- Conversation state driven
- Reusable WhatsApp templates
- Structured logging
- Proper error handling

---

# 12. Future Enhancements

- Booking cancellation
- Attendance tracking
- Excel reports
- AI scheduling
- Session reminders
- Dashboard
- Payment integration