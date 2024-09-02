import mysql from "mysql2";
import url from 'url';

// Parse the JAWSDB_URL environment variable
const dbUrl = new url.URL(process.env.JAWSDB_MARIA_URL);

const db = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Temporarily connect to the existing database
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.error('Initial database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');

});

// Export the new connection
export default db;