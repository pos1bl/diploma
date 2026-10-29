# Psychological Support Platform

A full-stack web platform for online psychological help: clients find a suitable psychologist, book and pay for sessions, and meet by video call; specialists manage their schedule, clients and notes; admins verify specialists and requests for free support.

Built as a diploma project at Igor Sikorsky Kyiv Polytechnic Institute.

> Screenshots: _add 2–3 screenshots of the main pages here_

## Features

**For clients**
- Questionnaire that matches clients with suitable specialists using a weighted scoring algorithm (issues, approach, age, gender, special needs)
- Specialist catalog with search and filters
- Booking based on each specialist's schedule and unavailability periods
- Online payments with Stripe Checkout, refunds, cancelling and rescheduling sessions
- Video sessions in the browser (Jitsi)
- Gift certificates for sessions, generated as PDF and sent by email
- Free sessions for military personnel, veterans, IDPs and other people affected by the war — after document verification by an admin
- Self-help materials and support resources

**For specialists**
- Calendar of sessions, client list and session notes
- Weekly schedule and unavailability management
- Profile, bio and education (diplomas and courses with file uploads)

**For admins**
- Adding specialists
- Reviewing and verifying requests for free support

**Platform**
- Email account activation and session reminders one hour before the start
- Career page for psychologists to apply

## Tech stack

**Frontend:** React 19, TypeScript, Vite, TanStack Query, TanStack Router, TanStack Form, MobX, Material UI, SCSS, axios

**Backend:** Node.js, Express, MongoDB with Mongoose, JWT, bcrypt, express-validator, Stripe, Agenda, Nodemailer, Puppeteer, EJS, Cloudinary, Multer

## Architecture

The backend follows a layered architecture:

```
routes → middlewares → controllers → services → models (Mongoose) → MongoDB
```

- **Controllers** handle HTTP only; **services** contain the business logic; **DTOs** control what data is returned to the client.
- **Centralized error handling** with a custom `ApiError` class and an error middleware.
- **Authentication:** short-lived JWT access token (sent in the `Authorization` header) and a long-lived refresh token in an httpOnly cookie, stored in the database so it can be revoked. On the client, an axios interceptor refreshes the access token automatically on `401`.
- **Role-based access** for clients, specialists and admins.
- **Stripe webhooks** are verified with the raw request body before a session or gift is created — the webhook, not the redirect, is the source of truth for payments.
- **Background jobs** (session reminders) are stored in MongoDB with Agenda, so they survive server restarts.

## Getting started

### Prerequisites
- Node.js 20+
- MongoDB (local, Docker or MongoDB Atlas)
- Accounts for Stripe (test mode), Cloudinary and an SMTP provider

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # fill in the values
npm run dev
```

The API runs on `http://localhost:5000/api`.

To receive Stripe webhooks locally, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env   # VITE_BASE_URL=http://localhost:5000/api
npm run dev
```

Open the URL shown by Vite in the terminal.

## Environment variables

**server/.env**

| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `DB_URL` | MongoDB connection string |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Secrets for signing tokens |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | Email sending |
| `ADMIN_EMAIL` | Admin notification address |
| `CLIENT_URL` | Frontend URL (used for CORS and redirects) |
| `API_URL` | Public API URL (used in email links) |
| `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` | File uploads |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Payments |

**client/.env**

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | API base URL, e.g. `http://localhost:5000/api` |

## Project structure

```
client/          React + TypeScript frontend
  src/
    components/  UI components grouped by role
    pages/       Page components
    routes/      File-based routes (TanStack Router)
    services/    API calls
    store/       MobX stores
    http/        axios instance and interceptors
server/          Node.js + Express API
  controllers/   HTTP layer
  services/      Business logic
  models/        Mongoose schemas
  middlewares/   Auth, roles, uploads, logging, errors
  jobs/          Background jobs (Agenda)
  templates/     PDF certificate template
```

## Possible improvements
- Automated tests (unit and API tests)
- Migration to Express 5 for native async error handling
- Docker Compose setup for local development
