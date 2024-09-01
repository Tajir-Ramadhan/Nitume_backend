import mysql from "mysql2";
import url from 'url';

// Parse the JAWSDB_URL environment variable
const dbUrl = new url.URL(process.env.JAWSDB_URL);

const connection = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Temporarily connect to the existing database
});

connection.connect(err => {
  if (err) {
    console.error('Initial database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the existing database.');

  // Check if the db_restaurant database exists and create it if not
  connection.query(`CREATE DATABASE IF NOT EXISTS db_restaurant`, (err, results) => {
    if (err) {
      console.error('Failed to create db_restaurant database:', err.stack);
      return;
    }
    console.log('Database db_restaurant is ready.');

    // Close the initial connection
    connection.end();

    // Reconnect to the db_restaurant database
    const db = mysql.createConnection({
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      database: 'db_restaurant',
    });

    db.connect(err => {
      if (err) {
        console.error('Connection to db_restaurant database failed:', err.stack);
        return;
      }
      console.log('Connected to db_restaurant database.');
    });

    
  });
});

// Export the new connection
export default db;