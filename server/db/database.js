const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

// Create the Reading table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS Reading (
        id INTEGER PRIMARY KEY,
        sensor_id INTEGER NOT NULL,
        value REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`, (err) => {
    if (err) {
        console.error('Error creating Reading table:', err);
    } else {
        console.log('Reading table created successfully');
    }
});

module.exports = db;
