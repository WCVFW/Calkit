# Project Workflow Guide

This repository contains a React + Vite frontend (active) and various backend/service examples. The Node backend under backend/src has been deleted and the app now runs fully frontend-only using mocked API endpoints.

## Repository Overview

- frontend/ — React 18 + Vite 5 app (active)
  - src/lib/mock-api.js — Axios adapter that mocks /api endpoints
  - src/lib/auth.js — LocalStorage-based auth token and user helpers
  - vite.config.js — Vite config with alias @ -> src, dev server config
- backend/ — reference backends and service stubs (no active server after backend/src removal)
- docs/ — documentation and diagrams
- src/ — Angular example code (not used by current dev command)

## Prerequisites

- Node.js 18+ and npm

## Setup

- Install dependencies for the active app:
  - npm start (runs cd frontend && npm run dev) will auto-install in most environments
  - Or manually: cd frontend && npm install

## Development

- Start dev server: npm start (root) → http://localhost:5173
- Hot reload on file save
- No backend needed; API requests are intercepted by the mock adapter

## API & Mocking

- Axios adapter at frontend/src/lib/mock-api.js handles these endpoints:
  - POST /api/auth/login → returns { token:"mock-token", user }
  - POST /api/auth/signup → returns success message
  - POST /api/auth/verify-email → returns success message
  - GET /api/user/me → returns the stored user (requires Authorization header)
  - GET /api/leads → returns sample leads array
- To disable mocks and use a real API:
  1. Remove the import "./lib/mock-api" from frontend/src/main.jsx
  2. Add a Vite proxy in frontend/vite.config.js (server.proxy) to your backend
  3. Ensure your backend implements the same routes or update the frontend code

## Authentication

- Token and user are stored in LocalStorage (frontend/src/lib/auth.js)
- setToken sets Authorization header on Axios for subsequent calls
- App bootstraps auth via initAuth in App.jsx and listens for "auth:update" events

## Routing

- React Router v6 configured in frontend/src/App.jsx
- ProtectedRoute wraps /dashboard
- Header, Footer, and various pages under frontend/src/pages

## Build

- Production build: cd frontend && npm run build
- Output: frontend/dist/

## Deployment

- Any static host (Netlify, Vercel, S3 + CloudFront, etc.) can serve frontend/dist
- Recommended: Netlify for smooth CI/CD
  - Connect via Builder MCP: Open MCP popover → Connect to Netlify → configure build command (npm run build) and publish directory (frontend/dist)

## Migrating to a Real Backend

Preferred approach: Supabase (DB + Auth + APIs)

- Steps:
  1. Open MCP popover → Connect to Supabase
  2. Implement auth (email/password, OTP, or magic link) and tables
  3. Replace mocks: remove mock import and call Supabase client or your serverless functions

Alternatives:

- Neon (Postgres) + your API service → Connect to Neon via MCP
- Prisma (ORM) with a Node service (not currently present) �� Connect to Prisma Postgres via MCP
- Java Spring services under backend/services can be developed independently and exposed behind an API gateway; update Vite proxy accordingly

## Environment Variables

- Frontend (mocked): none required
- Real backend: define appropriate env for your server (e.g., JWT secrets, DB URL) and align frontend proxy

## Testing

- No test suite configured for the React app in this repo
- You can add Vitest/React Testing Library for unit/integration tests

## Security Notes

- Mock mode is for development only; no real auth or persistence
- When enabling real backend/auth, never commit secrets; use environment variables or secret managers

## Troubleshooting

- Port in use: change Vite server.port in frontend/vite.config.js
- Broken API calls: confirm mocks are enabled (import "./lib/mock-api") or real API/proxy is configured
- Styling: Tailwind config is in frontend/tailwind.config.js

## Available MCP Integrations (connect via Open MCP popover)

- Supabase — database, auth, real-time
- Neon — serverless Postgres
- Netlify — deployment/hosting/CDN
- Zapier — automation/workflows
- Figma — design to code via Builder.io plugin
- Builder CMS — content management
- Linear — project management and issues
- Notion — documentation/knowledge base
- Sentry — error monitoring and performance
- Context7 — up-to-date docs for libraries/frameworks
- Semgrep — security scanning (SAST)
- Prisma Postgres — ORM for Postgres

## Current Architecture (Dev, Mocked)

```mermaid
flowchart LR
  A[User Browser] -->|HTTP (UI)| B[Frontend (React + Vite)]
  B -->|Axios (mock adapter)| M[In-Browser Mock API]
  M -->|LocalStorage| LS[(LocalStorage)]
```

## Example Architecture (Real Backend)

```mermaid
flowchart LR
  A[User Browser] -->|HTTP (UI)| B[Frontend (React + Vite)]
  B -->|/api/* via proxy| API[Backend API]
  API --> DB[(DB e.g., Supabase/Neon)]
  API --> SSO[Auth Provider]
```
