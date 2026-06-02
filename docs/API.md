# FreightConnect Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication (/auth)
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout
- `POST /auth/update-password` - Change password

### Bookings (/bookings)
- `POST /bookings/create` - Create new booking
- `GET /bookings/trucks` - Get available trucks
- `GET /bookings/my-bookings` - Get user bookings
- `GET /bookings/:bookingId` - Get booking details
- `POST /bookings/:bookingId/accept` - Accept booking (driver)
- `POST /bookings/:bookingId/cancel` - Cancel booking
- `POST /bookings/:bookingId/proof-of-delivery` - Upload e-POD
- `POST /bookings/:bookingId/rate` - Rate booking

### Payments (/payments)
- `POST /payments/initiate` - Start payment process
- `POST /payments/verify` - Verify payment
- `GET /payments/history` - Get payment history
- `GET /payments/:transactionId` - Get payment details
- `POST /payments/refund` - Request refund

### Users (/users)
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update profile
- `GET /users/trips` - Get user trips
- `GET /users/wallet` - Get wallet balance

### Trucks (/trucks)
- `POST /trucks/add` - Add new truck
- `GET /trucks/my-trucks` - Get user trucks
- `GET /trucks/:truckId` - Get truck details
- `PUT /trucks/:truckId` - Update truck

### Tracking (/tracking)
- `GET /tracking/:bookingId` - Get current location
- `POST /tracking/update` - Update location

### Admin (/admin)
- `GET /admin/users` - Get all users
- `GET /admin/bookings` - Get all bookings
- `GET /admin/payments` - Get all payments
- `GET /admin/analytics` - Get analytics

### Analytics (/analytics)
- `GET /analytics/dashboard` - Dashboard data
- `GET /analytics/trips` - Trip analytics
- `GET /analytics/revenue` - Revenue data
- `GET /analytics/utilization` - Truck utilization

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}
}
```

## Error Codes
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Server Error

## Rate Limiting
- Standard: 100 requests/15 minutes
- Admin: 1000 requests/15 minutes
