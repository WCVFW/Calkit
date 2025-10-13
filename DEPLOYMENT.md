Deployment & Run Guide

1. Start MySQL and services (docker-compose):
   docker-compose up --build

2. Build and run services individually:
   - Frontend: cd frontend && npm install && npm run dev
   - CRM: cd backend/services/crm-service && mvn spring-boot:run
  - Case mgmt: cd backend/services/case-management-service && mvn spring-boot:run
  - Sales: cd backend/services/sales-payment-service && mvn spring-boot:run

3. API endpoints:
   - Leads: http://localhost:8081/api/leads
   - Orders: http://localhost:8084/api/orders
   - Cases: http://localhost:8083/api/cases

4. Use deployments/openapi.yaml as reference for basic APIs.
