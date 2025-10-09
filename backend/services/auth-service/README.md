# Auth Service (Spring Boot)

This service provides a simulated OTP-based authentication flow and issues JWT tokens.

Run (from repository root):

mvn -f backend/services/auth-service clean package
java -jar backend/services/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar

Endpoints:

- POST /api/auth/send-otp { mobile }
- POST /api/auth/verify-otp { mobile, code }
- GET /api/user/me (requires Authorization: Bearer <token>)

Notes:

- OTPs are printed to the application console for development (simulate SMS).
- H2 in-memory DB is used. Update application.yml to use real DB in production.
- Change app.jwt.secret in application.yml for production.
