const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');

describe('User Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/users/register') // Adjust the route as necessary
      .send({ 
        name: 'Test User', 
        email: 'testuser@example.com', 
        password: 'password123', 
        phone: '1234567890', 
        location: 'Test Location', 
        role: 'Farmer' 
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in an existing user successfully', async () => {
    const response = await request(app)
      .post('/api/users/login') // Adjust the route as necessary
      .send({ 
        email: 'testuser@example.com', 
        password: 'password123' 
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not log in with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/users/login') // Adjust the route as necessary
      .send({ 
        email: 'testuser@example.com', 
        password: 'wrongpassword' 
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid email or password.');
  });
});
