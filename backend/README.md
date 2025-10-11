# Calzone Financial Backend (Spring Boot)

A unified Spring Boot 3 application that provides authentication APIs backed by MySQL.

## Prerequisites

- Java 17+
- Maven 3.9+
- MySQL instance reachable at `jdbc:mysql://localhost:3306/app_db`

## Configuration

Configuration values are managed in `src/main/resources/application.properties`. Update the following as needed:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/app_db
spring.datasource.username=root
spring.datasource.password=rootpass123
security.jwt.secret=Tr0Xy9nLX8kf7W3uTnZ0jP8A5lKhbGH2eE8wJ9OTq3U=
security.jwt.expiration=3600000
```

For production, override these properties with environment variables or an external configuration source.

## Running the Application

```bash
cd backend
mvn spring-boot:run
```

The server listens on port **4000** by default.

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/auth/signup` | Register a new account   |
| POST   | `/api/auth/login`  | Authenticate and get JWT |

### Request & Response Examples

#### Sign up

```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "phone": "+91-9876543210",
  "password": "StrongPass123"
}
```

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "fullName": "Ada Lovelace",
    "email": "ada@example.com",
    "phone": "+91-9876543210"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ada@example.com",
  "password": "StrongPass123"
}
```

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "fullName": "Ada Lovelace",
    "email": "ada@example.com",
    "phone": "+91-9876543210"
  }
}
```

Include the `Authorization: Bearer <jwt-token>` header to access protected endpoints you add in the future.
