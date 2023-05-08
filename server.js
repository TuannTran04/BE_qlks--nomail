import configViewEngine from "./src/configs/viewEngine.js";
import express from "express";
import morgan from "morgan";
// const path = require("path");
import cors from "cors";

require("dotenv").config(); // package de dung bien global process.env
// console.log(process.env); // log o server side thoi (nhin terminal), khong co o console devtool tren browser dau

import initWebRoute from "./src/route/web.js";
import inintAPIRoute from "./src/route/api.js";
import connection from "./src/configs/connectDB.js";

const app = express(); // create instant app ( ke thua cac method cua express, nhu Class ES6+)
// app.use(cors({ origin: true }));
app.use(cors());
app.use(function (req, res, next) {
  // cho phép URL_REACT nào đc phép gọi đến api
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,text/plain"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
const bodyParser = require("body-parser");

// Middleware morgan logging
// app.use(morgan("combined"));

const port = process.env.PORT || 6969;

// Cấu hình Express gửi POST request (gui data client len server va cta co the lay dc data 1 cach don gian)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Config View Engine EJS
configViewEngine(app);

// init web routes
initWebRoute(app);

// init api routes
inintAPIRoute(app);

// handle 404 not found (middleware level app)
app.use((req, res) => {
  return res.send("404.ejs");
});

app.listen(port, () => {
  console.log(`re-load server`);
  console.log(`Example app listening on port ${port}`);
});
