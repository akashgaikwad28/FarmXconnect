const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const Post = require('../src/models/Post');

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

  it('should create a post with an image upload', async () => {
    const response = await request(app)
      .post('/api/posts/create') // Adjust the route as necessary
      .set('Authorization', 'Bearer someValidToken') // Include a valid token if required
      .field('location', 'Farm Location')
      .field('description', 'This is a test post')
      .attach('media', 'path/to/test/image.jpg'); // Adjust the path to a test image

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('image');
  });

  it('should create a post with a video upload', async () => {
    const response = await request(app)
      .post('/api/posts/create') // Adjust the route as necessary
      .set('Authorization', 'Bearer someValidToken') // Include a valid token if required
      .field('location', 'Farm Location')
      .field('description', 'This is a test post with video')
      .attach('media', 'path/to/test/video.mp4'); // Adjust the path to a test video

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('video');
  });
});
