import pool from "../configs/connectDB";
import CRUDService from "../services/CRUDService";
// import bcrypt from "bcryptjs";
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);
const qs = require("qs");

let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `customers`");

  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let getInfoHotel = async (req, res) => {
  const [hotel] = await pool.execute("SELECT * FROM hotel");

  return res.status(200).json({
    message: "ok",
    data: hotel[0],
  });
};

let getRooms = async (req, res) => {
  try {
    // const params = JSON.stringify(req.query);
    const { page, pageSize, filterStatus } = req.query;
    // console.log(req.query);

    const dataRoom = await CRUDService.getRooms(page, pageSize, filterStatus);
    // console.log(dataRoom);
    return res.status(200).json({
      message: "ok",
      total: dataRoom.total,
      data: dataRoom.roomList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let getRoomsRelated = async (req, res) => {
  // rows la 1 arr chua cac phan tu obj row data trong table
  try {
    const roomId = req.query.roomId;
    const [listRoomRelated] = await pool.execute(
      "SELECT * FROM rooms WHERE id != ? AND disabled = 0",
      [roomId]
    );
    // console.log(listRoomRelated);
    // console.log(listRoomRelated.length);
    let randomIndexes = [];
    while (
      randomIndexes.length < 5 &&
      randomIndexes.length < listRoomRelated.length
    ) {
      let randomIndex = Math.floor(Math.random() * listRoomRelated.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    // console.log(randomIndexes);

    const data = [];
    for (let i = 0; i < randomIndexes.length; i++) {
      const index = randomIndexes[i];
      data.push(listRoomRelated[index]);
    }
    // console.log(data);
    return res.status(200).json({
      message: "ok",
      // total: dataRoom.total,
      data: data,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let getSearchRooms = async (req, res) => {
  try {
    const limit = parseInt(req.query.pageSize);
    const offset = (req.query.page - 1) * limit;
    const filterStatus = req.query.filterStatus;
    const query = req.query.q;
    // console.log(limit, offset, filterStatus, query);
    // console.log(typeof limit, typeof offset, typeof filterStatus, typeof query);

    let sqlStatement = "SELECT * FROM rooms ";
    let params = [];

    if (filterStatus === "0") {
      sqlStatement += " WHERE quantity > 0 AND disabled = 0 ";
      params = [];
    } else if (filterStatus === "1") {
      sqlStatement += " WHERE quantity = 0 AND disabled = 0 ";
    } else {
      sqlStatement += " WHERE disabled = 0";
      params = [];
    }
    // console.log(params);

    const [roomList, fields] = await pool.execute(sqlStatement, params);
    const results = roomList.filter((room) =>
      room.name.toLowerCase().includes(query.toLowerCase())
    );

    // Lấy chỉ số phần tử từ vị trí offset đến offset + limit
    const startIndex = offset;
    const endIndex = offset + limit;
    // console.log(endIndex);
    const data = results.slice(startIndex, endIndex);
    // Lấy tổng số phần tử thỏa mãn điều kiện
    const total = results.length;
    // console.log(total);

    res.status(200).json({
      message: "search success",
      total: total,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let createBooking = async (req, res) => {
  try {
    console.log(req.body);

    let dataBooking = await CRUDService.handleDataBooking(req.body);

    res.json({
      errCode: 0,
      success: true,
      message: "Thông tin booking của bạn đã được lưu trữ thành công!",
    });
  } catch (err) {
    console.error(">>> CHECK ERROR BOOKING<<<", err);
    res.status(500).json({ error: err || "Internal server error" });
  }
};

let getListFAQs = async (req, res) => {
  const [listFAQs, fields] = await pool.execute(
    "SELECT * FROM `faqs` WHERE disabled = 0"
  );

  return res.status(200).json({
    message: "ok",
    data: listFAQs,
  });
};

let getListCuisine = async (req, res) => {
  // rows la 1 arr chua cac phan tu obj row data trong table
  try {
    const page = req.query.page || "1";
    const pageSize = req.query.pageSize || "5";
    // console.log(">>> CHECK PAGE <<<: ", page);
    // console.log(">>> CHECK PAGESIZE <<<: ", pageSize);
    const dataCuisine = await CRUDService.getCuisines(page, pageSize);
    // console.log(dataCuisine);
    return res.status(200).json({
      message: "ok",
      total: dataCuisine.total,
      data: dataCuisine.cuisineList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let getListService = async (req, res) => {
  // rows la 1 arr chua cac phan tu obj row data trong table
  try {
    const page = req.query.page || "1";
    const pageSize = req.query.pageSize || "5";
    // console.log(">>> CHECK PAGE <<<: ", page);
    // console.log(">>> CHECK PAGESIZE <<<: ", pageSize);
    const dataService = await CRUDService.getServices(page, pageSize);
    // console.log(dataService);
    return res.status(200).json({
      message: "ok",
      total: dataService.total,
      data: dataService.serviceList,
    });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getInfoHotel,
  getRooms,
  getRoomsRelated,
  getSearchRooms,
  createBooking,
  getListFAQs,
  getListCuisine,
  getListService,

  // createNewUser,
  // updateUser,
  // deleteUser,
};
