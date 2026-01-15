const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MARIA_HOST,
  user: process.env.MARIA_USER,
  password: process.env.MARIA_PASS,
  database: process.env.MARIA_DB
});

module.exports = pool;
