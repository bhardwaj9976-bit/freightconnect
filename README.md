# FreightConnect - Transport & Logistics Mobile App

A fully-functional transport and logistics platform connecting shippers with verified truck drivers. Built for reliability, transparency, and scalability.

## 🚀 Features

### Core Functionality
- ✅ User Onboarding (Shippers & Drivers)
- ✅ Real-time GPS Truck Tracking
- ✅ Smart Truck Booking with Search & Filter
- ✅ Transparent Pricing & Fare Estimation
- ✅ Secure Multi-Payment Integration
- ✅ Digital Proof of Delivery (e-POD)
- ✅ Real-time Notifications & SMS Alerts
- ✅ Driver & Shipper Dashboards
- ✅ Admin Management Panel
- ✅ Customer Support Chat

### Advanced Features
- 🌐 Multi-language Support (English + Regional)
- 📡 Offline Mode with Auto-sync
- 📊 Analytics Dashboard
- 🗺️ Optimized Route Planning
- 🔐 End-to-End Encryption
- 📋 GST Invoice & E-way Bill Compliance
- ⭐ Rating & Review System
- 💬 In-app Messaging

## 📋 Tech Stack

### Frontend
- **React Native** - Cross-platform mobile (iOS & Android)
- **Redux** - State management
- **React Navigation** - Navigation
- **Axios** - API client
- **React Native Maps** - GPS & Mapping
- **Material Design** - UI Components

### Backend
- **Node.js + Express** - REST APIs
- **MongoDB** - NoSQL Database
- **Socket.io** - Real-time Communication
- **JWT** - Authentication
- **Multer** - File Upload
- **Razorpay** - Payment Processing
- **Firebase Cloud Messaging** - Push Notifications
- **AWS S3** - Cloud Storage

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **AWS EC2** - Hosting
- **MongoDB Atlas** - Cloud Database

## 📁 Project Structure

```
freightconnect/
├── backend/              # Node.js Backend API
├── mobile/               # React Native Mobile App
├── admin/                # Admin Dashboard
├── docs/                 # Documentation
├── docker-compose.yml    # Docker Setup
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile App Setup
```bash
cd mobile
npm install
npm start
```

### Admin Dashboard
```bash
cd admin
npm install
npm start
```

## 📡 API Documentation

See `docs/API.md` for detailed endpoint documentation.

## 🔐 Security

- JWT-based authentication
- Password encryption (bcrypt)
- HTTPS/TLS for all communications
- PCI DSS compliance for payments
- Data encryption at rest

## 📱 User Flows

### Shipper Flow
1. Sign Up/Login
2. Create Booking Request
3. Browse Available Trucks
4. Select & Confirm
5. Make Payment
6. Track Delivery
7. Receive e-POD
8. Rate Driver

### Driver Flow
1. Sign Up/Verification
2. Complete Profile
3. View Available Bookings
4. Accept Trip
5. Start Navigation
6. Upload Proof of Delivery
7. Receive Payment

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ for transparent logistics**
