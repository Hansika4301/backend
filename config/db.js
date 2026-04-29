const mysql = require("mysql2/promise");

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
} catch (err) {
  console.log("DB skipped");
}

module.exports = pool;