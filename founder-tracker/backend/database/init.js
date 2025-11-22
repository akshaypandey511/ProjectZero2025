const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file in the backend directory
const dbPath = path.join(__dirname, 'founder-tracker.db');
const db = new sqlite3.Database(dbPath);

console.log('Initializing Founder Growth Tracker database...');

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create tables
const createTablesSQL = `
  -- Reflections table (for Diagnose section)
  CREATE TABLE IF NOT EXISTS reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    answer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Skills table (for Skill Map section)
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    skill_name TEXT NOT NULL UNIQUE,
    skill_category TEXT NOT NULL,
    description TEXT,
    current_level INTEGER DEFAULT 0 CHECK(current_level >= 0 AND current_level <= 100),
    target_level INTEGER DEFAULT 100 CHECK(target_level >= 0 AND target_level <= 100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Weekly reflections table
  CREATE TABLE IF NOT EXISTS weekly_reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week_start_date DATE NOT NULL,
    journal_entry TEXT,
    created_this_week TEXT,
    concept_clicked TEXT,
    got_stuck TEXT,
    protected_time BOOLEAN DEFAULT 0,
    do_differently TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Daily habit tracker
  CREATE TABLE IF NOT EXISTS daily_habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL UNIQUE,
    morning_deep_work BOOLEAN DEFAULT 0,
    evening_exploration BOOLEAN DEFAULT 0,
    weekend_build BOOLEAN DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Problem signals table (for Problem Discovery section)
  CREATE TABLE IF NOT EXISTS problem_signals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    signal_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    validated BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Validation experiments table
  CREATE TABLE IF NOT EXISTS experiments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    problem_signal_id INTEGER,
    experiment_type TEXT,
    hypothesis TEXT,
    result TEXT,
    status TEXT DEFAULT 'planned',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_signal_id) REFERENCES problem_signals(id) ON DELETE CASCADE
  );

  -- Roadmap milestones table
  CREATE TABLE IF NOT EXISTS milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phase TEXT NOT NULL,
    phase_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_date DATE,
    completed BOOLEAN DEFAULT 0,
    completion_date DATE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes for better query performance
  CREATE INDEX IF NOT EXISTS idx_reflections_question ON reflections(question_id);
  CREATE INDEX IF NOT EXISTS idx_weekly_date ON weekly_reflections(week_start_date);
  CREATE INDEX IF NOT EXISTS idx_daily_date ON daily_habits(date);
  CREATE INDEX IF NOT EXISTS idx_problems_type ON problem_signals(signal_type);
  CREATE INDEX IF NOT EXISTS idx_milestones_phase ON milestones(phase_number);
`;

db.exec(createTablesSQL, (err) => {
  if (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }

  console.log('✓ Database tables created successfully');

  // Insert default skills
  const defaultSkills = [
    ['Programming (Python/JS)', 'technical', 'Build scripts, automate, create MVPs. Python for backend/AI, JavaScript for web.', 20, 70],
    ['AI/ML Literacy', 'technical', 'Understand what\'s possible. Use AI tools effectively. Know when to build vs. buy.', 30, 70],
    ['System Design', 'technical', 'How do systems scale? Databases, APIs, cloud architecture basics.', 25, 60],
    ['Data & Analytics', 'technical', 'SQL, basic statistics, reading dashboards, A/B testing intuition.', 50, 80],
    ['Product Craft', 'product', 'Discovery, validation, experimentation, user research, metrics.', 60, 90],
    ['Business Fundamentals', 'business', 'Unit economics, pricing, GTM, fundraising basics, financial modeling.', 45, 80]
  ];

  const insertSkill = db.prepare('INSERT OR IGNORE INTO skills (skill_name, skill_category, description, current_level, target_level) VALUES (?, ?, ?, ?, ?)');

  defaultSkills.forEach((skill) => {
    insertSkill.run(skill, (err) => {
      if (err) console.error('Error inserting skill:', err);
    });
  });

  insertSkill.finalize(() => {
    console.log('✓ Default skills inserted');

    // Insert default roadmap phases
    const defaultMilestones = [
      ['Foundation', 1, 'Complete coding fundamentals', 'Complete one structured coding course (CS50P or Odin Project foundations)', null],
      ['Foundation', 1, 'Build 3 small tools', 'Build 3 small personal tools/automations', null],
      ['Foundation', 1, 'Start problem journal', 'Note frustrations and problems weekly', null],
      ['Foundation', 1, 'Read foundational books', 'Read: Inspired, Mom Test, Zero to One', null],
      ['Acceleration', 2, 'Build portfolio MVP', 'Build one "portfolio MVP" — a real tool that solves a real problem', null],
      ['Acceleration', 2, 'Complete AI/ML course', 'Complete AI/ML literacy course (fast.ai Part 1)', null],
      ['Acceleration', 2, 'Conduct user interviews', 'Do 20+ user interviews across 2-3 problem areas', null],
      ['Acceleration', 2, 'Start writing publicly', 'Write about learnings on LinkedIn/blog', null],
      ['Pre-Launch', 3, 'Pick ONE problem area', 'Go deep on one specific problem to solve', null],
      ['Pre-Launch', 3, 'Run validation experiments', 'Run 2-3 validation experiments (landing pages, manual services)', null],
      ['Pre-Launch', 3, 'Build industry network', 'Attend events, contribute to communities', null],
      ['Pre-Launch', 3, 'Side project milestone', 'Consider: side project with paying users? Co-founder search?', null],
      ['Launch Ready', 4, 'Validate problem-solution fit', 'Have validated problem + solution hypothesis', null],
      ['Launch Ready', 4, 'Achieve financial runway', 'Have runway (FIRE goal achieved or close)', null],
      ['Launch Ready', 4, 'Get paying customers/LOIs', 'Ideally: paying customers or strong LOIs', null],
      ['Launch Ready', 4, 'Make launch decision', 'Decision: bootstrap vs. raise? India-first or global?', null]
    ];

    const insertMilestone = db.prepare('INSERT OR IGNORE INTO milestones (phase, phase_number, title, description, target_date) VALUES (?, ?, ?, ?, ?)');

    defaultMilestones.forEach((milestone) => {
      insertMilestone.run(milestone, (err) => {
        if (err) console.error('Error inserting milestone:', err);
      });
    });

    insertMilestone.finalize(() => {
      console.log('✓ Default roadmap milestones inserted');
      console.log('\n🎉 Database initialized successfully!');
      console.log(`📁 Database location: ${dbPath}\n`);

      db.close((err) => {
        if (err) console.error('Error closing database:', err);
        process.exit(0);
      });
    });
  });
});
