import mysql from "mysql2";
import url from 'url';

// Parse the JAWSDB_URL environment variable
const dbUrl = new url.URL(process.env.JAWSDB_URL);

const db = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1),  // removes leading '/' from pathname
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

export default db;