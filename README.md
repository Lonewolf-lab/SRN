# Sashakt Rashtra Nirman (SRN) Full-Stack Platform

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

Welcome to the official repository of **Sashakt Rashtra Nirman (SRN)**. This is a unified full-stack platform designed to empower NGO operations, foster community engagement, and manage social impact initiatives through a scalable, modern architecture.

---

## 🏗️ Project Architecture

This repository is managed as a **pnpm workspace**, consolidating the entire SRN ecosystem into a single, manageable codebase.

### 1. [Frontend Website](./artifacts/srn-website)
A highly interactive and responsive web application built for donors, volunteers, and community members.
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS & Framer Motion
- **State Management**: React Context API & TanStack Query
- **UI Components**: Radix UI

### 2. [Backend Infrastructure](./artifacts/srn-backend)
A production-grade, secure API gateway managing all core business logic.
- **Runtime**: Node.js & Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Security**: JWT, Google OAuth 2.0, & Redis-based blacklisting
- **Real-time**: Socket.io for notifications
- **DevOps**: Docker, Docker Compose, & GitHub Actions

### 3. [Project Documentation](./SRN_Project_Documents)
Comprehensive guides including PRD, TRD, UI/UX briefings, and Database schemas.

---

## 🚀 Quick Start

Follow these steps to set up the entire workspace locally.

### 1. Prerequisites
- **Node.js**: v22 or higher (LTS recommended)
- **pnpm**: `npm install -g pnpm`
- **Docker**: For database and caching services

### 2. Installation
Install dependencies for the entire workspace from the root directory:
```bash
pnpm install
```

### 3. Environment Configuration
You will need to set up `.env` files in both the frontend and backend directories.
- **Backend**: Copy the example in `artifacts/srn-backend/.env`
- **Frontend**: Copy the example in `artifacts/srn-website/.env`

### 4. Running the Platform
#### Start Backend (Development):
```bash
cd artifacts/srn-backend
npx prisma generate
npm run dev
```

#### Start Frontend (Development):
```bash
cd artifacts/srn-website
npm run dev
```

#### Start via Docker (Full Stack):
```bash
cd artifacts/srn-backend
docker-compose up --build
```

---

## 🛠️ Key Technical Features

| Feature | Implementation |
| :--- | :--- |
| **Authentication** | Multi-provider (Google + Email/Pass) with secure JWT rotation. |
| **Membership** | Subscription-based tiers with Razorpay payment integration. |
| **Forums** | Real-time threaded discussions and community interactions. |
| **Events** | Dynamic event lifecycle management with attendee tracking. |
| **Caching** | Redis-driven API response caching for high-traffic endpoints. |
| **Notifications** | Real-time socket-based alerts and structured email delivery. |
| **Observability** | Structured logging with Winston and automated CI/CD validation. |

---

## 📈 Quality Assurance

We maintain high code quality standards through automated testing and CI pipelines.
- **Backend Tests**: `npm test` inside `artifacts/srn-backend`
- **Documentation**: Interactive Swagger docs at `/api/docs`
- **CI/CD**: Automatic testing and Docker build validation on every push to `main`.

---

## 📄 License
This project is proprietary. All rights reserved by Sashakt Rashtra Nirman (SRN).
