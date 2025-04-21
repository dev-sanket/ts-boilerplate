# Express TypeScript MongoDB API

A RESTful API built with Express.js, TypeScript, and MongoDB.

## Features

- TypeScript support
- MongoDB integration
- RESTful API endpoints
- Error handling
- Security middleware (helmet, cors)
- Request logging (morgan)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/express-typescript-api
   NODE_ENV=development
   ```

## Development

To run the development server:

```bash
npm run dev
```

## Production

To build and run in production:

```bash
npm run build
npm start
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Testing

To run tests:

```bash
npm test
```

## License

MIT
