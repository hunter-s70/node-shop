const dotenv = require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME_SQL,
  password: process.env.DB_PASS
});

// create products table
const products = connection
  .promise()
  .query(`CREATE TABLE IF NOT EXISTS products
          (id INT(10) AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255),
          price DOUBLE,
          description TEXT,
          imageUrl VARCHAR(255))`);


Promise.all([products])
  .then(() => {
    connection.end();
  })
  .catch((err) => {
    console.log(err);
    connection.end();
  });
