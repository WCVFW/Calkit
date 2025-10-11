Backend (Express + Prisma + MySQL)

1. Copy backend/.env.example to backend/.env and fill DATABASE_URL, JWT_SECRET, EMAIL_TOKEN_SECRET, GMAIL_USER, GMAIL_APP_PASSWORD
2. Install deps: npm install
3. Generate Prisma client and run migrations manually:
   npx prisma generate
   npx prisma db push
4. Start server: npm run dev

API endpoints:
- POST /api/auth/signup { name, email, password }
- POST /api/auth/login { email, password }
- POST /api/auth/verify-email { token }
- GET /api/user/me (Authorization: Bearer <token>)

