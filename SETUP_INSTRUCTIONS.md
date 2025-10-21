# Setup Instructions - Financial CRM Workflow System

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 16+
- MySQL 8.0+
- Git

## Backend Setup (Spring Boot)

### 1. Database Setup

```bash
# Create database
mysql -u root -p
> CREATE DATABASE user_db;
> USE user_db;
> SOURCE backend/src/main/resources/schema.sql;
> EXIT;
```

### 2. Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/user_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server
server.port=8081

# JWT
security.jwt.secret=your_secret_key
security.jwt.expiration=3600000
```

### 3. Build and Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8081`

### 4. Verify Backend

```bash
# Check API documentation
curl http://localhost:8081/api/workflow/stages

# Expected response:
["WEB", "CRM", "SALES", "ONBD", "CASE", "EXEC", "GOVT", "QA", "DEL", "PF", "MD", "GO", "SLAB", "CR"]
```

---

## Frontend Setup (React + Vite)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:8081
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will start at: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## API Testing

### Using cURL

#### Get Workflow Timeline

```bash
curl -X GET http://localhost:8081/api/workflow/orders/1002/timeline \
  -H "Content-Type: application/json"
```

#### Create Workflow Event

```bash
curl -X POST http://localhost:8081/api/workflow/orders/1002/event \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "WEB",
    "status": "COMPLETED",
    "description": "Lead captured",
    "details": "From website form"
  }'
```

#### Get Workflow Progress

```bash
curl -X GET http://localhost:8081/api/workflow/orders/1002/progress \
  -H "Content-Type: application/json"
```

#### Get Analytics

```bash
curl -X GET http://localhost:8081/api/workflow/analytics/dashboard-stats \
  -H "Content-Type: application/json"
```

### Using Postman

Import the following endpoints:

1. **Workflow Management**
   - GET `/api/workflow/orders/{orderId}/timeline`
   - GET `/api/workflow/orders/{orderId}/progress`
   - POST `/api/workflow/orders/{orderId}/event`
   - POST `/api/workflow/orders/{orderId}/advance`
   - POST `/api/workflow/orders/{orderId}/complete`

2. **Alert Management**
   - GET `/api/workflow/alerts/orders/{orderId}`
   - POST `/api/workflow/alerts`
   - PUT `/api/workflow/alerts/{alertId}/resolve`

3. **Analytics**
   - GET `/api/workflow/analytics/dashboard-stats`
   - GET `/api/workflow/analytics/stage-stats`
   - GET `/api/workflow/analytics/exception-stats`

---

## Accessing the Application

### After Setup

1. **Backend API**: http://localhost:8081
2. **Frontend App**: http://localhost:5173
3. **API Documentation**: http://localhost:8081/swagger-ui.html

### Navigation

- **CRM Dashboard**: http://localhost:5173/dashboard/crm-dashboard
- **Order Details**: http://localhost:5173/dashboard/orders/1002
- **Workflow Analytics**: http://localhost:5173/dashboard/workflow-analytics

---

## Sample Data

The system automatically creates sample data on first run:

- **Order ID**: 1002
- **Service**: GST Registration
- **Value**: ₹4,999
- **Status**: In Onboarding stage
- **Events**: WEB → CRM → SALES → ONBD (in progress)

### Create Your Own Order

```bash
curl -X POST http://localhost:8081/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": 123,
    "serviceType": "TRADEMARK_FILING",
    "value": 5999
  }'
```

---

## Troubleshooting

### Database Connection Issues

**Error**: `Access denied for user 'root'@'localhost'`

**Solution**:

- Check MySQL is running: `mysql -u root -p`
- Verify password in `application.properties`
- Reset MySQL password if needed

### Port Already in Use

**Error**: `Address already in use: 8081`

**Solution**:

- Change port in `application.properties`: `server.port=8082`
- Or kill process: `lsof -i :8081` then `kill -9 <PID>`

### Frontend Build Issues

**Error**: `Cannot find module`

**Solution**:

- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:

- Ensure backend has `@CrossOrigin(origins = "*")` on controllers
- Check `VITE_API_URL` in frontend `.env` file
- Verify backend is running on correct port

---

## Performance Tuning

### Database Optimization

```sql
-- Add indexes for better query performance
ALTER TABLE workflow_events ADD INDEX idx_order_id (order_id);
ALTER TABLE workflow_events ADD INDEX idx_stage (stage);
ALTER TABLE workflow_events ADD INDEX idx_created_at (created_at);
ALTER TABLE workflow_alerts ADD INDEX idx_order_id (order_id);
ALTER TABLE workflow_alerts ADD INDEX idx_resolved (resolved);
```

### Backend Performance

In `application.properties`:

```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5

# Caching
spring.cache.type=simple
```

---

## Security Setup

### JWT Configuration

Generate a strong secret key:

```bash
# Linux/Mac
openssl rand -base64 32

# Or use online generator
# https://generate-random.org/

# Update in application.properties
security.jwt.secret=YOUR_GENERATED_SECRET_KEY
```

### HTTPS Setup (Production)

1. Generate SSL certificate
2. Configure in `application.properties`:

```properties
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=yourpassword
server.ssl.key-store-type=PKCS12
```

---

## Deployment

### Docker Setup

#### Backend Dockerfile

```dockerfile
FROM openjdk:17-slim
COPY backend/target/financial-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Docker Compose

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: user_db
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    ports:
      - "8081:8081"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
```

---

## Monitoring

### Backend Metrics

Access actuator endpoints:

```bash
curl http://localhost:8081/actuator/health
curl http://localhost:8081/actuator/metrics
```

### Frontend Monitoring

Use browser DevTools:

- **Network**: Monitor API calls
- **Console**: Check for errors
- **Performance**: Track load times

---

## Support & Troubleshooting

For issues:

1. Check logs: `backend/logs/application.log`
2. Verify all services are running
3. Check database connectivity
4. Review browser console for frontend errors
5. Ensure all ports are available

---

## Next Steps

1. ✅ Setup complete
2. Customize branding and colors
3. Configure email notifications
4. Integrate payment gateway webhooks
5. Connect government portal APIs
6. Set up monitoring and alerts
7. Deploy to production environment

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: Development Team
