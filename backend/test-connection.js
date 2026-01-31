const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://unidigital_app:Blackdog10@cluster0.qfcy4iv.mongodb.net/unidigital?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  console.log('🔌 Testing MongoDB Atlas Connection...');
  console.log('User: unidigital_app');
  console.log('Database: unidigital\n');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test database
    const db = client.db('unidigital');
    
    // Create test collection
    await db.collection('app_test').insertOne({
      app: 'UniDigital',
      status: 'connected',
      timestamp: new Date(),
      user: 'unidigital_app'
    });
    
    console.log('✅ Test document inserted');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📊 Collections in database:');
    if (collections.length > 0) {
      collections.forEach(col => console.log(`  - ${col.name}`));
    } else {
      console.log('  (No collections yet - they will be created as needed)');
    }
    
    // Count documents
    const count = await db.collection('app_test').countDocuments();
    console.log(`\n✅ Total test documents: ${count}`);
    
    console.log('\n🎉 MongoDB Atlas is ready for UniDigital!');
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED:', error.message);
    
    if (error.message.includes('authentication')) {
      console.log('\n🔑 Authentication Error:');
      console.log('  1. User "unidigital_app" might not exist');
      console.log('  2. Password might be incorrect');
      console.log('  3. User needs "atlasAdmin" or "readWriteAnyDatabase" role');
      console.log('  4. Wait 2-3 minutes after creating user');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🌐 Network Error:');
      console.log('  1. Check Network Access allows 0.0.0.0/0');
      console.log('  2. Check internet connection');
    }
    
  } finally {
    await client.close();
    console.log('\n🔌 Test completed.');
  }
}

test();