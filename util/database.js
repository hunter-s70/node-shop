const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  host: '',
  user: '',
  database: '',
  password: ''
});

module.exports = pool.promise();