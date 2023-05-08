import express from "express";
import pool from "../configs/connectDB";
import APIController from "../controllers/APIController.js";
import userController from "../controllers/userController.js";
import adminController from "../controllers/adminController.js";
import homeController from "../controllers/homeController.js";
const multer = require("multer");
const formidable = require("formidable");
import path from "path";
var appRoot = require("app-root-path");
const fs = require("fs-extra");
const { promisify } = require("util");

let router = express.Router();

const roomsImgDir = appRoot + "/src/public/rooms_img";
// const roomsImgDir = "./src/public/rooms_img";
// console.log(">>> CHECK ROOMS IMG DIR <<<: ", roomsImgDir);
// console.log(appRoot);

const storage = multer.diskStorage({
  // noi save file img
  destination: async function (req, file, cb) {
    // console.log(">>> CHECK APPROOT <<<: ", appRoot);
    // console.log(">>> CHECK FILE <<<: ", req.body);
    // const roomId = req.body.roomId;
    // console.log(">>> CHECK DISK STORAGE <<<: ", req.headers);
    // const roomName = req.headers.roomname;
    // console.log(">>> CHECK ROOM ID <<<: ", roomName);
    // console.log(">>> CHECK ROOM ID <<<: ", req.headers);
    console.log(">>> CHECK ROOM ID <<<: ", req.body);
    const roomName = req.body.name;

    const roomSlug = roomName.toLowerCase().replace(/\s+/g, "_");
    // console.log(roomSlug);

    const roomDir = path.join(roomsImgDir, `${roomSlug}_img`);
    try {
      await fs.ensureDir(roomDir);
      cb(null, roomDir);
    } catch (err) {
      cb(err);
    }
    cb(null, roomDir);
    // cb(null, appRoot + "/src/public/rooms_img/");
  },

  // dat ten file doc nhat', kh bi trung`
  filename: function (req, file, cb) {
    // console.log(">>> CHECK req.files <<<", req.files);
    // console.log(">>> CHECK file<<<", file);
    const roomName = req.body.name.toLowerCase().replace(/\s+/g, "_"); // Lấy tên phòng từ body request
    const originalName = file.originalname; // Lấy tên tệp tin gốc
    // console.log(">>> CHECK ORIGINAL NAME <<<", originalName);

    cb(null, roomName + "-" + Date.now() + path.extname(file.originalname));
  },
});

// kh match duoi file thi bao loi
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|avif|AVIF)$/)
  ) {
    // req.fileValidationError = "Only image files are allowed!";
    // return cb(new Error("Only image files are allowed!"), false);
    const err = new Error("Only image files are allowed!");
    err.status = 400;
    return cb(err, false);
  }
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  // limits: { fileSize: 10 * 1024 * 1024 },
  // limits: { fieldSize: 25 * 1024 * 1024, fileSize: 5 * 1000000 },
});

const initAPIRoute = (app) => {
  // METHOD GET => Read data
  router.get("/users", APIController.getAllUsers);
  // router.get("/reload", (req, res) => {
  //   res.send("Reload request received.");
  //   reloadServer();
  // });

  // USER
  router.post("/login-user", userController.handleLogin);
  router.post("/create-user", userController.createNewUser);
  router.post("/forget-password-user", userController.forgetPasswordUser);
  router.get("/get-user", userController.getUser);
  router.get("/get-bookings-account", userController.getBookingsAccount);
  router.get(
    "/search-bookings-account",
    userController.getSearchBookingsAccount
  );
  router.put("/change-info-user", userController.changeInfoUser);
  router.post("/change-password-user", userController.changePasswordUser);

  router.get("/get-info-hotel", APIController.getInfoHotel);

  router.get("/get-list-rooms", APIController.getRooms);
  router.get("/get-list-rooms-related", APIController.getRoomsRelated);
  router.get("/get-search-rooms", APIController.getSearchRooms);

  router.post("/create-booking", APIController.createBooking);

  router.get("/get-list-FAQs", APIController.getListFAQs);
  router.get("/get-list-cuisine", APIController.getListCuisine);
  router.get("/get-list-service", APIController.getListService);

  // ADMIN
  router.post("/login-admin", adminController.handleAdminLogin);
  router.post("/create-admin", adminController.createNewAdmin);
  router.post("/forget-password-admin", adminController.forgetPasswordAdmin);

  //ADMIN HOTEL
  router.get("/get-info-hotel-admin", adminController.getInfoHotelAdmin);
  router.put("/edit-info-hotel-admin", adminController.editInfoHotelAdmin);

  // ADMIN ROOMS
  router.get("/get-rooms-admin", adminController.getRoomsAdmin);
  router.get("/search-rooms-admin", adminController.getSearchRoomsAdmin);
  router.post("/add-room-admin", adminController.createNewRoom);
  router.get("/get-room-edit", adminController.getRoomEdit);
  router.put("/edit-room-admin", adminController.editRoomAdmin);
  router.delete("/delete-room", adminController.deleteRoomAdmin);
  router.put("/active-room-admin", adminController.activeRoomAdmin);

  // ADMIN BOOKINGS
  router.get("/get-bookings-admin", adminController.getBookingsAdmin);
  router.get("/search-bookings-admin", adminController.getSearchBookingsAdmin);
  router.get("/get-booking-edit", adminController.getBookingEdit);
  router.put("/edit-booking-admin", adminController.editBookingAdmin);
  router.delete("/delete-booking", adminController.deleteBooking);
  router.put(
    "/change-status-booking-admin",
    adminController.changeStatusBooking
  );

  // ADMIN CUSTOMERS
  router.get("/get-customers-admin", adminController.getCustomersAdmin);
  router.get(
    "/search-customers-admin",
    adminController.getSearchCustomersAdmin
  );
  router.put("/edit-customer-admin", adminController.editCustomerAdmin);
  router.delete("/delete-customer", adminController.deleteCustomer);
  router.put("/active-customer-admin", adminController.activeCustomerAdmin);

  // ADMIN FAQS
  router.get("/get-faqs-admin", adminController.getFAQsAdmin);
  router.get("/search-faqs-admin", adminController.getSearchFAQsAdmin);
  router.post("/add-faq-admin", adminController.createNewFAQ);
  router.put("/edit-faq-admin", adminController.editFAQAdmin);
  router.delete("/delete-faq-admin", adminController.deleteFAQ);
  router.put("/active-faq-admin", adminController.activeFAQAdmin);

  // ADMIN CHANNEL
  router.get("/get-channels-admin", adminController.getListChannelAdmin);
  router.post("/add-channel-admin", adminController.createNewChannel);

  // ADMIN CONTACT
  router.get("/get-contact-admin", adminController.getContactAdmin);
  router.get("/search-contact-admin", adminController.getSearchContactAdmin);
  router.post("/add-contact-admin", adminController.createNewContact);
  router.delete("/delete-contact-admin", adminController.deleteContact);
  router.put(
    "/change-status-contact-admin",
    adminController.changeStatusContact
  );

  // ADMIN CUISINES
  router.get("/get-cuisines-admin", adminController.getCuisinesAdmin);
  router.get("/search-cuisines-admin", adminController.getSearchCuisinesAdmin);
  router.post("/add-cuisine-admin", adminController.createNewCuisine);
  router.put("/edit-cuisine-admin", adminController.editCuisineAdmin);
  router.delete("/delete-cuisine-admin", adminController.deleteCuisine);
  router.put("/active-cuisine-admin", adminController.activeCuisineAdmin);

  // ADMIN SERVICES
  router.get("/get-services-admin", adminController.getServicesAdmin);
  router.get("/search-services-admin", adminController.getSearchServicesAdmin);
  router.post("/add-service-admin", adminController.createNewService);
  router.put("/edit-service-admin", adminController.editServiceAdmin);
  router.delete("/delete-service-admin", adminController.deleteService);
  router.put("/active-service-admin", adminController.activeServiceAdmin);

  // ADMIN CHART
  router.get("/get-revenue-booking", async (req, res) => {
    try {
      const [rows, fields] = await pool.execute(`
        SELECT room_name, COUNT(*) AS quantity, SUM(total_price) AS total_price
        FROM bookings
        WHERE status <> 4 AND (status = 1 OR status = 2 OR status = 3)
        GROUP BY room_name;
      `);
      return res.status(200).json({
        message: "ok",
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  });

  // TEST UPLOAD
  // Route Xử lý upload
  // let imagePaths = [];
  // console.log(">>> ARR IMG INITIAL <<<: ", imagePaths);
  // router.post("/upload-image", upload.single("haha"), async (req, res) => {
  //   // Trả về đường dẫn của ảnh đã upload để hiển thị lên giao diện
  //   // console.log(">>> CHECK CONTROLLER UPLOAD <<<: ", req.file);
  //   console.log(">>> CHECK CONTROLLER UPLOAD <<<: ", req.headers.roomname);
  //   const roomName = req.headers.roomname;
  //   const oldImagePath = req.file.path;
  //   // console.log(">>> CHECK PREV IMG PATH TEMPORARY <<<: ", req.file.path); // lấy đường dẫn tạm thời của file

  //   // Deluxe Sky => deluxe_sky
  //   const roomSlug = roomName.toLowerCase().replace(/\s+/g, "_");
  //   const imgPath = `/rooms_img/${roomSlug}_img/${req.file.filename}`;

  //   // Thêm đường dẫn mới vào mảng
  //   imagePaths.push(imgPath);
  //   console.log(">>> CHECK ARR IMGPATHS UPLOAD <<<: ", imagePaths);

  //   res.status(200).json({
  //     imagePath: imgPath,
  //     message: "ok",
  //   });
  // });

  // router.delete("/delete-image", async (req, res) => {
  //   try {
  //     const { roomName } = req.body;
  //     const roomSlug = roomName.toLowerCase().replace(/\s+/g, "_");

  //     // Lấy đường dẫn ảnh đầu tiên trong mảng
  //     const imagePath = imagePaths[0];
  //     console.log(">>> CHECK ARR IMGPATH DELETE<<<: ", imagePath);

  //     const cutBaseName = path.basename(imagePath); // oldImageName sẽ là 'haha-1680065637471.JPG'
  //     const cutImagePath = `/${roomSlug}_img/${cutBaseName}`;

  //     // Xóa đường dẫn ảnh đầu tiên khỏi mảng
  //     imagePaths = imagePaths.slice(1);
  //     console.log(">>> CHECK ARR IMGPATHS DELETE <<<: ", imagePaths);

  //     const prevPathImg = path.join(roomsImgDir, cutImagePath);

  //     // Xóa ảnh đầu tiên khỏi thư mục
  //     await fs.remove(prevPathImg);

  //     res.status(200).json({
  //       message: "ok",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  return app.use("/api/v1", router);
};

// export
export default initAPIRoute;
