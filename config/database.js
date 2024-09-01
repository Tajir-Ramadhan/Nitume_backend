import mysql from "mysql2";
import url from 'url';

// Parse the JAWSDB_URL environment variable
const dbUrl = new url.URL(process.env.JAWSDB_URL);

const db = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Temporarily connect to the existing database
});

// SQL Commands to create tables
const createTablesSQL = `
CREATE TABLE IF NOT EXISTS food(
    food_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    food_name VARCHAR(255), 
    food_star VARCHAR(255),
    food_vote VARCHAR(255),
    food_price VARCHAR(255),
    food_discount VARCHAR(255),
    food_desc VARCHAR(255),
    food_status VARCHAR(255),
    food_type VARCHAR(255),
    food_category VARCHAR(255),
    food_src VARCHAR(255)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS user( 
    user_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    user_name VARCHAR(255), 
    user_email VARCHAR(255),
    user_phone VARCHAR(255),
    user_password VARCHAR(255),
    user_birth VARCHAR(255),
    user_gender VARCHAR(255)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS cart (
  user_id INT,
  food_id INT,
  item_qty INT,
  PRIMARY KEY (user_id, food_id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS booktable( 
    book_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    book_name VARCHAR(255), 
    book_phone VARCHAR(255),
    book_people INT,
    book_tables INT,
    user_id INT,
    book_when VARCHAR(255),
    book_note TEXT
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS billdetails (
  bill_id INT,
  food_id INT,
  item_qty INT,
  PRIMARY KEY (bill_id, food_id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS billstatus (
  bill_id INT,
  user_id INT,
  bill_phone VARCHAR(255),
  bill_address TEXT,
  bill_when VARCHAR(255),
  bill_method VARCHAR(255),
  bill_discount INT,
  bill_delivery INT,
  bill_total INT,
  bill_paid VARCHAR(255),
  bill_status INT,
  PRIMARY KEY (bill_id)
) ENGINE=INNODB;
`;

db.connect(err => {
  if (err) {
    console.error('Initial database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
  try{
    db.query(createTablesSQL);
    console.log('Tables created or already exist.');
  }
  catch (err) {
    console.error('Error creating tables:', err.stack);
    process.exit(1); // Exit the process if connection or table creation fails
  }

});

// Export the new connection
export default db;