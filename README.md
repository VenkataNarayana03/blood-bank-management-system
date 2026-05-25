# Blood Bank Management System

A comprehensive full-stack web application for managing blood donations, requests, and inventory. This system facilitates blood donation management for donors, recipients, and administrators with real-time tracking and inventory management.

## Features

### For Donors
- Register and manage donor profiles
- Check eligibility criteria for blood donation
- Schedule and track donation appointments
- View donation history

### For Recipients
- Register and request blood
- Track request status in real-time
- Emergency blood request functionality

### For Administrators
- Comprehensive dashboard for system management
- Manage blood inventory levels
- Process and approve blood requests
- User management 

## Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript** - Core web technologies
- **Responsive Design** - Mobile-friendly interface

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB (Atlas)** - Cloud database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **nodemon** - Development server
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Project Structure

```
blood bank system/
├── client/                 # Frontend files
│   ├── index.html          # Landing page
│   ├── login.html          # User login
│   ├── register.html       # User registration
│   ├── dashboard.html      # User dashboard
│   ├── donate.html         # Donation form
│   ├── request.html        # Blood request form
│   ├── inventory.html      # Blood inventory view
│   ├── adminlogin.html     # Admin login
│   ├── admindashboard.html # Admin dashboard
│   ├── styles.css          # Global styles
│   └── js/                 # JavaScript files
└── server/                 # Backend files
    ├── server.js           # Main server file
    ├── controllers/        # Route controllers
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    ├── package.json        # Dependencies
    └── .env                # Environment variables
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone <https://github.com/VenkataNarayana03/blood-bank-management-system>
cd "blood bank system/server"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:
```bash
# For development
npm run dev

# For production
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd ../client
```

2. Open `index.html` in your browser or serve with a web server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Donor Management
- `GET /api/donors/profile` - Get donor profile
- `PUT /api/donors/profile` - Update donor profile
- `POST /api/donors/donate` - Submit donation

### Blood Requests
- `POST /api/requests` - Create blood request
- `GET /api/requests` - Get all requests
- `PUT /api/requests/:id` - Update request status

### Inventory
- `GET /api/inventory` - Get blood inventory
- `PUT /api/inventory` - Update inventory levels

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  role: String, // 'donor', 'recipient', 'admin'
  bloodType: String,
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Donations Collection
```javascript
{
  _id: ObjectId,
  donorId: ObjectId,
  bloodType: String,
  donationDate: Date,
  quantity: Number,
  status: String,
  createdAt: Date
}
```

### Requests Collection
```javascript
{
  _id: ObjectId,
  recipientId: ObjectId,
  bloodType: String,
  quantity: Number,
  urgency: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Frontend Deployment
The frontend can be deployed on any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Backend Deployment
The backend is currently configured for deployment on:
- **Render** - Recommended for Node.js applications
- Heroku
- AWS EC2
- DigitalOcean

## Environment Variables

Create a `.env` file in the server directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloodbank

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=5000

# CORS Origin
FRONTEND_URL=https://blood-bank-management-system-1-o3z8.onrender.com
```

