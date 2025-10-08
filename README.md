# Vakilsearch Platform (Scaffold)

This repository contains a React frontend and Java/Spring Boot microservices scaffold configured to use MySQL.

Folders:
- frontend/ — React + Vite + Tailwind frontend
- backend/ — Java Spring Boot microservices (crm-service, onboarding-service, case-management-service, sales-payment-service, execution-company-reg)
- libraries/ — shared model artifacts
- deployments/ — docker-compose & deployment configs

Quick start (development):
1. Start MySQL: docker-compose up -d mysql
2. Start crm-service: cd backend/services/crm-service && ./mvnw spring-boot:run
3. Start frontend: cd frontend && npm install && npm run dev

For full production-ready builds, follow each service README inside their folders.
