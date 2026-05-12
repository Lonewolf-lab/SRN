# 🛡️ Sashakt Rashtra Nirman (SRN) Backend

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

A production-grade, highly scalable backend infrastructure for the **Sashakt Rashtra Nirman (SRN)** platform. This system manages NGO operations, user engagement, forum discussions, events, and secure donation processing.

---

## 🚀 Features

- **🔐 Robust Auth**: Google OAuth 2.0 integration & JWT-based session management.
- **🛡️ Security**: Token blacklisting with Redis and protected route middleware.
- **☁️ Cloud Storage**: Multi-bucket avatar and resource management via Supabase Storage.
- **💬 Community**: Full-featured Forum with threads and nested comments.
- **📈 Content**: Paginated post systems with keyword search and premium filters.
- **📅 Events**: Event management with attendee tracking and registration.
- **💳 Payments**: Seamless Razorpay integration for memberships and donations.
- **📖 API Documentation**: Interactive Swagger/OpenAPI 3.0 dashboard.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Prisma ORM)
- **Caching**: Redis (ioredis)
- **File Storage**: Supabase Storage
- **Testing**: Jest & Supertest
- **Documentation**: Swagger UI
- **DevOps**: Docker, Docker Compose, GitHub Actions

---

## 🚦 Quick Start

### 1. Prerequisites
- Docker & Docker Compose
- Node.js v20+

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
PORT=3000
DATABASE_URL="your_postgresql_url"
REDIS_URL="your_redis_url"
JWT_SECRET="your_secret"
SUPABASE_URL="your_supabase_url"
SUPABASE_SERVICE_ROLE_KEY="your_key"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
RAZORPAY_KEY_ID="your_key"
RAZORPAY_KEY_SECRET="your_secret"
```

### 3. Running Locally
```bash
# Install dependencies
npm install

# Generate Database Client
npx prisma generate

# Start in development mode
npm run dev
```

### 4. Running with Docker
```bash
docker-compose up --build
```

---

## 🧪 Testing & Quality

We maintain high code quality through automated integration tests.

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 📚 API Documentation

Once the server is running, you can explore and test the APIs interactively at:
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

---

## 🚢 CI/CD

This repository uses **GitHub Actions** for continuous integration. On every push to `main` or `master`:
1. Environment is initialized.
2. Dependencies are installed.
3. Automated test suite is executed.
4. Docker build is verified for production readiness.

---

## 📁 Project Structure

```text
src/
├── config/         # App configurations (Swagger, etc.)
├── lib/            # Shared clients (Supabase, Redis)
├── middleware/     # Auth, Validation, Error handlers
├── modules/        # Domain-driven modules (Auth, User, Posts...)
├── utils/          # Helper functions (Upload, Response)
└── tests/          # Integration tests
```

---

## 📜 License
This project is proprietary. All rights reserved.
