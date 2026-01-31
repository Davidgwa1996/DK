// backend/mongo-init.js
db = db.getSiblingDB('admin');
db.auth('admin', 'admin123');

db = db.getSiblingDB('unidigital');

// Create collections
db.createCollection('users');
db.createCollection('products');
db.createCollection('categories');
db.createCollection('carts');
db.createCollection('orders');
db.createCollection('payments');
db.createCollection('reviews');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ createdAt: -1 });

// Create admin user for application
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    { role: 'readWrite', db: 'unidigital' },
    { role: 'dbAdmin', db: 'unidigital' }
  ]
});

print('MongoDB initialization completed successfully!');