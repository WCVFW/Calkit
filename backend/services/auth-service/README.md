# Auth Service (Spring Boot) - MySQL & Twilio

This Spring Boot service provides OTP-based authentication and JWT tokens. It supports MySQL for production and Twilio for sending SMS OTPs. Defaults fall back to H2 in-memory for development.

Build

mvn -f backend/services/auth-service clean package

Run (dev with H2)

java -jar backend/services/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar

Run (with MySQL)

1. Start MySQL (example using docker-compose):
   cd backend/services/auth-service
   docker-compose up -d mysql

2. Set environment variables and run:
   SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/authdb?useSSL=false&allowPublicKeyRetrieval=true" \
   SPRING_DATASOURCE_USERNAME="authuser" \
   SPRING_DATASOURCE_PASSWORD="authpass" \
   APP_JWT_SECRET="your_jwt_secret" \
   TWILIO_ACCOUNT_SID="your_twilio_sid" \
   TWILIO_AUTH_TOKEN="your_twilio_token" \
   TWILIO_FROM="+12223334444" \
   java -jar target/auth-service-0.0.1-SNAPSHOT.jar

Endpoints

- POST /api/auth/send-otp { mobile }
- POST /api/auth/verify-otp { mobile, code }
- GET /api/user/me (requires Authorization: Bearer <token>)

Notes

- If Twilio env vars are set (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM) the service will attempt to send SMS via Twilio; otherwise OTPs are printed to the console for development.
- For production use secure storage for APP_JWT_SECRET and DB credentials.
- H2 console is available only when using H2 (dev).

Docker-compose

A sample docker-compose.yml is included to run MySQL for development. It does not build/run the Spring Boot app automatically.

Support

If you want, I can add a docker-compose service to build and run the Spring Boot app as well, and add frontend proxying in Vite.
