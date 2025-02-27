const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Offer = require('../src/models/Offers');

describe('Offer Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should send an offer successfully', async () => {
    const response = await request(app)
      .post('/api/offers/send') // Adjust the route as necessary
      .send({
        receiver: 'someReceiverId',
        post: 'somePostId',
        cropName: 'Wheat',
        priceOffered: 100,
        volume: 10,
        sellingDeadline: '2023-12-31',
        buyingDeadline: '2023-12-01',
        tradeOfferId: 'someTradeOfferId'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Offer sent successfully!');
  });

  it('should fetch user offers', async () => {
    const response = await request(app)
      .get('/api/offers/user/someUserId') // Adjust the route as necessary
      .set('Authorization', 'Bearer someValidToken'); // Include a valid token if required

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
