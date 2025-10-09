# Local Run Instructions (No Docker)

This repo contains a React frontend and two Spring Boot backend services (auth-service and crm-service). These instructions show how to run everything locally without Docker.

Prerequisites

- Node.js 18+, npm
- Java 17
- Maven
- MySQL running locally (or use any MySQL server accessible from your machine)

1. Prepare MySQL databases

Connect to your local MySQL and run:

CREATE DATABASE IF NOT EXISTS authdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS crmdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

You can use root / rootpass1234 (example) or any other user. If you use different credentials, provide them as env vars when running services.

2. Run Auth Service (Spring Boot)

cd backend/services/auth-service
mvn clean package

# Example run with env vars:

SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/authdb?useSSL=false&allowPublicKeyRetrieval=true" \
SPRING_DATASOURCE_USERNAME="root" \
SPRING_DATASOURCE_PASSWORD="rootpass1234" \
APP_JWT_SECRET="change_this_secret" \
TWILIO_ACCOUNT_SID="" \
TWILIO_AUTH_TOKEN="" \
TWILIO_FROM="" \
java -jar target/auth-service-0.0.1-SNAPSHOT.jar

The service runs on http://localhost:8081 by default.

3. Run CRM Service (Spring Boot)

cd backend/services/crm-service
mvn clean package

# Example run with env vars:

SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/crmdb?useSSL=false&allowPublicKeyRetrieval=true" \
SPRING_DATASOURCE_USERNAME="root" \
SPRING_DATASOURCE_PASSWORD="rootpass1234" \
APP_JWT_SECRET="change_this_secret" \
java -jar target/crm-service-0.0.1-SNAPSHOT.jar

The CRM service runs on http://localhost:8082 by default.

4. Run Frontend (development with Vite)

cd frontend
npm install
npm run dev

Dev server runs at http://localhost:5173. The Vite config proxies /api to http://localhost:8081 so frontend API calls reach the auth service.

5. Login flow

- Open http://localhost:5173/login, send OTP (OTP will be printed in backend logs unless Twilio env vars are set), verify OTP, then you will be redirected to the dashboard.

Troubleshooting

- Check backend logs for OTPs and errors (console where you started the Spring apps).
- Ensure MySQL is running and accessible.
- If API requests fail from frontend, verify vite.config.js proxy and that auth-service is running on port 8081.

Security

- Do not commit real secrets to the repo. Use env vars for production. For Twilio integration, set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM.
