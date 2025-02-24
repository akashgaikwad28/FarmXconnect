# FarmXConnect API Documentation

## Base URL: http://localhost:5000/api

## Authentication Routes
- POST /auth/register - Register a new user
- POST /auth/login - Login an existing user

## User Routes
- GET /users/profile - Get user profile (requires auth)
- PUT /users/profile - Update user profile (requires auth)
- GET /users - Get all users (admin only, requires auth)

## Post Routes
- POST /posts - Create a new post (requires auth)
- GET /posts - Get all posts (requires auth)
- PUT /posts/:postId - Update a post (requires auth)
- DELETE /posts/:postId - Delete a post (requires auth)

## Offer Routes
- POST /offers/send - Send an offer (requires auth)
- GET /offers/user/:userId - Get offers for a user (requires auth)
- PUT /offers/update/:offerId - Update offer status (requires auth)

## Trade Routes
- POST /trades - Create a trade offer (requires auth)
- GET /trades - Get all trade offers (requires auth)
- PUT /trades/:tradeId - Update trade status (requires auth)

## Message Routes
- POST /messages - Send a message (requires auth)
- GET /messages/:userId - Get messages with a user (requires auth)

## Market Insights Routes
- GET /market-insights - Get market insights data (requires auth)
- POST /market-insights/dummy - Add dummy market data (dev only, requires auth)

## Health Check
- GET /health - Check server health

## Usage
1. Start the server: `npm start`
2. Access routes at: http://localhost:5000/api/[route]
3. Use tools like Postman or cURL to test endpoints
4. For protected routes, include JWT token in Authorization header

## Example Requests
```bash
# Health Check
curl http://localhost:5000/api/health

# Get all posts
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/posts
```

## Notes
- All POST/PUT requests should include appropriate JSON payload
- Replace :param with actual values in routes
- Use proper Content-Type headers (application/json)
