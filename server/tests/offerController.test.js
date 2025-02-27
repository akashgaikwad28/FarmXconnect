const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');

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

  it('should allow the owner to update the offer status', async () => {
    const response = await request(app)
      .put('/api/offers/update/offerId') // Use a valid offer ID
      .set('Authorization', 'Bearer valid_access_token') // Include a valid token
      .send({ status: 'Accepted' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Offer accepted successfully!');
  });

  it('should deny access to non-owners when updating offer status', async () => {
    const response = await request(app)
      .put('/api/offers/update/offerId') // Use a valid offer ID
      .set('Authorization', 'Bearer another_valid_access_token') // Include a valid token for a different user
      .send({ status: 'Rejected' });

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('You are not authorized to update this offer.');
  });
});
