# Getting Started - Financial CRM & Workflow System

## 🎯 5-Minute Quick Start

### What You Need

- Java 17+ installed
- MySQL 8.0+ running
- Node.js 16+ installed
- Git (to check out code)

### Step 1: Start the Backend (2 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Update database credentials in src/main/resources/application.properties
# Change these lines to match your MySQL setup:
spring.datasource.url=jdbc:mysql://localhost:3306/user_db
spring.datasource.username=root
spring.datasource.password=root

# 3. Start the backend
mvn spring-boot:run

# ✅ You should see: "Started BackendApplication in X seconds"
# Server running at http://localhost:8081
```

### Step 2: Start the Frontend (2 minutes)

```bash
# 1. Open new terminal and navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# ✅ You should see: "VITE v5.x.x ready in X ms"
# App available at http://localhost:5173
```

### Step 3: Access the Application (1 minute)

**Open in your browser:**

- 🌐 CRM Dashboard: http://localhost:5173/dashboard/crm-dashboard
- 📊 Order Details: http://localhost:5173/dashboard/orders/1002
- 📈 Analytics: http://localhost:5173/dashboard/workflow-analytics
- 👥 Leads: http://localhost:5173/dashboard/leads

**That's it!** You now have the full system running locally. ✨

---

## 📖 Understanding the System

### The 9-Stage Workflow

Every order goes through these stages:

```
1. WEB 🌐      → Customer submits request online
2. CRM 📋      → Lead is scored and routed to sales
3. SALES 💳    → Payment processed, contract signed
4. ONBD 📄     → Documents uploaded and verified
5. CASE 👤     → Expert assigned, case created
6. EXEC ⚙️     → Service executed (registration, filing, etc.)
7. GOVT 🏛️     → Government portals and integrations
8. QA ✅       → Quality review and compliance check
9. DEL 📦      → Deliverables sent, invoice generated
```

### What Happens When Things Go Wrong?

If there's an issue, the system creates an **Exception**:

- **PF** (Payment Failure) → Retry payment with customer
- **MD** (Missing Documents) → Request missing documents
- **GO** (Government Objection) → Appeal/resubmit to govt
- **SLAB** (SLA Breach) → Escalate due to deadline risk
- **CR** (Cancellation) → Process refund and closure

---

## 🗺️ Key Pages Overview

### 1. CRM Dashboard (`/dashboard/crm-dashboard`)

**What you see:**

- Summary stats (active leads, pending tasks, revenue)
- 9-stage timeline showing current progress
- Active leads pipeline
- Exception alerts

**What you can do:**

- View overall status at a glance
- See bottlenecks in workflow
- Monitor exception alerts
- Track team performance

**Sample data:** Order #1002 (GST Registration in Onboarding stage)

### 2. Order Detail Page (`/dashboard/orders/1002`)

**What you see:**

- Complete order information
- Full workflow timeline with all events
- Progress percentage
- Stage-wise status

**What you can do:**

- View complete history
- Advance to next stage
- Mark stage as complete
- See active exceptions
- View quick info (assigned to, created date, etc.)

### 3. Workflow Analytics (`/dashboard/workflow-analytics`)

**What you see:**

- Completed stages count
- In-progress count
- Failed and blocked stages
- Success rate by stage
- Exception frequency

**What you can do:**

- Identify problem stages
- See trends over time
- Find optimization opportunities
- Track team performance

### 4. Lead Management (`/dashboard/leads`)

**What you see:**

- All leads in pipeline
- Lead details (name, email, phone, company)
- Service interest
- Estimated value
- Status and priority

**What you can do:**

- Filter by status, priority, service
- View lead details
- Convert lead to order
- Track conversion rates

---

## 🔧 Common Tasks

### Create a New Order

```bash
# Use the API to create an order
curl -X POST http://localhost:8081/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": 123,
    "serviceType": "COMPANY_REGISTRATION",
    "value": 9999
  }'

# Response:
{
  "id": 1003,
  "leadId": 123,
  "serviceType": "COMPANY_REGISTRATION",
  "status": "created",
  "createdAt": "2024-01-15T10:30:00"
}
```

### View Workflow Progress

```bash
curl http://localhost:8081/api/workflow/orders/1003/progress

# Response shows:
# - currentStage: "WEB"
# - completionPercentage: 11%
# - stages: [detailed stage info]
# - exceptions: [any active exceptions]
```

### Advance to Next Stage

```bash
curl -X POST http://localhost:8081/api/workflow/orders/1003/advance \
  -H "Content-Type: application/json" \
  -d '{
    "nextStage": "CRM",
    "description": "Lead routed to sales team"
  }'
```

### Log an Exception

```bash
curl -X POST http://localhost:8081/api/workflow/orders/1003/exception \
  -H "Content-Type: application/json" \
  -d '{
    "exceptionType": "PF",
    "description": "Payment failed - customer card declined",
    "details": "Customer will retry with different card tomorrow"
  }'
```

### Complete a Stage

```bash
curl -X POST http://localhost:8081/api/workflow/orders/1003/complete \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "ONBD",
    "description": "All documents verified and uploaded successfully"
  }'
```

---

## 📊 Sample Data Explanation

The system comes with **Order #1002** (GST Registration):

**Current State:**

- Status: In Onboarding stage
- Progress: 45% complete
- Value: ₹4,999
- Assigned to: Employee A

**Timeline:**

1. ✅ WEB - Lead captured from website
2. ✅ CRM - Lead scored (85/100) and routed
3. ✅ SALES - Payment received
4. 🔄 ONBD - Documents being verified (CURRENT)
5. ⏳ CASE - Waiting (not started)
6. ⏳ EXEC - Waiting
7. ⏳ GOVT - Waiting
8. ⏳ QA - Waiting
9. ⏳ DEL - Waiting

**Active Alert:**

- Type: Missing Document
- Message: Aadhar proof pending
- Status: Blocked until documents received

---

## 🎨 UI Components Explained

### Progress Bar

Shows overall completion (0-100%). Updates as stages complete.

### Timeline Circles

- 🟢 Green = Completed
- 🔵 Blue = In Progress (with pulse animation)
- ⚪ Gray = Pending
- 🔴 Red = Failed
- 🟡 Yellow = Blocked

### Stage Cards

Click on a stage to see:

- Detailed description
- What happens in this stage
- Current status
- Events and notes

### Exception Alerts

Color-coded by type:

- 🔴 Red = Critical (Payment, Failure)
- 🟠 Orange = Document related
- 🟡 Yellow = SLA/Risk
- 🟣 Purple = Cancellation

---

## 🔌 API Quick Reference

### Most Commonly Used Endpoints

```bash
# Get workflow progress
GET /api/workflow/orders/{orderId}/progress

# Get all events for an order
GET /api/workflow/orders/{orderId}/timeline

# Create new workflow event
POST /api/workflow/orders/{orderId}/event
{
  "stage": "SALES",
  "status": "COMPLETED",
  "description": "Payment received",
  "details": "Amount: ₹4999"
}

# Get current stage
GET /api/workflow/orders/{orderId}/current-stage

# Get dashboard statistics
GET /api/workflow/analytics/dashboard-stats

# Get stage performance
GET /api/workflow/analytics/stage-stats

# Get exception statistics
GET /api/workflow/analytics/exception-stats

# Get active alerts for order
GET /api/workflow/alerts/orders/{orderId}/unresolved

# Create alert
POST /api/workflow/alerts
{
  "orderId": 1003,
  "alertType": "PAYMENT_FAILED",
  "title": "Payment Failed",
  "message": "Customer's payment was declined"
}

# Resolve alert
PUT /api/workflow/alerts/{alertId}/resolve
{
  "resolvedBy": "john_doe"
}
```

---

## 💾 Database Essentials

### Tables Created

**workflow_events** - Tracks all workflow transitions

```sql
- id: Event ID
- order_id: Which order
- stage: Which stage (WEB, CRM, SALES, etc.)
- status: Event status (PENDING, IN_PROGRESS, COMPLETED, FAILED)
- description: What happened
- created_at: When it happened
```

**workflow_alerts** - Tracks notifications and issues

```sql
- id: Alert ID
- order_id: Which order
- alert_type: Type of alert
- title: Alert title
- message: Alert details
- resolved: Is it resolved?
- created_at: When created
- resolved_at: When resolved
```

**orders** - Order information (extended)

```sql
- id: Order ID
- leadId: Which lead
- serviceType: What service
- status: Current status
- workflow_status: Current stage
- value: Order value
- assigned_employee: Who's handling it
```

---

## 🚀 Next Steps After Setup

### 1. Explore the Sample Data (5 mins)

- Go to CRM Dashboard
- Click on Order #1002
- See the complete workflow
- Review the exception alert

### 2. Create Test Orders (5 mins)

- Use the API or UI to create orders
- Track them through stages
- Log exceptions
- Mark stages complete

### 3. Monitor Analytics (5 mins)

- Go to Workflow Analytics
- See performance metrics
- Identify trends
- Find optimization opportunities

### 4. Customize for Your Use Case (varies)

- Update stage names if needed
- Add custom fields
- Integrate with your systems
- Configure notifications

### 5. Deploy to Production (varies)

- Follow DEPLOYMENT_CHECKLIST.md
- Set up monitoring
- Configure backups
- Train your team

---

## 🔍 Troubleshooting

### "Cannot connect to database"

```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"

# Check application.properties
cat backend/src/main/resources/application.properties | grep datasource
```

### "Port already in use"

```bash
# Check what's using port 8081
lsof -i :8081

# Or use different port
# Edit application.properties: server.port=8082
```

### "API not responding"

```bash
# Check backend is running
curl http://localhost:8081/actuator/health

# Check frontend can reach backend
# Open DevTools (F12) → Network tab
# Look for failed requests to /api/*
```

### "Database tables missing"

```bash
# Import schema
mysql -u root -p user_db < backend/src/main/resources/schema.sql

# Verify tables
mysql -u root -p user_db -e "SHOW TABLES;"
```

---

## 📱 Using the API

### With cURL

```bash
# Get workflow progress
curl -X GET http://localhost:8081/api/workflow/orders/1002/progress \
  -H "Accept: application/json"

# Create event (with data)
curl -X POST http://localhost:8081/api/workflow/orders/1002/event \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "CRM",
    "status": "IN_PROGRESS",
    "description": "Lead being evaluated"
  }'
```

### With Postman

1. Install Postman
2. Create new request
3. Method: GET/POST
4. URL: http://localhost:8081/api/workflow/...
5. Headers: Content-Type: application/json
6. Body: JSON data (for POST)
7. Send!

### With JavaScript/React

```javascript
// Fetch workflow progress
const response = await fetch(
  "http://localhost:8081/api/workflow/orders/1002/progress",
);
const data = await response.json();
console.log(data);

// Create workflow event
const response = await fetch(
  "http://localhost:8081/api/workflow/orders/1002/event",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stage: "SALES",
      status: "COMPLETED",
      description: "Payment processed",
    }),
  },
);
const data = await response.json();
console.log(data);
```

---

## 📚 Documentation References

| Document                      | Use This When                       |
| ----------------------------- | ----------------------------------- |
| **GETTING_STARTED.md**        | Setting up and learning the basics  |
| **IMPLEMENTATION_GUIDE.md**   | Understanding architecture & design |
| **SETUP_INSTRUCTIONS.md**     | Deploying to production             |
| **PROJECT_SUMMARY.md**        | Need complete feature overview      |
| **DEPLOYMENT_CHECKLIST.md**   | Verifying production readiness      |
| **FINAL_DELIVERY_SUMMARY.md** | Understanding what was delivered    |

---

## 💡 Tips & Tricks

### Speed Up Development

```bash
# Use nodemon to auto-restart on changes
npm install -g nodemon
nodemon --exec npm run dev
```

### Debug API Calls

```javascript
// Add to frontend/src/lib/api.js
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);
```

### Monitor Database

```bash
# Watch database changes in real-time
watch -n 1 'mysql -u root -p user_db -e "SELECT COUNT(*) FROM workflow_events;"'
```

### Test API Endpoints

```bash
# Create script: test-api.sh
#!/bin/bash
BASE_URL="http://localhost:8081"

echo "Testing API endpoints..."
curl -s $BASE_URL/api/workflow/stages | jq .
curl -s $BASE_URL/api/workflow/orders/1002/progress | jq .
curl -s $BASE_URL/api/workflow/analytics/dashboard-stats | jq .
echo "All tests completed!"
```

---

## 🎓 Learning Path

### Beginner (Week 1)

- [ ] Set up the system locally
- [ ] Explore the CRM Dashboard
- [ ] View Order #1002 details
- [ ] Read IMPLEMENTATION_GUIDE.md
- [ ] Create test orders via API

### Intermediate (Week 2-3)

- [ ] Understand workflow stages
- [ ] Log events and exceptions
- [ ] View analytics
- [ ] Integrate with your system
- [ ] Deploy to staging

### Advanced (Week 4+)

- [ ] Customize workflows
- [ ] Add new stages
- [ ] Integrate external systems
- [ ] Set up webhooks
- [ ] Deploy to production

---

## 📞 Getting Help

### For Setup Issues

→ See SETUP_INSTRUCTIONS.md

### For Architecture Questions

→ See IMPLEMENTATION_GUIDE.md

### For Deployment Help

→ See DEPLOYMENT_CHECKLIST.md

### For Feature Overview

→ See PROJECT_SUMMARY.md

### For API Details

→ See IMPLEMENTATION_GUIDE.md (API Flow Examples section)

---

## ✨ Quick Wins

Try these to see the system in action:

1. **View the Timeline**
   - Go to CRM Dashboard
   - See the 9-stage pipeline
   - Note the progress bar

2. **Check the Alert**
   - View Order #1002
   - See the active exception
   - Try resolving it

3. **Create an Order**
   - Use the API endpoint
   - Track it on the dashboard
   - Advance through stages

4. **View Analytics**
   - Go to Workflow Analytics
   - See performance metrics
   - Identify patterns

5. **Add an Exception**
   - Create a payment failure event
   - See it appear as alert
   - Resolve the exception

---

## 🎉 You're Ready!

You now have a **production-ready financial CRM system** with:

✅ Complete 9-stage workflow  
✅ Exception handling  
✅ Real-time tracking  
✅ Analytics & reports  
✅ Modern web interface

**Start exploring and building!** 🚀

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Ready for Production
