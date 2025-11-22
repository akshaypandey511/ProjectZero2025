const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== REFLECTIONS ROUTES ====================

// Get all reflections
app.get('/api/reflections', (req, res) => {
  try {
    const reflections = db.prepare('SELECT * FROM reflections ORDER BY created_at DESC').all();
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reflection by question_id
app.get('/api/reflections/:questionId', (req, res) => {
  try {
    const reflection = db.prepare('SELECT * FROM reflections WHERE question_id = ? ORDER BY updated_at DESC LIMIT 1').get(req.params.questionId);
    res.json(reflection || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save or update reflection
app.post('/api/reflections', (req, res) => {
  try {
    const { question_id, question_text, answer } = req.body;

    // Check if reflection exists
    const existing = db.prepare('SELECT id FROM reflections WHERE question_id = ?').get(question_id);

    if (existing) {
      // Update existing
      const stmt = db.prepare('UPDATE reflections SET answer = ?, updated_at = CURRENT_TIMESTAMP WHERE question_id = ?');
      stmt.run(answer, question_id);
      res.json({ message: 'Reflection updated', id: existing.id });
    } else {
      // Insert new
      const stmt = db.prepare('INSERT INTO reflections (question_id, question_text, answer) VALUES (?, ?, ?)');
      const result = stmt.run(question_id, question_text, answer);
      res.json({ message: 'Reflection saved', id: result.lastInsertRowid });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== SKILLS ROUTES ====================

// Get all skills
app.get('/api/skills', (req, res) => {
  try {
    const skills = db.prepare('SELECT * FROM skills ORDER BY id').all();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update skill progress
app.put('/api/skills/:id', (req, res) => {
  try {
    const { current_level, target_level } = req.body;
    const stmt = db.prepare('UPDATE skills SET current_level = ?, target_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(current_level, target_level, req.params.id);
    res.json({ message: 'Skill updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== WEEKLY REFLECTIONS ROUTES ====================

// Get weekly reflections
app.get('/api/weekly-reflections', (req, res) => {
  try {
    const reflections = db.prepare('SELECT * FROM weekly_reflections ORDER BY week_start_date DESC').all();
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weekly reflection by date
app.get('/api/weekly-reflections/:date', (req, res) => {
  try {
    const reflection = db.prepare('SELECT * FROM weekly_reflections WHERE week_start_date = ?').get(req.params.date);
    res.json(reflection || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save weekly reflection
app.post('/api/weekly-reflections', (req, res) => {
  try {
    const { week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently } = req.body;

    // Check if exists
    const existing = db.prepare('SELECT id FROM weekly_reflections WHERE week_start_date = ?').get(week_start_date);

    if (existing) {
      const stmt = db.prepare(`
        UPDATE weekly_reflections
        SET journal_entry = ?, created_this_week = ?, concept_clicked = ?, got_stuck = ?,
            protected_time = ?, do_differently = ?, updated_at = CURRENT_TIMESTAMP
        WHERE week_start_date = ?
      `);
      stmt.run(journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently, week_start_date);
      res.json({ message: 'Weekly reflection updated', id: existing.id });
    } else {
      const stmt = db.prepare(`
        INSERT INTO weekly_reflections (week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently);
      res.json({ message: 'Weekly reflection saved', id: result.lastInsertRowid });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== DAILY HABITS ROUTES ====================

// Get daily habits
app.get('/api/daily-habits', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let query = 'SELECT * FROM daily_habits';
    let params = [];

    if (start_date && end_date) {
      query += ' WHERE date BETWEEN ? AND ?';
      params = [start_date, end_date];
    }

    query += ' ORDER BY date DESC';

    const habits = db.prepare(query).all(...params);
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save/update daily habit
app.post('/api/daily-habits', (req, res) => {
  try {
    const { date, morning_deep_work, evening_exploration, weekend_build, notes } = req.body;

    const existing = db.prepare('SELECT id FROM daily_habits WHERE date = ?').get(date);

    if (existing) {
      const stmt = db.prepare(`
        UPDATE daily_habits
        SET morning_deep_work = ?, evening_exploration = ?, weekend_build = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE date = ?
      `);
      stmt.run(morning_deep_work, evening_exploration, weekend_build, notes, date);
      res.json({ message: 'Habit updated', id: existing.id });
    } else {
      const stmt = db.prepare(`
        INSERT INTO daily_habits (date, morning_deep_work, evening_exploration, weekend_build, notes)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = stmt.run(date, morning_deep_work, evening_exploration, weekend_build, notes);
      res.json({ message: 'Habit saved', id: result.lastInsertRowid });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PROBLEM SIGNALS ROUTES ====================

// Get all problem signals
app.get('/api/problem-signals', (req, res) => {
  try {
    const problems = db.prepare('SELECT * FROM problem_signals ORDER BY created_at DESC').all();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save problem signal
app.post('/api/problem-signals', (req, res) => {
  try {
    const { signal_type, title, description, category, validated } = req.body;
    const stmt = db.prepare(`
      INSERT INTO problem_signals (signal_type, title, description, category, validated)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(signal_type, title, description, category, validated || 0);
    res.json({ message: 'Problem signal saved', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update problem signal
app.put('/api/problem-signals/:id', (req, res) => {
  try {
    const { title, description, category, validated } = req.body;
    const stmt = db.prepare(`
      UPDATE problem_signals
      SET title = ?, description = ?, category = ?, validated = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(title, description, category, validated, req.params.id);
    res.json({ message: 'Problem signal updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete problem signal
app.delete('/api/problem-signals/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM problem_signals WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ message: 'Problem signal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== EXPERIMENTS ROUTES ====================

// Get experiments for a problem
app.get('/api/experiments/:problemId', (req, res) => {
  try {
    const experiments = db.prepare('SELECT * FROM experiments WHERE problem_signal_id = ? ORDER BY created_at DESC').all(req.params.problemId);
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save experiment
app.post('/api/experiments', (req, res) => {
  try {
    const { problem_signal_id, experiment_type, hypothesis, result, status } = req.body;
    const stmt = db.prepare(`
      INSERT INTO experiments (problem_signal_id, experiment_type, hypothesis, result, status)
      VALUES (?, ?, ?, ?, ?)
    `);
    const experimentResult = stmt.run(problem_signal_id, experiment_type, hypothesis, result || '', status || 'planned');
    res.json({ message: 'Experiment saved', id: experimentResult.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== MILESTONES ROUTES ====================

// Get all milestones
app.get('/api/milestones', (req, res) => {
  try {
    const milestones = db.prepare('SELECT * FROM milestones ORDER BY phase_number, id').all();
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update milestone
app.put('/api/milestones/:id', (req, res) => {
  try {
    const { completed, completion_date, notes, target_date } = req.body;
    const stmt = db.prepare(`
      UPDATE milestones
      SET completed = ?, completion_date = ?, notes = ?, target_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(completed, completion_date, notes, target_date, req.params.id);
    res.json({ message: 'Milestone updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add custom milestone
app.post('/api/milestones', (req, res) => {
  try {
    const { phase, phase_number, title, description, target_date } = req.body;
    const stmt = db.prepare(`
      INSERT INTO milestones (phase, phase_number, title, description, target_date)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(phase, phase_number, title, description, target_date);
    res.json({ message: 'Milestone created', id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STATS ROUTE ====================

app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      total_reflections: db.prepare('SELECT COUNT(*) as count FROM reflections WHERE answer IS NOT NULL AND answer != ""').get().count,
      total_skills: db.prepare('SELECT COUNT(*) as count FROM skills').get().count,
      avg_skill_level: Math.round(db.prepare('SELECT AVG(current_level) as avg FROM skills').get().avg || 0),
      total_problems: db.prepare('SELECT COUNT(*) as count FROM problem_signals').get().count,
      completed_milestones: db.prepare('SELECT COUNT(*) as count FROM milestones WHERE completed = 1').get().count,
      total_milestones: db.prepare('SELECT COUNT(*) as count FROM milestones').get().count,
      weekly_reflections_count: db.prepare('SELECT COUNT(*) as count FROM weekly_reflections').get().count,
      habits_this_month: db.prepare(`
        SELECT COUNT(*) as count FROM daily_habits
        WHERE date >= date('now', 'start of month')
      `).get().count
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Founder Growth Tracker API running on http://localhost:${PORT}`);
  console.log(`✓ Database: SQLite (Local)`);
  console.log(`✓ CORS enabled for local development`);
});
