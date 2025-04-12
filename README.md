
# Store Rating System

A full-stack web application that allows users to submit ratings for stores registered on the platform.

## Tech Stack

- **Backend**: Express.js
- **Database**: MySQL
- **Frontend**: React.js

## Features

- User authentication and role-based access control
- Store registration and management
- Rating system (1-5 stars)
- Admin dashboard with statistics and user management
- Store owner profile management

## User Roles

1. **System Administrator**: Can manage stores, users, and view statistics
2. **Store Owner**: Can manage their store profile and view ratings
3. **Normal User**: Can browse stores and submit ratings

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies for both client and server
```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up database
```
# Create database and tables
mysql -u <username> -p < server/database/schema.sql
```

4. Configure environment variables
```
# Create .env files in both client and server directories
cp server/.env.example server/.env
cp client/.env.example client/.env
```

5. Start the application
```
# Start server
cd server
npm start

# Start client
cd ../client
npm start
```

## Project Structure

```
.
├── client/                 # React.js frontend
│   ├── public/             # Public assets
│   └── src/                # Source files
│       ├── components/     # React components
│       ├── pages/          # Page components
│       ├── context/        # React context API
│       ├── services/       # API services
│       └── utils/          # Utility functions
│
└── server/                 # Express.js backend
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── database/           # Database setup and migrations
    ├── middleware/         # Custom middleware
    ├── models/             # Data models
    ├── routes/             # API routes
    └── utils/              # Utility functions
```
