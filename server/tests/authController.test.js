const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');

describe('Auth Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should log in successfully and return tokens', async () => {
    const response = await request(app)
      .post('/api/auth/login') // Adjust the route as necessary
      .send({ email: 'test@example.com', password: 'password123' }); // Use valid test credentials

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should refresh access token successfully', async () => {
    const refreshToken = 'valid_refresh_token'; // Use a valid refresh token from a previous login

    const response = await request(app)
      .post('/api/auth/refresh')
      .send({ token: refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });
});
