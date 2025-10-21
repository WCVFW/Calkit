# Deployment & Verification Checklist

## Pre-Deployment Verification

### Backend (Spring Boot)

- [ ] **Java Installation**
  - [ ] Java 17+ installed: `java -version`
  - [ ] JAVA_HOME environment variable set

- [ ] **Maven Setup**
  - [ ] Maven 3.8+ installed: `mvn -version`
  - [ ] Maven can access central repository

- [ ] **Database**
  - [ ] MySQL 8.0+ running: `mysql --version`
  - [ ] Database `user_db` created
  - [ ] User has full permissions
  - [ ] Schema imported: `schema.sql`

- [ ] **Backend Build**
  ```bash
  cd backend
  mvn clean install
  # Should complete without errors
  ```

- [ ] **Backend Configuration**
  - [ ] `application.properties` configured
  - [ ] Database credentials correct
  - [ ] JWT secret configured
  - [ ] Server port available (8081)

- [ ] **Backend Runtime**
  ```bash
  mvn spring-boot:run
  # Should start without errors
  # Check log for "Started BackendApplication"
  ```

- [ ] **Backend API Health Check**
  ```bash
  curl http://localhost:8081/actuator/health
  # Should return: {"status":"UP"}
  ```

- [ ] **Sample Data Initialization**
  ```bash
  curl http://localhost:8081/api/workflow/stages
  # Should return list of stages
  ```

### Frontend (React + Vite)

- [ ] **Node.js Installation**
  - [ ] Node 16+ installed: `node -version`
  - [ ] npm installed: `npm -version`

- [ ] **Frontend Dependencies**
  ```bash
  cd frontend
  npm install
  # Should complete without errors
  ```

- [ ] **Frontend Build**
  ```bash
  npm run build
  # Should create dist/ folder
  ```

- [ ] **Frontend Dev Server**
  ```bash
  npm run dev
  # Should start without errors
  # App available at http://localhost:5173
  ```

- [ ] **Port Availability**
  - [ ] Port 5173 available for frontend
  - [ ] Port 8081 available for backend

### Integration Testing

- [ ] **API Connectivity**
  - [ ] Frontend can reach backend API
  - [ ] No CORS errors in console
  - [ ] Network requests successful

- [ ] **Data Flow**
  - [ ] Create order via API
  - [ ] Fetch workflow progress
  - [ ] Create workflow event
  - [ ] Update alert status

- [ ] **UI Components**
  - [ ] CRM Dashboard loads
  - [ ] Timeline visualization works
  - [ ] Buttons are functional
  - [ ] Forms submit correctly

- [ ] **Database**
  - [ ] Tables created: `workflow_events`, `workflow_alerts`, `orders`
  - [ ] Indexes created
  - [ ] Sample data present
  - [ ] Queries execute quickly

---

## Deployment Steps

### Step 1: Prepare Environment

```bash
# 1. Create deployment directory
mkdir -p /opt/financial-crm
cd /opt/financial-crm

# 2. Clone/copy project
git clone <repo-url> .
# or
cp -r /path/to/project .

# 3. Create logs directory
mkdir -p logs
chmod 755 logs
```

### Step 2: Database Setup

```bash
# 1. Create database
mysql -u root -p << EOF
CREATE DATABASE user_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE user_db;
GRANT ALL PRIVILEGES ON user_db.* TO 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
FLUSH PRIVILEGES;
EOF

# 2. Import schema
mysql -u root -p user_db < backend/src/main/resources/schema.sql

# 3. Verify tables
mysql -u root -p user_db -e "SHOW TABLES;"
```

### Step 3: Backend Deployment

```bash
cd backend

# 1. Update configuration
# Edit src/main/resources/application.properties
# - Set database URL, user, password
# - Set JWT secret
# - Set server port

# 2. Build application
mvn clean package -DskipTests

# 3. Run application
java -jar target/financial-backend-0.0.1-SNAPSHOT.jar

# Or use nohup for background execution
nohup java -jar target/financial-backend-0.0.1-SNAPSHOT.jar > ../logs/backend.log 2>&1 &

# 4. Verify startup
sleep 5
curl http://localhost:8081/actuator/health
```

### Step 4: Frontend Deployment

```bash
cd frontend

# 1. Update environment
# Create .env with:
# VITE_API_URL=http://localhost:8081

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Serve with production server
# Option A: Using simple HTTP server
npm install -g serve
serve -s dist -l 3000

# Option B: Using Nginx (recommended)
# Copy dist/* to /var/www/html/crm/
# Configure Nginx to serve from that directory
```

### Step 5: Nginx Configuration (Optional)

```nginx
# /etc/nginx/sites-available/financial-crm

upstream backend {
    server localhost:8081;
}

server {
    listen 80;
    server_name crm.yourdomain.com;

    # Frontend
    location / {
        root /var/www/html/crm;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Actuator endpoints
    location /actuator/ {
        proxy_pass http://backend;
    }
}
```

### Step 6: SSL Setup (HTTPS)

```bash
# Using Let's Encrypt with Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d crm.yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
```

---

## Post-Deployment Verification

### Health Checks

```bash
# 1. Backend health
curl http://localhost:8081/actuator/health

# 2. Database connectivity
curl http://localhost:8081/api/workflow/stages

# 3. Frontend accessibility
curl http://localhost:3000 or your-domain

# 4. API connectivity from frontend
# Check browser DevTools → Network tab
# Verify no 404 or CORS errors
```

### Functionality Tests

```bash
# 1. Create test order
curl -X POST http://localhost:8081/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": 999,
    "serviceType": "TEST",
    "value": 999
  }'

# Expected: Order created with ID

# 2. Get workflow progress
curl http://localhost:8081/api/workflow/orders/999/progress

# Expected: Workflow structure with current stage

# 3. Create workflow event
curl -X POST http://localhost:8081/api/workflow/orders/999/event \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "WEB",
    "status": "COMPLETED",
    "description": "Test event"
  }'

# Expected: Event created successfully

# 4. Get timeline
curl http://localhost:8081/api/workflow/orders/999/timeline

# Expected: Array with created event
```

### Performance Checks

- [ ] API response time < 200ms
- [ ] Page load time < 2s
- [ ] No console errors
- [ ] Database queries optimized
- [ ] Memory usage stable

### Security Checks

- [ ] HTTPS enabled (in production)
- [ ] JWT token required for protected endpoints
- [ ] CORS properly configured
- [ ] No sensitive data in logs
- [ ] Database credentials not exposed

---

## Monitoring & Maintenance

### Daily

- [ ] Check application logs for errors
- [ ] Verify database is running
- [ ] Monitor disk space
- [ ] Check API response times

### Weekly

- [ ] Review error logs
- [ ] Check database size
- [ ] Backup database
- [ ] Verify backups are working

### Monthly

- [ ] Database optimization
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Capacity planning

### Logging Configuration

```properties
# In application.properties
logging.file.name=logs/application.log
logging.file.max-size=10MB
logging.file.max-history=30
logging.level.root=INFO
logging.level.com.calzone.financial=DEBUG
```

---

## Troubleshooting

### Backend Won't Start

**Error**: Port already in use
```bash
# Find and kill process
lsof -i :8081
kill -9 <PID>

# Or change port in application.properties
server.port=8082
```

**Error**: Cannot connect to database
```bash
# Verify MySQL is running
sudo systemctl status mysql

# Check credentials
mysql -u app_user -p user_db -e "SELECT 1;"

# Verify schema
mysql -u app_user -p user_db -e "SHOW TABLES;"
```

**Error**: Java version
```bash
# Check Java version
java -version

# Should be 17 or higher
# Install Java 17 if needed
```

### Frontend Won't Load

**Error**: API not reachable
```bash
# Check backend is running
curl http://localhost:8081/actuator/health

# Check VITE_API_URL in .env
cat frontend/.env

# Check CORS headers in browser DevTools
```

**Error**: Port 5173 already in use
```bash
# Find process
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

### Database Issues

**Error**: Cannot create database
```bash
# Verify MySQL user has privileges
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
```

**Error**: Schema import fails
```bash
# Check file exists
ls -la backend/src/main/resources/schema.sql

# Try importing directly
mysql -u root -p user_db < backend/src/main/resources/schema.sql
```

---

## Rollback Plan

If deployment fails:

1. **Stop services**
   ```bash
   pkill -f "java -jar"
   npm stop
   ```

2. **Restore previous version**
   ```bash
   git checkout previous-commit
   # or restore from backup
   ```

3. **Restore database**
   ```bash
   mysql user_db < database_backup.sql
   ```

4. **Redeploy previous version**
   - Follow deployment steps with previous code

5. **Verify rollback success**
   - Run health checks
   - Test critical functionality

---

## Success Criteria

✅ All items in "Deployment Steps" completed  
✅ All health checks passing  
✅ All functionality tests successful  
✅ Performance acceptable  
✅ Security verified  
✅ Monitoring in place  
✅ Team trained on system  
✅ Documentation up to date  

---

## Sign-Off

- **Deployed By**: _________________
- **Date**: _________________
- **Verified By**: _________________
- **Date**: _________________
- **Notes**: _________________

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Next Review**: [3 months from deployment]

