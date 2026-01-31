// backend/src/config/database.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Atlas Connected:`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   User: unidigital_app`);
    
    // Connection events
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check .env file has correct MONGODB_URI');
    console.log('2. Verify user "unidigital_app" exists in Atlas');
    console.log('3. Check Network Access allows 0.0.0.0/0');
    console.log('4. Wait a few minutes after user creation');
    process.exit(1);
  }
};

module.exports = connectDB;