You are a senior backend architect and Node.js engineer.

I am building the backend for a production-grade NGO platform called "Sashakt Rashtra Nirman (SRN)".

The frontend is being developed separately by another developer, so I need a fully modular, scalable, secure backend API system with proper architecture and testing support.

====================================================
TECH STACK
====================================================

Backend:
- Node.js
- Express.js
- TypeScript

Database:
- Supabase
- PostgreSQL
- Redis


Cache:
- Redis for caching


ORM:
- Prisma ORM

Authentication:
- JWT Access + Refresh Tokens
- Google OAuth 2.0

Validation:
- Zod

Security:
- Helmet
- CORS
- Rate Limiting
- bcrypt

Testing:
- Postman collections
- Swagger/OpenAPI docs

Storage:
- Cloudinary OR AWS S3
- Supabase Storage

Payments:
- Razorpay

DevOps:
- Docker
- GitHub Actions

====================================================
PROJECT REQUIREMENTS
====================================================

There are 4 user roles:

1. Public User
2. Registered User
3. Paid Subscription Member
4. Admin

Main modules:
- Authentication
- Google OAuth
- User profile
- Membership system
- Subscription plans
- Payment system
- Blogs/CMS
- Events system
- Premium content
- Forum/community
- Notifications
- Admin dashboard

====================================================
BACKEND ARCHITECTURE REQUIREMENTS
====================================================

Use a scalable architecture:

src/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── payment/
│   ├── subscription/
│   ├── events/
│   ├── posts/
│   ├── forum/
│   └── admin/
│
├── middleware/
├── config/
├── utils/
├── lib/
├── routes/
├── prisma/
├── types/
├── docs/
└── tests/

Each module should contain:
- controller
- service
- routes
- validation
- types
- prisma queries

====================================================
AUTHENTICATION SYSTEM
====================================================

Implement:

1. Register
2. Login
3. Logout
4. Refresh Token
5. Forgot Password
6. Reset Password
7. Email Verification
8. Google OAuth

Requirements:
- bcrypt password hashing
- JWT access token
- JWT refresh token
- Refresh token rotation
- Secure HTTP-only cookies
- RBAC middleware

Create:
- auth middleware
- role middleware
- token utilities

====================================================
GOOGLE OAUTH IMPLEMENTATION
====================================================

Implement Google OAuth using Passport.js OR Google OAuth client library.

Requirements:
- Google login route
- OAuth callback route
- Create account automatically if user doesn't exist
- Generate JWT after OAuth login
- Store Google profile data
- Handle duplicate email edge cases

Routes:
GET /api/auth/google
GET /api/auth/google/callback

====================================================
DATABASE DESIGN
====================================================

Use Prisma ORM.

Create schemas for:

User
- id
- name
- email
- password
- avatar
- role
- provider
- isVerified
- createdAt

Membership
- id
- userId
- plan
- startDate
- endDate
- status

Payment
- id
- userId
- amount
- transactionId
- provider
- status

Post
- id
- title
- slug
- content
- isPremium
- authorId

Event
- id
- title
- description
- location
- date

ForumThread
- id
- title
- content
- userId

Notification
- id
- userId
- title
- message
- read

====================================================
API DEVELOPMENT REQUIREMENTS
====================================================

Create REST APIs for all modules.

Requirements:
- Proper status codes
- Standard response format
- Error handling middleware
- Async handler wrapper
- Validation using Zod
- Pagination
- Filtering
- Search support

====================================================
API RESPONSE FORMAT
====================================================

Success:
{
  success: true,
  message: "Success",
  data: {}
}

Error:
{
  success: false,
  message: "Error message",
  error: {}
}

====================================================
ADMIN FEATURES
====================================================

Admin APIs:
- Get all users
- Ban user
- Delete user
- Manage posts
- Manage subscriptions
- View analytics
- Manage events

====================================================
PREMIUM CONTENT LOGIC
====================================================

Implement middleware:
- verifySubscription()

Only paid members can:
- Access premium posts
- Download resources
- Access webinars

====================================================
PAYMENT SYSTEM
====================================================

Implement Razorpay:
- Create order
- Verify payment
- Webhooks
- Store payment history

====================================================
FILE UPLOAD SYSTEM
====================================================

Implement:
- Multer
- Cloudinary uploads

Features:
- Profile image upload
- Post image upload
- Event banners

====================================================
SWAGGER DOCUMENTATION
====================================================

Generate:
- Swagger/OpenAPI documentation
- Route descriptions
- Request body schemas
- Authentication docs

Swagger route:
GET /api/docs

====================================================
TESTING REQUIREMENTS
====================================================

Generate:
- Complete Postman collection
- Example request bodies
- Example tokens
- API testing workflow

Also generate:
- Thunder Client JSON

====================================================
SECURITY REQUIREMENTS
====================================================

Implement:
- Helmet
- CORS
- Rate limiting
- XSS sanitization
- SQL injection prevention
- Request validation
- Environment variable management

====================================================
DEVOPS REQUIREMENTS
====================================================

Generate:
- Dockerfile
- docker-compose.yml
- GitHub Actions CI/CD workflow

Pipeline:
- Install dependencies
- Run lint
- Run tests
- Build project
- Deploy

====================================================
IMPLEMENTATION FLOW
====================================================

Build in this exact order:

1. Project setup
2. Prisma setup
3. Database schema
4. Auth module
5. Google OAuth
6. User module
7. Admin module
8. Posts CMS
9. Events
10. Payments
11. Memberships
12. Forum
13. Notifications
14. Swagger docs
15. Docker
16. CI/CD

====================================================
IMPORTANT CODING RULES
====================================================

- Use TypeScript everywhere
- Use clean architecture
- Use async/await
- Use reusable utilities
- Use environment variables
- Add comments for complex logic
- Separate controller/service logic
- Never place business logic in routes
- Write production-grade code
- Add TODO comments for frontend integration

====================================================
DELIVERABLES
====================================================

Generate:
1. Full folder structure
2. Prisma schema
3. API routes
4. Middleware
5. Controllers
6. Services
7. Validation schemas
8. Swagger setup
9. Docker setup
10. GitHub Actions workflow
11. Postman collection
12. OAuth implementation
13. README.md
14. Environment variables example
15. API testing guide

Now start with:
1. Initial project setup
2. Prisma schema
3. Authentication module
4. Google OAuth implementation