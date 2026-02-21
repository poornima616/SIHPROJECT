# MongoDB Atlas Quick Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with your email or Google account
4. Verify your email

## Step 2: Create a Free Cluster

1. After login, click "Create a Deployment"
2. Select **Shared** (Free tier)
3. Choose your preferred region (or keep default)
4. Click "Create Deployment"
5. Wait for cluster to be created (2-3 minutes)

## Step 3: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" for authentication
4. Enter username: `developer`
5. Enter password: Create a strong password (e.g., `Dev@2026Secure123`)
6. Click "Add User"

## Step 4: Setup Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Databases"
2. Click "Connect" button on your cluster
3. Select "Drivers"
4. Choose "Node.js" and version "5.9 or later"
5. Copy the connection string
6. It will look like:
   ```
   mongodb+srv://developer:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

Replace `<password>` with your actual password and update `.env`:

```
MONGODB_URI=mongodb+srv://developer:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/internship-portal?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
PORT=5001
NODE_ENV=development
```

Example with actual values:
```
MONGODB_URI=mongodb+srv://developer:Dev@2026Secure123@cluster0.abc123.mongodb.net/internship-portal?retryWrites=true&w=majority
JWT_SECRET=internship_portal_secret_key_2026
JWT_EXPIRE=7d
PORT=5001
NODE_ENV=development
```

## Step 7: Start Your Backend

```bash
cd backend
npm run dev
```

## Verify Connection

You should see in the terminal:
```
MongoDB Connected: cluster0-xxxxx.mongodb.net
Server is running on port 5001
```

## Common Issues

### "Authentication failed"
- Check username and password in connection string
- Make sure password doesn't contain special characters that need encoding
  - If password has `@`, encode it as `%40`
  - If password has `:`, encode it as `%3A`

### "IP not whitelisted"
- Add your IP address to Network Access
- Or allow access from anywhere (for development only)

### "Cannot connect to MongoDB"
- Verify internet connection
- Check if MongoDB Atlas is up (check status.mongodb.com)
- Ensure firewall allows outbound connections

## Testing the Connection

After starting the backend, test with this curl command:

```bash
curl http://localhost:5001/health
```

You should get:
```json
{"message":"Server is running"}
```

Now your backend is ready to receive requests from the frontend!
