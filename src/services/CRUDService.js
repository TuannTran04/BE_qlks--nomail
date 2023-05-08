import pool from "../configs/connectDB";
const nodemailer = require("nodemailer");
// import bcrypt from "bcryptjs";
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);

let getRooms = (page, pageSize, filterStatus) => {
  // console.log("PAGE", page, "PAGE SIZE", pageSize, filterStatus);
  // console.log(typeof page, typeof pageSize, typeof filterStatus);
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize;
      const offset = (page - 1) * limit;

      // console.log(typeof limit, typeof offset, typeof filterStatus);

      let query = "SELECT * FROM rooms ";
      let params = [];

      if (filterStatus === "0") {
        query += " WHERE quantity > 0 AND disabled = 0 LIMIT ?, ? ";
        params = [offset, limit];
      } else if (filterStatus === "1") {
        query += " WHERE quantity = 0 AND disabled = 0 LIMIT ?, ? ";
        params = [offset, limit];
      } else {
        query += " WHERE disabled = 0 LIMIT ?, ? ";
        params = [offset, limit];
      }
      // console.log(params);
      const convertStringParams = params.map((param, i) => param.toString());
      console.log(convertStringParams);

      const [roomList, fields] = await pool.execute(query, convertStringParams);

      // Truy vấn số lượng dịch vụ
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM rooms";
      let paramsCountSql = [];

      if (filterStatus === "0") {
        countSql += " WHERE quantity > 0 AND disabled = 0";
        const [totalRooms, _] = await pool.execute(countSql, paramsCountSql);
        total = totalRooms[0].total;
      } else if (filterStatus === "1") {
        countSql += " WHERE quantity = 0 AND disabled = 0";
        const [totalRooms, _] = await pool.execute(countSql, paramsCountSql);
        total = totalRooms[0].total;
      } else {
        countSql += " WHERE disabled = 0";
        const [totalRooms, _] = await pool.execute(countSql, paramsCountSql);
        total = totalRooms[0].total;
      }
      resolve({ roomList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleDataBooking = (dataBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        roomId,
        userId,
        nameRoom,
        checkin,
        checkout,
        name,
        email,
        phone,
        message,
        totalStay,
        totalGuests,
        totalPrice,
      } = dataBooking;
      // console.log(dataBooking);

      const stringRoomId = roomId.toString();
      const [room] = await pool.execute(`SELECT * FROM rooms WHERE id = ? `, [
        stringRoomId,
      ]);
      // console.log(room);

      const quantityRoom = parseInt(room[0].quantity);
      // console.log(">>> CHECK QUANTITY ROOM <<<", quantityRoom);

      const [user] = await pool.execute(
        `SELECT * FROM customers WHERE id = ? `,
        [userId]
      );
      // console.log(">>> CHECK USER EXIST <<<:", user);

      if (user.length === 0) {
        return reject({ error: "user does not exist" });
      }
      if (user[0].disabled === 1) {
        return reject({ error: "user is locked" });
      }

      if (room.length === 0) {
        return reject({ error: "Room not found" });
      }

      if (quantityRoom === 0) {
        return reject({ error: "No room available" });
      }

      const sql = `INSERT INTO bookings (room_id, customer_id, room_name, checkin_date, checkout_date, guest_name, guest_email, guest_phone, guest_mess, total_stay, total_guests, total_price) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        roomId,
        userId,
        nameRoom,
        checkin,
        checkout,
        name,
        email,
        phone,
        message,
        totalStay,
        totalGuests,
        totalPrice,
      ];
      const convertStringParam = params.map((param) => param.toString());
      await pool.execute(sql, convertStringParam);

      // Tạo một đối tượng transporter với các thông tin cấu hình SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "", // Địa chỉ email của bạn
          pass: "", // Mật khẩu của bạn
        },
      });

      // Cấu hình email thông báo đến người dùng
      const mailOptions = {
        from: "",
        to: email, // Địa chỉ email của người dùng
        subject: "Tiếp nhận đơn đặt phòng", // Tiêu đề email
        html: `
        <p>Xin chào ${name}</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của khách sạn chúng tôi – khách sạn Kim Tuyến.</p>
        <p>Chúng tôi rất hân hạnh tiếp nhận đơn của bạn gồm 1 phòng tên là ${nameRoom} từ ${checkin} đến ${checkout} (${totalStay}). Không cần đặt tiền cọc.</p>
        <p>Chúng tôi mong đợi chuyến thăm của bạn.</p>
        <p>Trân trọng.</p>
        `, // Nội dung email
      };

      // Gửi email thông báo đến người dùng
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      resolve("Bạn đã đặt phòng thành công!!!");
    } catch (err) {
      reject(err);
    }
  });
};

let getCuisines = (page, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize; // Số lượng phòng mỗi trang
      const offset = (page - 1) * limit; // Vị trí bắt đầu lấy dữ liệu
      const sql = `SELECT * FROM cuisines WHERE disabled = 0 LIMIT ?, ? `;
      const params = [offset, limit];
      const convertStringParam = params.map((param) => param.toString());
      const [cuisineList, fields] = await pool.execute(sql, convertStringParam);
      // Truy vấn số lượng phòng
      const [totalCuisines, _] = await pool.execute(
        "SELECT COUNT(*) as total FROM cuisines WHERE disabled = 0"
      );
      const total = totalCuisines[0].total;
      // console.log(total);
      resolve({ cuisineList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let getServices = (page, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize; // Số lượng phòng mỗi trang
      const offset = (page - 1) * limit; // Vị trí bắt đầu lấy dữ liệu
      const sql = `SELECT * FROM services WHERE disabled = 0 LIMIT ?, ? `;
      const params = [offset, limit];
      const convertStringParam = params.map((param) => param.toString());
      const [serviceList, fields] = await pool.execute(sql, convertStringParam);
      // Truy vấn số lượng phòng
      const [totalServices, _] = await pool.execute(
        "SELECT COUNT(*) as total FROM services WHERE disabled = 0"
      );
      const total = totalServices[0].total;
      // console.log(total);
      resolve({ serviceList, total });
    } catch (err) {
      reject(err);
    }
  });
};

// EXPORTS
module.exports = {
  getRooms,
  handleDataBooking,
  getCuisines,
  getServices,
};
