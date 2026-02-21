# Quick Start - Backend Setup (3 Steps)

## Status: ✅ Backend Server Running on http://localhost:5001

Your backend is currently running but needs MongoDB connection configured.

---

## Step 1: Create Free MongoDB Atlas Account (2 minutes)

### Visit: https://www.mongodb.com/cloud/atlas

1. Click **"Try Free"**
2. Sign up with your email
3. Verify email

---

## Step 2: Create Your Free Cluster (Automated, ~2 minutes)

1. After login, click **"Create a Deployment"**
2. Choose **"Shared"** (Free tier - always free)
3. Select your region (e.g., Singapore, India region recommended)
4. Click **"Create Deployment"**

---

## Step 3: Get Connection String & Update .env

### In MongoDB Atlas Dashboard:

1. Wait for cluster to be ready (status says "Active")
2. Click **"Connect"** button
3. Select **"Drivers"** (2nd option)
4. Choose **"Node.js"** version 5.9 or later
5. **COPY** the connection string

### Example (REPLACE values with yours):
```
mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/internship-portal?retryWrites=true&w=majority
```

### Update Your `.env` File:

Edit: `backend/.env`

Replace this line:
```
MONGODB_URI=mongodb+srv://7416poornima_db_user:IYQkf5B5gUy8sh2...
```

With your actual connection string:
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/internship-portal?retryWrites=true&w=majority
```

---

## Step 4: Also Set Database User & IP Whitelist

### CREATE DATABASE USER (In MongoDB Atlas):

1. Left sidebar → **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"**
4. Username: `developer` (or your choice)
5. Password: Create strong password (e.g., `Secure@Pass123`)
6. Click **"Add User"**

### WHITELIST YOUR IP:

1. Left sidebar → **"Network Access"**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** for development
4. Click **"Confirm"**

---

## Step 5: Restart Backend Server

Kill the terminal running backend and restart:

```bash
cd backend
npm run dev
```

You should now see:
```
✓ MongoDB Connected: cluster0-xxxxx.mongodb.net
Server is running on port 5001
```

---

## Test Backend & Frontend Together

### Terminal 1 (Backend - Already Running):
```bash
cd backend
npm run dev
# Should show: Server is running on port 5001
```

### Terminal 2 (Frontend):
```bash
cd project
npm run dev
# Should show: Local: http://localhost:5173/
```

### Then Open: http://localhost:5173/

Both should work together now!

---

## Quick MongoDB Atlas Tips

| Issue | Solution |
|-------|----------|
| **Can't login** | Check email verification |
| **Cluster not creating** | Try different region |
| **Connection error** | Whitelist your IP address |
| **Auth failed** | Check username/password in connection string |
| **"Too many connections"** | Increase max connections in cluster settings |

---

## API Testing (After MongoDB Connected)

### Test User Registration:
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

Expected response:
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  },
  "token": "eyJhbGc..."
}
```

### Test Jobs List:
```bash
curl http://localhost:5001/api/jobs
```

---

## Backend Architecture

```
Frontend (Port 5173)
        ↓
API Calls (localhost:5001)
        ↓
Backend Server (Express.js)
        ↓
MongoDB (Cloud - MongoDB Atlas)
```

---

## Current Status

✅ Backend Server: Listening on port 5001
⏳ MongoDB: Waiting for your connection string
✅ Frontend: Running on port 5173 (when you start it)

---

## What's Next?

1. Follow MongoDB Atlas setup above
2. Update .env with connection string
3. Restart backend (`npm run dev`)
4. Start frontend (new terminal: `npm run dev` in `project/` folder)
5. Visit http://localhost:5173 and start using the app!

---

Need help? See:
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Express Setup: https://expressjs.com/
- Connection issues: Check MONGODB_ATLAS_SETUP.md

Enjoy! 🚀
