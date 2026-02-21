# API Documentation - Internship Portal

## Base URL
```
http://localhost:5001/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📝 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

Response (201):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "student",
    "createdAt": "2026-02-22T10:00:00.000Z",
    "updatedAt": "2026-02-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2026-02-22T10:00:00.000Z",
    "updatedAt": "2026-02-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Get Current User
**GET** `/auth/me` ⚠️ Protected

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "student",
  "createdAt": "2026-02-22T10:00:00.000Z",
  "updatedAt": "2026-02-22T10:00:00.000Z"
}
```

---

## 💼 Jobs Endpoints

### 1. Get All Jobs
**GET** `/jobs`

Query Parameters:
```
search=intern          # Search in title, company, description
location=Bangalore     # Filter by location
workMode=remote        # Filter by work mode (remote/onsite/hybrid)
domain=backend         # Filter by domain
isPMScheme=true        # Filter by PM scheme
page=1                 # Pagination page
limit=10               # Items per page
```

Example:
```
GET /jobs?search=frontend&workMode=remote&page=1&limit=10
```

Response (200):
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Frontend Developer Intern",
      "company": "Tech Startup",
      "description": "We are looking for...",
      "location": "Bangalore",
      "workMode": "remote",
      "domain": "Web Development",
      "requiredSkills": ["React", "JavaScript", "CSS"],
      "preferredSkills": ["TypeScript"],
      "stipend": 15000,
      "duration": "3 months",
      "startDate": "2026-03-01T00:00:00.000Z",
      "applicationDeadline": "2026-02-28T00:00:00.000Z",
      "openings": 3,
      "applicants": 5,
      "isPMScheme": false,
      "isActive": true,
      "createdAt": "2026-02-22T10:00:00.000Z",
      "updatedAt": "2026-02-22T10:00:00.000Z"
    }
  ],
  "total": 23,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

---

### 2. Get Job Details
**GET** `/jobs/:id`

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Frontend Developer Intern",
  "company": "Tech Startup",
  "description": "We are looking for...",
  "location": "Bangalore",
  "workMode": "remote",
  "domain": "Web Development",
  "requiredSkills": ["React", "JavaScript", "CSS"],
  "preferredSkills": ["TypeScript"],
  "stipend": 15000,
  "duration": "3 months",
  "startDate": "2026-03-01T00:00:00.000Z",
  "applicationDeadline": "2026-02-28T00:00:00.000Z",
  "openings": 3,
  "applicants": 5,
  "isPMScheme": false,
  "isActive": true,
  "createdAt": "2026-02-22T10:00:00.000Z",
  "updatedAt": "2026-02-22T10:00:00.000Z"
}
```

---

## 📋 Applications Endpoints

### 1. Get My Applications
**GET** `/applications` ⚠️ Protected

Response (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "jobId": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Frontend Developer Intern",
      "company": "Tech Startup"
    },
    "status": "pending",
    "coverLetter": "I am excited about this opportunity...",
    "appliedAt": "2026-02-22T10:15:00.000Z",
    "updatedAt": "2026-02-22T10:15:00.000Z"
  }
]
```

---

### 2. Apply for Job
**POST** `/applications` ⚠️ Protected

Request:
```json
{
  "jobId": "507f1f77bcf86cd799439012",
  "coverLetter": "I am excited about this opportunity..."
}
```

Response (201):
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "jobId": "507f1f77bcf86cd799439012",
  "status": "pending",
  "coverLetter": "I am excited about this opportunity...",
  "appliedAt": "2026-02-22T10:15:00.000Z",
  "updatedAt": "2026-02-22T10:15:00.000Z"
}
```

---

### 3. Get Application Details
**GET** `/applications/:id` ⚠️ Protected

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "jobId": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Frontend Developer Intern",
    "company": "Tech Startup"
  },
  "status": "pending",
  "coverLetter": "I am excited about this opportunity...",
  "appliedAt": "2026-02-22T10:15:00.000Z",
  "updatedAt": "2026-02-22T10:15:00.000Z"
}
```

---

### 4. Update Application Status
**PUT** `/applications/:id` ⚠️ Protected

Request:
```json
{
  "status": "shortlisted"
}
```

Valid statuses: `pending`, `under_review`, `shortlisted`, `rejected`, `accepted`

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "status": "shortlisted",
  "updatedAt": "2026-02-22T11:00:00.000Z"
}
```

---

## 👤 Profile Endpoints

### 1. Get Profile
**GET** `/profile` ⚠️ Protected

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "skills": ["React", "JavaScript", "Node.js"],
  "education": [
    {
      "institution": "University Name",
      "degree": "B.Tech",
      "field": "Computer Science",
      "startDate": "2022-07-01T00:00:00.000Z",
      "endDate": "2026-05-31T00:00:00.000Z",
      "cgpa": 8.5,
      "current": true
    }
  ],
  "experience": [],
  "resumeUrl": "/uploads/resume.pdf",
  "preferences": {
    "preferredLocations": ["Bangalore", "Mumbai"],
    "preferredDomains": ["Web Development"],
    "workMode": ["remote", "hybrid"],
    "expectedStipend": 20000
  },
  "completeness": 75,
  "createdAt": "2026-02-22T10:00:00.000Z",
  "updatedAt": "2026-02-22T10:00:00.000Z"
}
```

---

### 2. Update Profile
**PUT** `/profile` ⚠️ Protected

Request:
```json
{
  "fullName": "John Doe",
  "phone": "9876543210",
  "skills": ["React", "JavaScript", "Node.js", "MongoDB"],
  "preferences": {
    "preferredLocations": ["Bangalore"],
    "preferredDomains": ["Web Development", "Full Stack"],
    "workMode": ["remote", "hybrid"],
    "expectedStipend": 25000
  }
}
```

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "fullName": "John Doe",
  "skills": ["React", "JavaScript", "Node.js", "MongoDB"],
  "completeness": 85,
  "updatedAt": "2026-02-22T11:00:00.000Z"
}
```

---

### 3. Upload Resume
**POST** `/profile/resume` ⚠️ Protected

Request: File upload (multipart/form-data)

Response (200):
```json
{
  "url": "/uploads/resume_507f1f77bcf86cd799439011.pdf",
  "message": "Resume uploaded successfully"
}
```

---

## 🎯 Recommendations Endpoints

### Get Recommendations
**GET** `/recommendations` ⚠️ Protected

Query Parameters:
```
limit=10    # Number of recommendations
```

Response (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "jobId": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Frontend Developer Intern",
      "company": "Tech Startup"
    },
    "userId": "507f1f77bcf86cd799439011",
    "matchScore": 85,
    "skillMatch": {
      "matchedSkills": ["React", "JavaScript"],
      "missingSkills": ["TypeScript"],
      "matchPercentage": 67
    },
    "locationMatch": true,
    "workModeMatch": true,
    "domainMatch": true,
    "analysis": "Great match for your profile!",
    "strengths": ["Strong in React, JavaScript", "Location matches your preferences"],
    "gaps": ["Missing skills: TypeScript"],
    "suggestions": ["Consider learning TypeScript"],
    "createdAt": "2026-02-22T10:00:00.000Z"
  }
]
```

---

## 📊 Dashboard Endpoints

### Get Dashboard Statistics
**GET** `/dashboard/stats` ⚠️ Protected

Response (200):
```json
{
  "profileCompleteness": 75,
  "totalApplications": 5,
  "recommendationsCount": 12,
  "pendingApplications": 2,
  "shortlistedApplications": 1
}
```

---

## ❌ Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthorized - No token provided"
}
```

### 422 Validation Error
```json
{
  "message": "Validation error",
  "errors": {
    "email": ["Email is required"]
  }
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error. Please try again later."
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "secure123",
    "phone": "9999999999"
  }'
```

### Get Jobs
```bash
curl http://localhost:5001/api/jobs?search=developer&limit=5
```

### Get My Applications (with token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5001/api/applications
```

---

## 📱 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 422 | Validation Error - Data validation failed |
| 500 | Server Error - Backend error |

