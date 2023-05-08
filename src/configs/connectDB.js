// get the client
// const mysql = require("mysql2");
import mysql from "mysql2/promise";
require("dotenv").config();

//------------- Create the connection pool (cach dung` Pool de dung async await)
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "qlks",
// });

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
});

export default pool;
