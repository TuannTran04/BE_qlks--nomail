import express from "express";

// - file configs: tuy chinh cac tham so cua he thong
// view Engine hay cach goi khac la template Engine

const configViewEngine = (app) => {
  // chi cho nguoi ngoai` truy cap vao trong folder public (set quyen access)
  app.use(express.static("./src/public"));

  // cau hinh view Engine cua no la EJS
  app.set("view engine", "ejs");

  // Lam cho Express no biet cach tim file EJS o dau
  app.set("views", "./src/views");
};

export default configViewEngine;
