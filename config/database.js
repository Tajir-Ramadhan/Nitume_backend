import mysql from "mysql2";

// create the connection to database


const db = mysql.createConnection({
  host: process.env.JAWSDB_URL.split('@')[1].split('/')[0],
  user: process.env.JAWSDB_URL.split('//')[1].split(':')[0],
  password: process.env.JAWSDB_URL.split(':')[2].split('@')[0],
  database: 'db_restaurant',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to db_restaurant database.');
});

export default db;