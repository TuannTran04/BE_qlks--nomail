// file web.js la de qly nhung route trong website cua chung ta

import express from "express";
import homeController from "../controllers/homeController.js";
import multer from "multer";
import path from "path";

var appRoot = require("app-root-path");
let router = express.Router();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>> INIT ROUTE WEB <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);

  return app.use("/", router);
};

// export
export default initWebRoute;
