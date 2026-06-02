## Backend Setup Guide

### Prerequisites
- Node.js 16+ installed
- MongoDB locally or MongoDB Atlas account
- Git

### Installation

1. **Clone and navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

4. **Edit .env file** with your configuration
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

### API Testing

Use Postman or cURL to test endpoints:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123",
    "role": "shipper"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Database Setup

MongoDB collections are auto-created on first use. Ensure indexes are created:

```bash
# In MongoDB shell
use freightconnect
db.users.createIndex({ email: 1 })
db.users.createIndex({ phone: 1 })
db.bookings.createIndex({ bookingId: 1 })
db.trucks.createIndex({ registrationNumber: 1 })
```

### Docker Setup

**Build and run with Docker:**
```bash
docker-compose up -d
```

This will start MongoDB and the backend API in containers.

### Troubleshooting

**MongoDB connection error:**
- Check MONGODB_URI in .env
- Ensure MongoDB is running
- Verify network access if using MongoDB Atlas

**Port already in use:**
```bash
# Change PORT in .env or kill process
lsof -i :5000
kill -9 <PID>
```

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```
