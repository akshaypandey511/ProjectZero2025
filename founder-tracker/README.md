# 🚀 Founder Growth Tracker

A **100% local, offline-first** personal growth tracking app for aspiring technical founders. Track your skills, reflections, weekly habits, problem discoveries, and 3-year roadmap — all stored privately on your machine using SQLite.

## ✨ Features

### 1. 🔍 Diagnose - Self-Assessment
- Deep reflection exercises to understand your current state
- Identify strengths, weaknesses, and areas for growth
- All reflections saved locally

### 2. 🎯 Skill Map
- Track 6 key founder skills:
  - Programming (Python/JS)
  - AI/ML Literacy
  - System Design
  - Data & Analytics
  - Product Craft
  - Business Fundamentals
- Visual progress bars
- Curated learning paths for each skill

### 3. 📅 Weekly Practice
- Weekly habit tracker (7-day view)
- Weekly reflection checklist
- Track learning consistency
- Journal your progress

### 4. 🔎 Problem Discovery
- Document problem signals from your daily life
- Validation experiment framework
- Build your unfair advantages

### 5. 🗺️ 3-Year Roadmap
- 4-phase structured roadmap
- Track milestones and progress
- Immediate next steps

## 🔒 Privacy First

- **100% Local** - All data stored on your machine
- **No Internet Required** - Works completely offline
- **SQLite Database** - Simple, reliable, portable
- **No Tracking** - Your data never leaves your computer

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- SQLite (better-sqlite3)
- RESTful API

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)

### Setup Instructions

1. **Navigate to the founder-tracker directory**
   ```bash
   cd founder-tracker
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   npm run init-db
   ```

   You should see:
   ```
   ✓ Database tables created successfully
   ✓ Default skills inserted
   ✓ Default roadmap milestones inserted
   🎉 Database initialized successfully!
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## 🚀 Running the App

You need to run both backend and frontend servers.

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5001`

### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📂 Project Structure

```
founder-tracker/
├── backend/
│   ├── database/
│   │   ├── init.js              # Database initialization script
│   │   ├── db.js                # Database connection
│   │   └── founder-tracker.db   # SQLite database (created after init)
│   ├── server.js                # Express API server
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── DiagnoseSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   ├── WeeklyPracticeSection.jsx
│   │   │   ├── ProblemDiscoverySection.jsx
│   │   │   └── RoadmapSection.jsx
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── .env
│
└── README.md
```

## 💾 Database Schema

The SQLite database includes these tables:

- **reflections** - Self-assessment reflections
- **skills** - Skill tracking with progress levels
- **weekly_reflections** - Weekly journal entries and checklists
- **daily_habits** - Daily habit tracking
- **problem_signals** - Problem discovery notes
- **experiments** - Validation experiments
- **milestones** - 3-year roadmap milestones

## 🎨 Design

The app features a beautiful dark theme with neon accents:
- Dark blue gradient background
- Glassmorphic cards
- Neon cyan and green highlights
- Smooth animations

## 📊 API Endpoints

### Reflections
- `GET /api/reflections` - Get all reflections
- `GET /api/reflections/:questionId` - Get specific reflection
- `POST /api/reflections` - Save/update reflection

### Skills
- `GET /api/skills` - Get all skills
- `PUT /api/skills/:id` - Update skill progress

### Weekly Reflections
- `GET /api/weekly-reflections` - Get all weekly reflections
- `GET /api/weekly-reflections/:date` - Get by date
- `POST /api/weekly-reflections` - Save weekly reflection

### Daily Habits
- `GET /api/daily-habits` - Get habits (with optional date range)
- `POST /api/daily-habits` - Save/update habit

### Problem Signals
- `GET /api/problem-signals` - Get all problems
- `POST /api/problem-signals` - Create problem signal
- `PUT /api/problem-signals/:id` - Update problem
- `DELETE /api/problem-signals/:id` - Delete problem

### Milestones
- `GET /api/milestones` - Get all milestones
- `PUT /api/milestones/:id` - Update milestone
- `POST /api/milestones` - Create custom milestone

### Stats
- `GET /api/stats` - Get overall statistics

## 🔧 Configuration

### Backend (.env)
```
PORT=5001
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## 🗄️ Data Backup

Your database file is located at:
```
backend/database/founder-tracker.db
```

To backup your data:
1. Simply copy the `founder-tracker.db` file to a safe location
2. To restore, copy it back to the same location

## 🚨 Troubleshooting

### Backend won't start
- Make sure you ran `npm run init-db` in the backend directory
- Check that `founder-tracker.db` exists in `backend/database/`
- Verify Node.js is installed: `node --version`

### Frontend won't connect to backend
- Make sure the backend is running on port 5001
- Check the `.env` file in frontend has correct API URL
- Look for CORS errors in browser console

### Database errors
- Delete `founder-tracker.db` and run `npm run init-db` again
- This will reset all data and create a fresh database

## 🎯 Usage Tips

1. **Start with Diagnose** - Be brutally honest in your self-assessment
2. **Set Realistic Skill Targets** - Don't aim for 100% on everything
3. **Use Weekly Tracker** - Click on days to mark them complete
4. **Document Problems** - Write down frustrations as they happen
5. **Check Roadmap Weekly** - Review and update your progress

## 🌟 Why This App?

Traditional productivity apps send your data to the cloud. This app keeps everything local because:
- **Privacy** - Your reflections and goals are personal
- **Reliability** - No internet = no problems
- **Speed** - Local database is instant
- **Portability** - Just backup the .db file

## 📝 License

MIT License - This is your personal tool. Use it however you want!

## 🤝 Contributing

This is a personal tool, but feel free to fork and customize it for your own journey.

## 💡 Inspiration

Designed for aspiring technical founders who want to:
- Transition from PM to founder
- Build real technical skills
- Track their growth systematically
- Stay accountable to their goals

---

**Made with ❤️ for founders who are serious about their growth**

Start tracking your founder journey today! 🚀
