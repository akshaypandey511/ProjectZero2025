# ⚡ Quick Start Guide

## Get Started in 3 Minutes

### Step 1: Install Dependencies (2 min)

```bash
# Navigate to founder-tracker
cd founder-tracker

# Install backend
cd backend
npm install
npm run init-db

# Install frontend
cd ../frontend
npm install
```

### Step 2: Run the App (1 min)

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd founder-tracker/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd founder-tracker/frontend
npm run dev
```

### Step 3: Open in Browser

Go to: **http://localhost:5173**

## 🎉 That's it!

Your Founder Growth Tracker is now running locally on your machine.

## 📌 Quick Tips

- All your data is saved automatically to SQLite
- No internet needed after installation
- Database file: `backend/database/founder-tracker.db`
- To backup: Just copy the .db file

## 🚨 Having Issues?

1. Make sure Node.js is installed: `node --version`
2. Delete `founder-tracker.db` and run `npm run init-db` again
3. Check both servers are running (backend on 5001, frontend on 5173)

---

Happy tracking! 🚀
