# FarmXConnect Server

FarmXConnect is a platform connecting farmers and buyers for agricultural trade. This is the backend server built with Node.js, Express, and MongoDB.

## Features
- User authentication and authorization
- Trade management system
- Market insights and data
- Messaging system
- File uploads with Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB
- Cloudinary account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/farmxconnect
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the Server
```bash
npm start
```

### Running Tests
```bash
npm test
```

### API Documentation
The API documentation is available at `http://localhost:5000/api-docs` when the server is running.

### Project Structure
```
server/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── services/      # Business logic services
│   ├── utils/         # Utility functions
│   ├── app.js         # Express application
│   └── server.js      # Server entry point
```

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT](https://choosealicense.com/licenses/mit/)
