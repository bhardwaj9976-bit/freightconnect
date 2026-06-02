# Installation & Quick Start

## Prerequisites
- Node.js 16+
- MongoDB Atlas account or local MongoDB
- Git

## Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/bhardwaj9976-bit/freightconnect.git
cd freightconnect
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Mobile App Setup
```bash
cd ../mobile
npm install
npm start
```

### 4. Admin Dashboard Setup
```bash
cd ../admin
npm install
npm start
```

Admin runs on `http://localhost:3000`

## Features Implemented

### ✅ Core Features
- User authentication (JWT-based)
- Shipper & Driver onboarding
- Truck booking system
- Real-time GPS tracking (WebSocket)
- Payment integration (Razorpay ready)
- Digital Proof of Delivery
- Rating & Review system
- Booking cancellation with refunds

### ✅ Backend APIs
- 40+ REST endpoints
- Full CRUD operations
- Real-time WebSocket support
- Error handling middleware
- Input validation
- MongoDB integration

### ✅ Database Models
- User (with document verification)
- Booking (complete lifecycle)
- Truck (with maintenance tracking)
- Payment (with refund support)
- Message (for support chat)

### ✅ Security
- Password hashing (bcrypt)
- JWT authentication
- Input validation
- CORS protection
- Helmet security headers

## API Testing

### Register User
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

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pickupLocation": {"address": "Mumbai", "lat": 19.0760, "lng": 72.8777},
    "dropoffLocation": {"address": "Pune", "lat": 18.5204, "lng": 73.8567},
    "pickupDate": "2026-06-10",
    "cargoDetails": {"description": "Electronics", "weight": 500, "category": "general"},
    "paymentMethod": "upi"
  }'
```

## Project Structure
```
freightconnect/
├── backend/              # Node.js API
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & validation
│   │   └── index.js      # Server entry point
│   ├── package.json
│   └── Dockerfile
├── mobile/               # React Native App
├── admin/                # Admin Dashboard
├── docs/                 # Documentation
└── docker-compose.yml    # Docker setup
```

## Next Steps

1. **Configure Payments**
   - Sign up for Razorpay
   - Add API keys to .env

2. **Setup Maps Integration**
   - Get Google Maps API key
   - Add to .env

3. **Firebase Notifications**
   - Create Firebase project
   - Add credentials to .env

4. **Deploy**
   - Backend to AWS/Heroku
   - Mobile app to App Store/Play Store
   - Admin dashboard to hosting service

## Support

For issues, check:
- `docs/API.md` - API documentation
- `docs/BACKEND_SETUP.md` - Detailed setup guide
- GitHub Issues - Report bugs

## License

MIT
