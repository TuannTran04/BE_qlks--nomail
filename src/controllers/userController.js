import pool from "../configs/connectDB";
import userService from "../services/userService.js";
// import bcrypt from "bcryptjs";
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);

//>>>>>>>>>>>>>>>>>>> USER LOGIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let handleLogin = async (req, res) => {
  let email = req.body.email;
  console.log(email);
  let password = req.body.password;
  console.log(password);

  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      message: "error missing. please add parameters",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user
      ? {
          id: userData.user[0].id,
          email: userData.user[0].email,
          name: userData.user[0].name,
        }
      : {},
  });
};

//>>>>>>>>>>>>>>>>>>> USER REGISTER <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let createNewUser = async (req, res) => {
  let { id, email, name, password, confirmPassword } = req.body;
  console.log(">>> CHECK RES.BODY <<<: ", req.body);

  if (!email || !name || !password || !confirmPassword) {
    return res.status(200).json({
      errCode: 1,
      message: "missing required params",
    });
  }

  let userData = await userService.createNewUser(req.body);
  // console.log(message);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let forgetPasswordUser = async (req, res) => {
  let { email, password, confirmPassword } = req.body;
  console.log(">>> CHECK RES.BODY <<<: ", req.body);

  if (!email || !password || !confirmPassword) {
    return res.status(200).json({
      errCode: 1,
      message: "missing required params",
    });
  }

  let userData = await userService.forgetPasswordUser(req.body);
  console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
  });
};

let getUser = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const [customer, fields] = await pool.execute(
      "SELECT * FROM customers where id = ?",
      [customerId]
    );
    if (!customer || customer.length === 0) {
      return res.status(200).json({
        message: "not found customer",
        data: {},
      });
    }

    const { id, name, email, address, phone } = customer[0];

    return res.status(200).json({
      message: "get customer ok",
      data: customer ? { id, name, email, address, phone } : {},
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

let getBookingsAccount = async (req, res) => {
  try {
    const page = req.query.page || "1";
    const pageSize = req.query.pageSize || "5";
    const customerId = req.query.customerId;
    const filterStatus = req.query.filterStatus;
    // console.log(">>> CHECK PAGE <<<: ", page);
    // console.log(">>> CHECK PAGESIZE <<<: ", pageSize);
    // console.log(">>> CHECK PAGESIZE <<<: ", customerId);
    const dataBooking = await userService.getBookings(
      page,
      pageSize,
      customerId,
      filterStatus
    );
    // console.log(dataBooking);
    return res.status(200).json({
      message: "ok",
      total: dataBooking.total,
      data: dataBooking.bookingList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let getSearchBookingsAccount = async (req, res) => {
  try {
    console.log(req.query);
    const customerId = req.query.customerId;
    const limit = parseInt(req.query.pageSize);
    const offset = (req.query.page - 1) * limit;
    const query = req.query.q;

    let sqlStatement = "SELECT * FROM bookings ";
    let params = [];
    const filterStatus = req.query.filterStatus;
    // console.log(">>> CHECK FILTER STATUS <<<", filterStatus);
    if (filterStatus) {
      sqlStatement += " WHERE customer_id = ? AND status = ?";
      params = [customerId, filterStatus];
    } else {
      sqlStatement += " WHERE customer_id = ?";
      params = [customerId];
    }

    const [bookingList, fields] = await pool.execute(sqlStatement, params);
    const results = bookingList.filter((booking) =>
      booking.room_name.toLowerCase().includes(query.toLowerCase())
    );

    // console.log(results.length);

    // Lấy chỉ số phần tử từ vị trí offset đến offset + limit
    const startIndex = offset;
    const endIndex = offset + limit;
    // console.log(endIndex);
    const data = results.slice(startIndex, endIndex);
    // console.log(data);
    // Lấy tổng số phần tử thỏa mãn điều kiện
    const total = results.length;
    // console.log(total);

    res.status(200).json({
      message: "search success",
      // data: results,
      total: total,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

let changeInfoUser = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    console.log(">>> CHECK customerId <<<: ", customerId);

    if (!(await checkUserExist(customerId))) {
      return res.status(400).json({ error: "user does not exist" });
    }

    const dataRes = await userService.handleChangeInfoUser(
      customerId,
      req.body
    );
    console.log(dataRes);

    return res.status(200).json({
      message: "change info ok",
      // data: dataRoom[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err || "Internal server error" });
  }
};

let changePasswordUser = async (req, res) => {
  try {
    const customerId = req.query.customerId;
    console.log(">>> CHECK customerId <<<: ", customerId);
    if (!(await checkUserExist(customerId))) {
      return res.status(400).json({ error: "user does not exist" });
    }

    console.log(">>> CHECK dataUser <<<: ", req.body);

    let userData = await userService.handleChangePasswordUser(
      customerId,
      req.body
    );
    console.log(userData);

    return res.status(200).json({
      message: "change password ok",
      // data: dataRoom[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};

// FUNCTION
let checkUserExist = async (customerId) => {
  const stringCustomerId = customerId.toString();
  const [user] = await pool.execute(`SELECT * FROM customers WHERE id = ? `, [
    stringCustomerId,
  ]);
  if (user.length === 0) {
    return false;
  }
  return true;
};

module.exports = {
  handleLogin,
  createNewUser,
  forgetPasswordUser,
  getUser,
  getBookingsAccount,
  getSearchBookingsAccount,
  changeInfoUser,
  changePasswordUser,
};
