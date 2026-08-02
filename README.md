# NovaPay Enterprise Banking Platform

A production-ready full-stack demo matching the supplied NovaPay banking UI: secure auth, dashboard analytics, wallets, transactions, and money transfers.

## Stack
- Frontend: React + Vite + CSS responsive layout
- Backend: Node.js + Express, JWT auth, bcrypt password hashing, Helmet, CORS, Zod validation
- Deployment: Docker multi-stage build

## Local development
```bash
npm run install:all
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:4000/api

Demo login:
- Email: `alok@novapay.com`
- Password: `Password123!`

## Production build
```bash
npm run build
npm test
```

## Docker
```bash
docker compose up --build
```
