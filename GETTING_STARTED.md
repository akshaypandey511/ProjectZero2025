# 🚀 Getting Started - Simple Guide for Beginners

This guide will help you run the German Learning App on your computer in simple steps.

## Step 1: Install Required Software

You need to install 3 things on your computer:

### 1. Node.js (JavaScript Runtime)
- **What it does:** Runs the app on your computer
- **Download:** [https://nodejs.org/](https://nodejs.org/)
- **Which version?** Download the **LTS version** (left green button)
- **Installation:** Just click "Next" through the installer
- **Test it worked:**
  - Open Terminal (Mac) or Command Prompt (Windows)
  - Type: `node --version` and press Enter
  - You should see something like `v18.17.0`

### 2. MongoDB (Database)
You have 2 options - choose ONE:

#### Option A: MongoDB Atlas (Easier - Recommended for Beginners)
- **What it is:** Free cloud database - no installation needed!
- **Sign up:** [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
- **Follow this guide:** [MongoDB Atlas Setup Guide](https://www.mongodb.com/basics/mongodb-atlas-tutorial)
- **What you need:** After setup, you'll get a connection string like:
  ```
  mongodb+srv://username:password@cluster.mongodb.net/german-app
  ```
  **Save this! You'll need it later.**

#### Option B: MongoDB Local (Install on your computer)
- **Download:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **Installation guide:** [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/)
- **Note:** This is harder to set up

### 3. Git (Version Control)
- **What it does:** Downloads the code from GitHub
- **Download:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Installation:** Click "Next" through the installer
- **Test it worked:** Type `git --version` in Terminal/Command Prompt

### 4. A Code Editor (Optional but helpful)
- **VS Code - Recommended:** [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Makes it easy to view and edit code

---

## Step 2: Download the Project

1. **Open Terminal** (Mac) or **Command Prompt** (Windows)
   - Mac: Press `Cmd + Space`, type "Terminal"
   - Windows: Press `Win + R`, type "cmd"

2. **Navigate to where you want the project:**
   ```bash
   cd Desktop
   ```
   (This puts it on your Desktop - you can choose anywhere)

3. **Download the project:**
   ```bash
   git clone https://github.com/akshaypandey511/ProjectZero2025.git
   ```

4. **Go into the project folder:**
   ```bash
   cd ProjectZero2025
   ```

---

## Step 3: Set Up the Backend (Server)

1. **Open the backend folder:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```
   ⏳ This takes 1-2 minutes. You'll see a lot of text scrolling.

3. **Create environment file:**
   - **Mac/Linux:**
     ```bash
     cp .env.example .env
     ```
   - **Windows:**
     ```bash
     copy .env.example .env
     ```

4. **Edit the .env file:**

   **If using VS Code:**
   ```bash
   code .env
   ```

   **Or open it manually:**
   - Navigate to `ProjectZero2025/backend/.env`
   - Open with Notepad (Windows) or TextEdit (Mac)

   **Change this line:**
   ```
   MONGODB_URI=mongodb://localhost:27017/german-learning-app
   ```

   **To your MongoDB Atlas connection string (if using Atlas):**
   ```
   MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/german-app
   ```

   **Save the file.**

5. **Add vocabulary words to database:**
   ```bash
   npm run seed
   ```

   ✅ You should see:
   ```
   MongoDB connected successfully
   Cleared existing vocabulary
   Added 45 vocabulary words
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

   ✅ You should see:
   ```
   Server running on port 5000
   MongoDB connected successfully
   ```

   **🎉 Backend is running! Keep this terminal window open.**

---

## Step 4: Set Up the Frontend (Website)

1. **Open a NEW Terminal/Command Prompt window**
   - Don't close the backend terminal!
   - You need 2 terminals running at the same time

2. **Navigate to the project:**
   ```bash
   cd Desktop/ProjectZero2025
   ```
   (Or wherever you put the project)

3. **Go to frontend folder:**
   ```bash
   cd frontend
   ```

4. **Install frontend dependencies:**
   ```bash
   npm install
   ```
   ⏳ This takes 1-2 minutes.

5. **Start the frontend:**
   ```bash
   npm run dev
   ```

   ✅ You should see:
   ```
   VITE ready in 500 ms

   ➜  Local:   http://localhost:5173/
   ```

---

## Step 5: Open the App! 🎉

1. **Open your web browser** (Chrome, Firefox, Safari, Edge)

2. **Go to:** [http://localhost:5173](http://localhost:5173)

3. **You should see the German Learning App!**

---

## How to Use the App

1. **Click "Get Started"** to create an account
2. **Fill in:**
   - Your name
   - Email (can be fake for testing: `test@test.com`)
   - Password (at least 6 characters)
3. **Click "Create Account"**
4. **Start learning!**
   - Choose a category (or "All")
   - Click flashcards to flip them
   - Mark if you know the word or need practice

---

## How to Stop the App

When you're done:

1. **In both Terminal windows:**
   - Press `Ctrl + C` (Windows/Mac)
   - This stops the servers

---

## How to Start Again Later

You only need to do the installation once! Next time:

1. **Terminal 1 - Backend:**
   ```bash
   cd Desktop/ProjectZero2025/backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd Desktop/ProjectZero2025/frontend
   npm run dev
   ```

3. **Open browser:** [http://localhost:5173](http://localhost:5173)

---

## 🆘 Troubleshooting

### "Command not found: npm" or "Command not found: node"
- Node.js didn't install correctly
- Solution: Download and reinstall from [nodejs.org](https://nodejs.org/)
- After installing, **close and reopen** Terminal/Command Prompt

### Backend won't start - "MongoDB connection error"
- Check your `.env` file has the correct `MONGODB_URI`
- If using MongoDB Atlas:
  - Make sure you copied the connection string correctly
  - Replace `<password>` with your actual password
  - Add your IP address to the allowlist in MongoDB Atlas

### Frontend won't connect to backend
- Make sure backend is running (Terminal 1)
- You should see "Server running on port 5000"
- Check that backend terminal didn't crash

### "Port 5000 is already in use"
- Something else is using port 5000
- Solution: Find and close the other app, or change the port in `backend/.env`:
  ```
  PORT=5001
  ```
  Then also update `frontend/.env`:
  ```
  VITE_API_URL=http://localhost:5001/api
  ```

### Can't see the vocabulary words
- Did you run `npm run seed` in the backend folder?
- Run it again:
  ```bash
  cd backend
  npm run seed
  ```

### Browser shows blank page
- Check the frontend terminal for errors
- Try refreshing the page (press F5)
- Clear browser cache and try again

---

## 📹 Video Tutorials (Helpful Links)

If you get stuck, these videos explain the basics:

1. **What is Node.js?** [https://www.youtube.com/watch?v=TlB_eWDSMt4](https://www.youtube.com/watch?v=TlB_eWDSMt4)
2. **Using Terminal/Command Prompt:** [https://www.youtube.com/watch?v=5XgBd6rjuDQ](https://www.youtube.com/watch?v=5XgBd6rjuDQ)
3. **MongoDB Atlas Setup:** [https://www.youtube.com/watch?v=rPqRyYJmx2g](https://www.youtube.com/watch?v=rPqRyYJmx2g)

---

## 🎓 What's Happening Behind the Scenes?

**Backend (Terminal 1):**
- Runs on port 5000
- Handles user login/registration
- Stores vocabulary and your progress in MongoDB
- Like the "brain" of the app

**Frontend (Terminal 2):**
- Runs on port 5173
- The website you see in your browser
- Talks to the backend to get/save data
- Like the "face" of the app

**MongoDB:**
- Stores all the data (users, vocabulary, progress)
- Like a filing cabinet

---

## Need More Help?

1. **Take a screenshot** of the error message
2. **Note which step** you're stuck on
3. **Ask me!** I'm here to help you through any issues

Happy learning German! 🇩🇪🎉
