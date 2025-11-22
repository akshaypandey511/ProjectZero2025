const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'founder-tracker.db');
const db = new sqlite3.Database(dbPath);

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Enable WAL mode for better concurrency
db.run('PRAGMA journal_mode = WAL');

module.exports = db;
