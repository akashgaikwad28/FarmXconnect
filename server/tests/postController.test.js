const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');

describe('Post Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new post successfully', async () => {
    const response = await request(app)
      .post('/api/posts/create') // Adjust the route as necessary
      .set('Authorization', 'Bearer valid_access_token') // Include a valid token
      .send({ 
        location: 'Test Location', 
        description: 'Test Description', 
        video: 'test_video.mp4' 
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  it('should get all posts successfully', async () => {
    const response = await request(app)
      .get('/api/posts') // Adjust the route as necessary
      .set('Authorization', 'Bearer valid_access_token'); // Include a valid token

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a post successfully', async () => {
    const postId = 'valid_post_id'; // Replace with a valid post ID
    const response = await request(app)
      .put(`/api/posts/${postId}`) // Adjust the route as necessary
      .set('Authorization', 'Bearer valid_access_token') // Include a valid token
      .send({ 
        location: 'Updated Location', 
        description: 'Updated Description' 
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('location', 'Updated Location');
  });

  it('should delete a post successfully', async () => {
    const postId = 'valid_post_id'; // Replace with a valid post ID
    const response = await request(app)
      .delete(`/api/posts/${postId}`) // Adjust the route as necessary
      .set('Authorization', 'Bearer valid_access_token'); // Include a valid token

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Post deleted successfully.');
  });
});
