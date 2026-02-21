import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(`Connection URI: ${process.env.MONGODB_URI?.substring(0, 50)}...`);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  IMPORTANT: MongoDB connection failed!');
    console.error('Please follow these steps:');
    console.error('1. Go to https://www.mongodb.com/cloud/atlas');
    console.error('2. Create a free cluster');
    console.error('3. Get the connection string');
    console.error('4. Update MONGODB_URI in .env file');
    console.error('5. Restart the server');
    console.error('\nFor detailed instructions, see: MONGODB_ATLAS_SETUP.md\n');
    
    // Continue anyway for development - API will work but won't persist data
    console.warn('⚠️  Starting server anyway (data persistence disabled)\n');
    return null;
  }
};

export default connectDB;
