# MERN Internship Portal - Backend Setup Guide

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Profile.js         # Profile schema
│   │   ├── Job.js             # Job listings
│   │   ├── Application.js     # Job applications
│   │   └── Recommendation.js  # Job recommendations
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   ├── profileController.js
│   │   ├── recommendationController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/
│   │   └── auth.js            # Authentication and error handling
│   ├── utils/
│   │   └── jwt.js             # JWT utilities
│   └── server.js              # Express app setup
├── seed.js                     # Database seeding script
├── package.json
├── .env                        # Environment variables
└── README.md
```

## Prerequisites

### Option 1: MongoDB Atlas (Recommended - Cloud Database)

1. **Create MongoDB Atlas Account**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new project and cluster

2. **Get Connection String**:
   - In Atlas dashboard, click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - It will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/internship-portal?retryWrites=true&w=majority`

3. **Update `.env` file**:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/internship-portal?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB Installation

1. **Download MongoDB Community Edition**:
   - Visit https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Run the installer and follow the steps

2. **Start MongoDB**:
   ```powershell
   # Open Services and search for MongoDB
   # Or run from command line
   mongod
   ```

3. **Update `.env` file**:
   ```
   MONGODB_URI=mongodb://localhost:27017/internship-portal
   ```

## Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your MongoDB connection string:

```
# MongoDB Connection String
MONGODB_URI=your_mongodb_uri_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Server Configuration
PORT=5001
NODE_ENV=development
```

### 3. Start the Backend Server

```bash
npm run dev
```

The server should start on `http://localhost:5001`

After starting, you should see:
```
MongoDB Connected: your-cluster
Server is running on port 5001
```

### 4. Seed Sample Data (Optional)

In a new terminal:

```bash
cd backend
node seed.js
```

This will populate the database with sample internship positions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Jobs
- `GET /api/jobs` - Get all jobs (supports filtering & search)
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)

### Applications
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id` - Update application status

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/resume` - Upload resume

### Recommendations
- `GET /api/recommendations` - Get job recommendations

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Frontend Integration

The frontend is already configured to connect to `http://localhost:5001`. 

### Make sure both services are running:

1. **Backend**: `npm run dev` in the `backend/` folder (runs on port 5001)
2. **Frontend**: `npm run dev` in the `project/` folder (runs on port 5173)

## Testing the API

### Using Postman or cURL

#### 1. Register a User
```bash
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

#### 2. Login
```bash
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Get Jobs
```bash
GET http://localhost:5001/api/jobs?search=intern
```

#### 4. Apply for Job
```bash
POST http://localhost:5001/api/applications
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "jobId": "job_id_from_get_jobs",
  "coverLetter": "I am interested in this position..."
}
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure Firewall allows MongoDB access (for Atlas)

### Port Already in Use
- Change `PORT` in `.env` to another port (e.g., 5002)
- Or kill the process using port 5001

### CORS Errors
- Frontend and backend CORS are configured
- Ensure API_BASE_URL in frontend matches backend PORT

## Important Notes

1. **JWT Secret**: Change the JWT_SECRET in production!
2. **Database Backups**: Regularly backup your MongoDB data
3. **Sensitive Data**: Never commit `.env` file to git
4. **Authentication**: All protected routes require Bearer token in Authorization header

## Next Steps

1. Set up MongoDB connection
2. Update `.env` with your credentials
3. Start the backend: `npm run dev`
4. Test endpoints using Postman or cURL
5. Frontend will automatically connect when both services are running

## Support

For issues or questions, check:
- MongoDB documentation: https://docs.mongodb.com
- Express.js guide: https://expressjs.com/
- JWT explanation: https://jwt.io/introduction
