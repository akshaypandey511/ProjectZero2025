# German Learning App 🇩🇪

A web application for learning German A1 vocabulary with interactive flashcards. Track your progress and master essential German words!

## Features

- **User Authentication** - Secure registration and login
- **Vocabulary Flashcards** - Interactive flashcards with German words, English translations, and pronunciations
- **Progress Tracking** - Track which words you've mastered
- **Category-based Learning** - Study by categories (greetings, numbers, colors, family, food, verbs)
- **A1 Level Content** - 45+ essential German A1 vocabulary words

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)
- **Git** - [Download](https://git-scm.com/)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ProjectZero2025
```

### 2. Set up the Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/german-learning-app
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/german-learning-app
```

### 3. Set up the Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# The default API URL is http://localhost:5000/api
# Change this if your backend runs on a different port
```

### 4. Seed the Database

```bash
cd ../backend

# This will populate your database with German A1 vocabulary
npm run seed
```

You should see output like:
```
MongoDB connected successfully
Cleared existing vocabulary
Added 45 vocabulary words
```

## Running the Application

You'll need to run both the backend and frontend servers.

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Using the App

1. Open your browser and go to `http://localhost:5173`
2. Click **"Get Started"** to create a new account
3. Fill in your name, email, and password
4. After registration, you'll be redirected to the dashboard
5. Choose a category or select "All" to start learning
6. Click on flashcards to flip them and see translations
7. Mark words as "I Know This!" or "Need Practice" to track your progress

## Project Structure

```
ProjectZero2025/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── data/            # Seed data scripts
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── .env             # Environment variables
│   ├── server.js        # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── .env             # Environment variables
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Vocabulary
- `GET /api/vocabulary` - Get all vocabulary
- `GET /api/vocabulary/category/:category` - Get by category
- `GET /api/vocabulary/random` - Get random vocabulary for practice
- `POST /api/vocabulary/progress` - Update user progress (protected)
- `GET /api/vocabulary/progress` - Get user progress (protected)

## Deployment

### Backend Deployment (Railway/Render)

1. Create account on [Railway](https://railway.app/) or [Render](https://render.com/)
2. Create a new project and link your GitHub repository
3. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A random secure string
   - `NODE_ENV=production`
4. Deploy from the `backend` directory
5. Run the seed script: `npm run seed`

### Frontend Deployment (Vercel)

1. Create account on [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Set the root directory to `frontend`
4. Set environment variable:
   - `VITE_API_URL` - Your backend API URL
5. Deploy

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running
- Check that `.env` file exists with correct `MONGODB_URI`
- Verify all dependencies are installed: `npm install`

### Frontend won't connect to backend
- Check that backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env` file
- Check browser console for CORS errors

### Database is empty
- Run the seed script: `cd backend && npm run seed`

## Future Enhancements

- [ ] Audio pronunciation for words
- [ ] Grammar exercises
- [ ] Spaced repetition algorithm
- [ ] Multiple difficulty levels (A2, B1, B2)
- [ ] Daily learning streaks
- [ ] Listening comprehension exercises
- [ ] Speaking practice
- [ ] Mobile app version

## Contributing

This is a learning project! Feel free to fork and experiment.

## License

MIT License - feel free to use this project for learning purposes.

## Support

If you encounter any issues, please check:
1. All prerequisites are installed
2. MongoDB is running
3. Environment variables are set correctly
4. Both servers are running

Happy learning! 🎉
