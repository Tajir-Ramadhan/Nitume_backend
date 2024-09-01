import mysql from "mysql2";
import url from 'url';

// Parse the JAWSDB_URL environment variable
const dbUrl = new url.URL(process.env.JAWSDB_URL);

const db = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Temporarily connect to the existing database
  multipleStatements: true
});

// SQL Commands to create tables
const insertFoodDataSQL = `
INSERT INTO food (food_name, food_star, food_vote, food_price, food_discount, food_desc, food_status, food_type, food_category, food_src)
VALUES
("carne asada tacos","4.5", "999", "12.00", "0.00", "03 pieces per serving", "best seller", "meat", "taco", "taco/taco-1.png"),
("shrimp tacos","4.5", "999", "15.00", "3.00", "03 pieces per serving", "best seller", "meat", "taco", "taco/taco-2.png"),
("barbacoa tacos","4.5","500","12.00","0.00","03 pieces per serving","best seller","meat","taco","taco/taco-3.png"),
("tacos al pastor","4.5","999","13.00","2.00","03 pieces per serving","best seller","meat","taco","taco/taco-4.png"),
("tinga tacos","4","500","11.00","0.00","03 pieces per serving","normal","meat","taco","taco/taco-5.png"),
("campechanos tacos","4","500","11.00","1.00","03 pieces per serving","new dishes","meat","taco","taco/taco-6.png"),
("carnitas tacos","4.5","500","14.00","2.00","03 pieces per serving","seasonal dishes online only","meat","taco","taco/taco-7.png"),
("vegan tacos","4.5","100","9.00","2.00","03 pieces per serving","new dishes","vegan","taco","taco/taco-8.png"),
("wet burrito","4.5","600","14.00","0.00","01 roll per serving","new dishes","meat","burrito","burrito/burrito-1.png"),
("poncho burrito","4.5","999","15.00","3.00","01 roll per serving","best seller","meat","burrito","burrito/burrito-2.png"),
("bean & cheese burrito","4.5","999","14.00","0.00","01 roll per serving","best seller","vegan","burrito","burrito/burrito-3.png"),
("breakfast burrito","4.5","999","12.00","2.00","01 roll per serving","new dishes","meat","burrito","burrito/burrito-4.png"),
("california burrito","4.5","999","14.00","0.00","01 roll per serving","best seller","meat","burrito","burrito/burrito-5.png"),
("chimichanga","4","400","12.00","2.00","01 roll per serving","seasonal dishes","meat","burrito","burrito/burrito-6.png"),
("nacho tots","4","699","12.00","2.00","01 tray per serving","best seller","meat","nachos","nachos/nachos-1.png"),
("root beer pork nachos","4.5","999","12.00","0.00","01 tray per serving","best seller","meat","nachos","nachos/nachos-2.png"),
("shrimp nachos","4.5","999","17.00","2.00","01 tray per serving","best seller","meat","nachos","nachos/nachos-3.png"),
("chicken nachos","4.5","999","11.00","0.00","01 tray per serving","best seller","meat","nachos","nachos/nachos-4.png"),
("only nachos","4","999","7.00","2.00","01 tray per serving","normal","vegan","nachos","nachos/nachos-5.png"),
("pico de gallo","4.5","999","5.00","2.00","01 bowl per serving","best seller","vegan","nachos","nachos/salsa-1.png"),
("salsa guille","4","699","5.00","2.00","01 bowl per serving","best seller","vegan","nachos","nachos/salsa-2.png"),
("tomatillo salsa","4.5","499","5.00","2.00","01 bowl per serving","seasonal dishes","vegan","nachos","nachos/salsa-3.png"),
("roasted tomato salsa","4.5","999","5.00","2.00","01 bowl per serving","best seller","vegan","nachos","nachos/salsa-4.png"),
("guacamole","4.5","699","5.00","2.00","01 bowl per serving","best seller","vegan","nachos","nachos/salsa-5.png"),
("corn salad","3.5","699","5.00","1.00","01 bowl per serving","new dishes seasonal dishes","vegan","sides","side/side-1.png"),
("keto taquitos","4.5","999","9.00","0.00","05 pieces per serving","best seller","meat","sides","side/side-2.png"),
("mexican rice","4","200","5.00","0.00","01 bowl per serving","normal","vegan","sides","side/side-3.png"),
("cilantro lime rice","4","100","5.00","0.00","01 bowl per serving","new dishes","vegan","sides","side/side-4.png"),
("chicken tortilla soup","3.5","299","10.00","2.00","01 bowl per serving","new dishes","meat","sides","side/side-5.png"),
("Churros","4.5","999","7.00","0.00","05 pieces per serving","best seller","vegan","dessert","dessert/dessert-1.png"),
("Fried Ice Cream","4.5","999","5.00","1.00","01 piece per serving","best seller","vegan","dessert","dessert/dessert-2.png"),
("Dulce de Leche","4.5","50","4.00","0.00","01 bowl per serving","new dishes","vegan","dessert","dessert/dessert-3.png"),
("Sweet Corn Cake","3","599","4.00","1.00","02 pieces per serving","seasonal dishes online only","vegan","dessert","dessert/dessert-4.png"),
("Sopapillas","4","199","4.00","0.00","10 pieces per serving","normal","vegan","dessert","dessert/dessert-5.png"),
("Tres Leches Cake","4.5","99","6.00","2.00","01 piece per serving","best seller","vegan","dessert","dessert/dessert-6.png"),
("Coke","4.5","500","4.00","0.00","01 glass per serving","best seller","drinks","drink","drink/drink-1.png"),
("Dr Pepper","4.5","300","4.00","0.00","01 glass per serving","normal","drinks","drink","drink/drink-2.png"),
("Sprite","4.5","999","4.00","0.00","01 glass per serving","normal","drinks","drink","drink/drink-3.png"),
("Orange Soda","4.5","299","4.00","0.00","01 glass per serving","new dishes","drinks","drink","drink/drink-4.png"),
("Pineapple Juice","4.5","599","4.00","1.00","01 glass per serving","new dishes","drinks","drink","drink/drink-5.png"),
("Margaritas","4.5","899","9.00","2.00","01 glass per serving","best seller","drinks","drink","drink/drink-6.png"),
("Ice Lemon Tea","4.5","999","4.00","1.00","01 glass per serving","best seller","drinks","drink","drink/drink-7.png");
`;

db.connect(err => {
  if (err) {
    console.error('Initial database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
  try{
    db.query(insertFoodDataSQL);
    console.log('Tables data inserted correctly.');
  }
  catch (err) {
    console.error('Error creating tables:', err.stack);
    process.exit(1); // Exit the process if connection or table creation fails
  }

});

// Export the new connection
export default db;