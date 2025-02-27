const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Trade = require('../src/models/Trade');

describe('Trade Filtering Functionality', () => {
  let user1, user2;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create test users
    user1 = await User.create({ name: 'Farmer', email: 'farmer@example.com', password: 'password', role: 'Farmer' });
    user2 = await User.create({ name: 'Trader', email: 'trader@example.com', password: 'password', role: 'Trader' });

    // Create test trades
    await Trade.create([
      { trader: user2._id, farmer: user1._id, crop: 'Wheat', price: 100, quantity: 10, location: 'Location1' },
      { trader: user2._id, farmer: user1._id, crop: 'Corn', price: 150, quantity: 5, location: 'Location2' },
    ]);
  });

  afterAll(async () => {
    // Clean up the database
    await User.deleteMany({});
    await Trade.deleteMany({});
    await mongoose.connection.close();
  });

  test('should filter trades by crop', async () => {
    const response = await request(app)
      .get('/api/trades')
      .set('Authorization', `Bearer ${user1.token}`)
      .query({ crop: 'Wheat' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].crop).toBe('Wheat');
  });

  test('should filter trades by price', async () => {
    const response = await request(app)
      .get('/api/trades')
      .set('Authorization', `Bearer ${user1.token}`)
      .query({ price: 120 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].price).toBe(100); // Should return trades with price <= 120
  });

  test('should filter trades by location', async () => {
    const response = await request(app)
      .get('/api/trades')
      .set('Authorization', `Bearer ${user1.token}`)
      .query({ location: 'Location1' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].location).toBe('Location1');
  });
});
