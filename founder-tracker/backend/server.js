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
  db.all('SELECT * FROM reflections ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get reflection by question_id
app.get('/api/reflections/:questionId', (req, res) => {
  db.get('SELECT * FROM reflections WHERE question_id = ? ORDER BY updated_at DESC LIMIT 1', [req.params.questionId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || null);
  });
});

// Save or update reflection
app.post('/api/reflections', (req, res) => {
  const { question_id, question_text, answer } = req.body;

  // Check if reflection exists
  db.get('SELECT id FROM reflections WHERE question_id = ?', [question_id], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (existing) {
      // Update existing
      db.run('UPDATE reflections SET answer = ?, updated_at = CURRENT_TIMESTAMP WHERE question_id = ?', [answer, question_id], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Reflection updated', id: existing.id });
      });
    } else {
      // Insert new
      db.run('INSERT INTO reflections (question_id, question_text, answer) VALUES (?, ?, ?)', [question_id, question_text, answer], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Reflection saved', id: this.lastID });
      });
    }
  });
});

// ==================== SKILLS ROUTES ====================

// Get all skills
app.get('/api/skills', (req, res) => {
  db.all('SELECT * FROM skills ORDER BY id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update skill progress
app.put('/api/skills/:id', (req, res) => {
  const { current_level, target_level } = req.body;
  db.run('UPDATE skills SET current_level = ?, target_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [current_level, target_level, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Skill updated' });
  });
});

// ==================== WEEKLY REFLECTIONS ROUTES ====================

// Get weekly reflections
app.get('/api/weekly-reflections', (req, res) => {
  db.all('SELECT * FROM weekly_reflections ORDER BY week_start_date DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get weekly reflection by date
app.get('/api/weekly-reflections/:date', (req, res) => {
  db.get('SELECT * FROM weekly_reflections WHERE week_start_date = ?', [req.params.date], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || null);
  });
});

// Save weekly reflection
app.post('/api/weekly-reflections', (req, res) => {
  const { week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently } = req.body;

  // Check if exists
  db.get('SELECT id FROM weekly_reflections WHERE week_start_date = ?', [week_start_date], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (existing) {
      db.run(`
        UPDATE weekly_reflections
        SET journal_entry = ?, created_this_week = ?, concept_clicked = ?, got_stuck = ?,
            protected_time = ?, do_differently = ?, updated_at = CURRENT_TIMESTAMP
        WHERE week_start_date = ?
      `, [journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently, week_start_date], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Weekly reflection updated', id: existing.id });
      });
    } else {
      db.run(`
        INSERT INTO weekly_reflections (week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [week_start_date, journal_entry, created_this_week, concept_clicked, got_stuck, protected_time, do_differently], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Weekly reflection saved', id: this.lastID });
      });
    }
  });
});

// ==================== DAILY HABITS ROUTES ====================

// Get daily habits
app.get('/api/daily-habits', (req, res) => {
  const { start_date, end_date } = req.query;
  let query = 'SELECT * FROM daily_habits';
  let params = [];

  if (start_date && end_date) {
    query += ' WHERE date BETWEEN ? AND ?';
    params = [start_date, end_date];
  }

  query += ' ORDER BY date DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Save/update daily habit
app.post('/api/daily-habits', (req, res) => {
  const { date, morning_deep_work, evening_exploration, weekend_build, notes } = req.body;

  db.get('SELECT id FROM daily_habits WHERE date = ?', [date], (err, existing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (existing) {
      db.run(`
        UPDATE daily_habits
        SET morning_deep_work = ?, evening_exploration = ?, weekend_build = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE date = ?
      `, [morning_deep_work, evening_exploration, weekend_build, notes, date], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Habit updated', id: existing.id });
      });
    } else {
      db.run(`
        INSERT INTO daily_habits (date, morning_deep_work, evening_exploration, weekend_build, notes)
        VALUES (?, ?, ?, ?, ?)
      `, [date, morning_deep_work, evening_exploration, weekend_build, notes], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Habit saved', id: this.lastID });
      });
    }
  });
});

// ==================== PROBLEM SIGNALS ROUTES ====================

// Get all problem signals
app.get('/api/problem-signals', (req, res) => {
  db.all('SELECT * FROM problem_signals ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Save problem signal
app.post('/api/problem-signals', (req, res) => {
  const { signal_type, title, description, category, validated } = req.body;
  db.run(`
    INSERT INTO problem_signals (signal_type, title, description, category, validated)
    VALUES (?, ?, ?, ?, ?)
  `, [signal_type, title, description, category, validated || 0], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Problem signal saved', id: this.lastID });
  });
});

// Update problem signal
app.put('/api/problem-signals/:id', (req, res) => {
  const { title, description, category, validated } = req.body;
  db.run(`
    UPDATE problem_signals
    SET title = ?, description = ?, category = ?, validated = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [title, description, category, validated, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Problem signal updated' });
  });
});

// Delete problem signal
app.delete('/api/problem-signals/:id', (req, res) => {
  db.run('DELETE FROM problem_signals WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Problem signal deleted' });
  });
});

// ==================== EXPERIMENTS ROUTES ====================

// Get experiments for a problem
app.get('/api/experiments/:problemId', (req, res) => {
  db.all('SELECT * FROM experiments WHERE problem_signal_id = ? ORDER BY created_at DESC', [req.params.problemId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Save experiment
app.post('/api/experiments', (req, res) => {
  const { problem_signal_id, experiment_type, hypothesis, result, status } = req.body;
  db.run(`
    INSERT INTO experiments (problem_signal_id, experiment_type, hypothesis, result, status)
    VALUES (?, ?, ?, ?, ?)
  `, [problem_signal_id, experiment_type, hypothesis, result || '', status || 'planned'], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Experiment saved', id: this.lastID });
  });
});

// ==================== MILESTONES ROUTES ====================

// Get all milestones
app.get('/api/milestones', (req, res) => {
  db.all('SELECT * FROM milestones ORDER BY phase_number, id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update milestone
app.put('/api/milestones/:id', (req, res) => {
  const { completed, completion_date, notes, target_date } = req.body;
  db.run(`
    UPDATE milestones
    SET completed = ?, completion_date = ?, notes = ?, target_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [completed, completion_date, notes, target_date, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Milestone updated' });
  });
});

// Add custom milestone
app.post('/api/milestones', (req, res) => {
  const { phase, phase_number, title, description, target_date } = req.body;
  db.run(`
    INSERT INTO milestones (phase, phase_number, title, description, target_date)
    VALUES (?, ?, ?, ?, ?)
  `, [phase, phase_number, title, description, target_date], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Milestone created', id: this.lastID });
  });
});

// ==================== STATS ROUTE ====================

app.get('/api/stats', (req, res) => {
  const stats = {};

  db.get('SELECT COUNT(*) as count FROM reflections WHERE answer IS NOT NULL AND answer != ""', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.total_reflections = row.count;

    db.get('SELECT COUNT(*) as count FROM skills', [], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.total_skills = row.count;

      db.get('SELECT AVG(current_level) as avg FROM skills', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.avg_skill_level = Math.round(row.avg || 0);

        db.get('SELECT COUNT(*) as count FROM problem_signals', [], (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
          stats.total_problems = row.count;

          db.get('SELECT COUNT(*) as count FROM milestones WHERE completed = 1', [], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.completed_milestones = row.count;

            db.get('SELECT COUNT(*) as count FROM milestones', [], (err, row) => {
              if (err) return res.status(500).json({ error: err.message });
              stats.total_milestones = row.count;

              db.get('SELECT COUNT(*) as count FROM weekly_reflections', [], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.weekly_reflections_count = row.count;

                db.get(`SELECT COUNT(*) as count FROM daily_habits WHERE date >= date('now', 'start of month')`, [], (err, row) => {
                  if (err) return res.status(500).json({ error: err.message });
                  stats.habits_this_month = row.count;

                  res.json(stats);
                });
              });
            });
          });
        });
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Founder Growth Tracker API running on http://localhost:${PORT}`);
  console.log(`✓ Database: SQLite (Local)`);
  console.log(`✓ CORS enabled for local development`);
});
