# 🎯 Internship Portal - MERN Stack

A full-stack web application for managing internship opportunities, student applications, and job recommendations.

---

## 📋 Project Overview

The Internship Portal is a modern web application built with the MERN stack (MongoDB, Express, React, Node.js) that helps:

- **Students** discover internship opportunities
- **Students** apply for internships and track applications
- **Students** receive AI-powered job recommendations
- **Companies** post internship listings
- **Admins** manage the platform

---

## 🏗️ Project Structure

```
SIHPROJECT/
├── project/                 # React Frontend
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # Auth, Theme context
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # API setup, utilities
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                 # Node.js/Express Backend
    ├── src/
    │   ├── config/         # Database config
    │   ├── models/         # MongoDB schemas
    │   ├── controllers/    # Business logic
    │   ├── routes/         # API routes
    │   ├── middleware/     # Auth, error handling
    │   ├── utils/          # JWT utilities
    │   └── server.js       # Express app
    ├── seed.js             # Database seeding
    ├── package.json
    ├── .env
    └── README.md
```

---

## ✨ Features

### 🎓 For Students
- ✅ Create and manage profile
- ✅ Browse internship listings
- ✅ Apply for internships
- ✅ Track application status
- ✅ Get AI-powered job recommendations
- ✅ Upload resume
- ✅ Set job preferences
- ✅ View PM scheme internships

### 🏢 For Companies
- ✅ Post internship listings
- ✅ View applications
- ✅ Update application status
- ✅ Manage openings

### 🔐 General
- ✅ JWT-based authentication
- ✅ Secure password hashing
- ✅ Role-based access control
- ✅ Dashboard with statistics
- ✅ Responsive design
- ✅ Modern UI with Material-UI

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier available)

### Installation & Running

#### Step 1: Clone & Setup Frontend
```bash
cd project
npm install
npm run dev
```
Frontend will run on: **http://localhost:5173**

#### Step 2: Setup MongoDB Atlas (3 minutes)

**Visit: https://www.mongodb.com/cloud/atlas**

1. Click "Try Free"
2. Sign up and verify email
3. Create a free cluster (select your region)
4. Get connection string from "Connect → Drivers"
5. Copy the connection string

#### Step 3: Setup Backend
```bash
cd backend
npm install
```

Edit `.env` file with your MongoDB connection:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship-portal?retryWrites=true&w=majority
```

Start backend:
```bash
npm run dev
```
Backend will run on: **http://localhost:5001**

#### Step 4: Seed Sample Data (Optional)
```bash
cd backend
node seed.js
```

This adds sample internship listings to your database.

---

## 🔗 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND (React)                    │
│              @localhost:5173/app                     │
│                                                      │
│  - Pages: Jobs, Applications, Profile, Dashboard   │
│  - Components: Forms, Cards, Tables                │
│  - HTTP Client: Axios with JWT auth                │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTP Requests
                  │ (with JWT tokens)
                  ▼
┌─────────────────────────────────────────────────────┐
│                BACKEND (Node.js)                     │
│              @localhost:5001/api                     │
│                                                      │
│  - Routes: Auth, Jobs, Applications, Profiles      │
│  - Controllers: Business logic                      │
│  - Middleware: Authentication, Error handling      │
│  - Models: User, Job, Application, etc.            │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Database Queries
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│             DATABASE (MongoDB Atlas)                 │
│         Cloud-hosted in your chosen region          │
│                                                      │
│  - Collections: users, profiles, jobs, applications│
│  - Automatic backups & scalability                 │
│  - Free tier: 512MB storage, up to 3 clusters     │
└─────────────────────────────────────────────────────┘
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user ⚠️

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job details

### Applications
- `GET /api/applications` - Get my applications ⚠️
- `POST /api/applications` - Apply for job ⚠️
- `PUT /api/applications/:id` - Update status ⚠️

### Profile
- `GET /api/profile` - Get profile ⚠️
- `PUT /api/profile` - Update profile ⚠️
- `POST /api/profile/resume` - Upload resume ⚠️

### Recommendations
- `GET /api/recommendations` - Get recommendations ⚠️

### Dashboard
- `GET /api/dashboard/stats` - Get statistics ⚠️

⚠️ = Requires authentication (Bearer token)

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for full details.

---

## 🔧 Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: React Context + React Query
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Animation**: Framer Motion
- **Form Validation**: React Hook Form + Zod
- **Toast Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Mongoose schemas

### Database
- **Service**: MongoDB Atlas (Cloud)
- **Type**: NoSQL
- **Collections**: Users, Profiles, Jobs, Applications, Recommendations

---

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - 3-step quick start guide
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Detailed API reference
- **[backend/README.md](backend/README.md)** - Backend setup & troubleshooting
- **[backend/MONGODB_ATLAS_SETUP.md](backend/MONGODB_ATLAS_SETUP.md)** - MongoDB Atlas guide

---

## 🧪 Testing

### Postman Collection
Use the endpoints documented in [API_DOCUMENTATION.md](API_DOCUMENTATION.md) to test with:
- **Postman** (download: postman.com)
- **Insomnia** (download: insomnia.rest)
- **cURL** (command line tool)

### Example Test
```bash
# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Jobs
curl http://localhost:5001/api/jobs
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem**: `Error: Could not connect to any servers`

**Solution**:
1. Check MongoDB Atlas connection string in `.env`
2. Whitelist your IP in Network Access
3. Verify username/password are correct
4. Check internet connection

### Port Already in Use
**Problem**: `EADDRINUSE: address already in use :::5001`

**Solution**:
```bash
# Change PORT in .env to 5002
# Or kill the process using the port
# Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### Frontend Can't Connect to Backend
**Problem**: CORS errors, 404 responses

**Solution**:
1. Ensure backend is running on port 5001
2. Check API_BASE_URL in `project/src/lib/api.ts`
3. Verify CORS is enabled in backend (it is by default)

### Need More Help?
- Check [backend/README.md](backend/README.md)
- See [backend/MONGODB_ATLAS_SETUP.md](backend/MONGODB_ATLAS_SETUP.md)
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🔒 Security Considerations

### For Development
- ✅ JWT authentication implemented
- ✅ Passwords hashed with bcryptjs
- ✅ CORS enabled
- ✅ Input validation with Zod

### Before Production
- ⚠️ Change JWT_SECRET in `.env`
- ⚠️ Use HTTPS instead of HTTP
- ⚠️ Set NODE_ENV to 'production'
- ⚠️ Use environment-specific .env files
- ⚠️ Add rate limiting
- ⚠️ Implement CSRF protection
- ⚠️ Add request validation
- ⚠️ Setup HTTPS certificates

---

## 📈 Future Enhancements

- [ ] Email notifications for applications
- [ ] Advanced analytics dashboard
- [ ] Real-time chat support
- [ ] Video interview scheduling
- [ ] Resume parsing and analysis
- [ ] Skill-based matching algorithm
- [ ] Mobile app (React Native)
- [ ] Admin panel with analytics
- [ ] Payment integration for premium listings
- [ ] Social media integration

---

## 📝 Database Schema

### Users
```
{
  _id, name, email, password (hashed),
  phone, avatar, role (student/admin),
  timestamps
}
```

### Profiles
```
{
  _id, userId, fullName, email, phone,
  education[], experience[], skills[],
  resumeUrl, preferences, completeness,
  timestamps
}
```

### Jobs
```
{
  _id, title, company, description, location,
  workMode, domain, requiredSkills[],
  stipend, duration, isPMScheme,
  applicants, openings, isActive,
  timestamps
}
```

### Applications
```
{
  _id, userId, jobId, status,
  coverLetter, appliedAt, timestamps
}
```

### Recommendations
```
{
  _id, userId, jobId, matchScore,
  skillMatch, locationMatch, etc.,
  timestamps
}
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💡 Need Help?

1. **Quick Start Issue?** → See [QUICK_START.md](QUICK_START.md)
2. **API Question?** → See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. **Backend Issue?** → See [backend/README.md](backend/README.md)
4. **MongoDB Issue?** → See [backend/MONGODB_ATLAS_SETUP.md](backend/MONGODB_ATLAS_SETUP.md)
5. **Still stuck?** → Check the troubleshooting section above

---

## 🎉 Ready to Start?

### Quick Commands
```bash
# Terminal 1: Frontend
cd project && npm run dev

# Terminal 2: Backend (after setting up MongoDB)
cd backend && npm run dev

# Then visit: http://localhost:5173
```

**Happy coding! 🚀**

---

*Last Updated: February 22, 2026*
*Version: 1.0.0*
