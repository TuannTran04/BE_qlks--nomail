// import connection from "../configs/connectDB";
import pool from "../configs/connectDB";
import multer from "multer";

let getHomepage = async (req, res) => {
  // rows la 1 arr chua cac phan tu obj row data trong table
  const [rows, fields] = await pool.execute("SELECT * FROM `customers`");

  return res.send("index.ejs");
};

module.exports = {
  getHomepage,
};
