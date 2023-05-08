import pool from "../configs/connectDB";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

let handleEditInfoHotelAdmin = (hotelId, dataHotel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        name,
        email,
        address,
        phone,
        description,
        slider_home,
        slider_ins,
        src_ggmap,
        admin_id,
      } = dataHotel;
      // console.log(">>> CHECK DATA HOTEL <<<:", dataHotel);

      const sql =
        "UPDATE hotel SET admin_id = ?, name = ?, email = ?, address = ?, phone = ?, description = ?, slider_home = ?, slider_ins = ?, src_ggmap = ?  WHERE id = ?";
      const params = [
        admin_id,
        name,
        email,
        address,
        phone,
        description,
        JSON.stringify(slider_home),
        JSON.stringify(slider_ins),
        src_ggmap,
        hotelId,
      ];
      const convertStringParams = params.map((param) => param.toString());
      // console.log(convertStringParams);

      await pool.execute(sql, convertStringParams);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getRooms = (page, pageSize, filterStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize;
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM rooms";
      let params = [];

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        sql += " WHERE disabled = ? LIMIT ?, ?";
        params.push(filterStatus, offset, limit);
      } else {
        sql += " LIMIT ?, ?";
        params.push(offset, limit);
      }
      const convertStringParams = params.map((param, i) => param.toString());
      // console.log(convertStringParams);

      const [roomList, fields] = await pool.execute(sql, convertStringParams);

      // Truy vấn số lượng phòng
      let paramsCountSql = [];
      let countSql = "SELECT COUNT(*) as total FROM rooms";

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql.push(filterStatus);
      }

      const [totalRoom, _] = await pool.execute(countSql, paramsCountSql);
      const total = totalRoom[0].total;
      resolve({ roomList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let createRoom = (hotelId, dataRoom) => {
  return new Promise(async (resolve, reject) => {
    let {
      name,
      description,
      price,
      quantity,
      area,
      view_direction,
      bed_type,
      image,
      img_slider,
    } = dataRoom;
    try {
      const sql = `INSERT INTO rooms (hotel_id, name, description, price, quantity, area, view_direction, bed_type, avatar_2, img_slider) VALUES (?, ?, ?, ?,?,?,?,?,?,?)`;
      const params = [
        hotelId,
        name,
        description,
        price,
        quantity,
        area,
        view_direction,
        bed_type,
        image,
        JSON.stringify(img_slider),
      ];
      const convertStringParams = params.map((param) => param.toString());
      console.log(convertStringParams);

      const [result] = await pool.execute(sql, convertStringParams);
      resolve("create ok");
    } catch (err) {
      reject(err);
    }
  });
};

let getBookings = (page, pageSize, filterStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize; // Số lượng phòng mỗi trang
      const offset = (page - 1) * limit; // Vị trí bắt đầu lấy dữ liệu
      let sql = "SELECT * FROM bookings";
      let params = [];

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        sql += " WHERE status = ? LIMIT ?, ?";
        params.push(filterStatus, offset, limit);
      } else {
        sql += " LIMIT ?, ?";
        params.push(offset, limit);
      }
      const convertParamString = params.map((param, i) => param.toString());
      // console.log(convertParamString);

      const [bookingList, fields] = await pool.execute(sql, convertParamString);

      // Truy vấn số lượng phòng
      let paramsCountSql = [];
      let countSql = "SELECT COUNT(*) as total FROM bookings";

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        countSql += " WHERE status = ?";
        paramsCountSql.push(filterStatus);
      }

      const [totalBooking, _] = await pool.execute(countSql, paramsCountSql);
      const total = totalBooking[0].total;
      resolve({ bookingList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditRoom = (roomId, dataRoom) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        id,
        hotel_id,
        name,
        description,
        price,
        discount,
        quantity,
        area,
        view_direction,
        bed_type,
        avatar_2,
        img_slider,
      } = dataRoom;
      // console.log(">>> CHECK DATA ROOM <<<", dataRoom);

      // let finalPrice;
      // const priceDiscount = price - (price * discount) / 100;
      // const priceDiscount = price - discount;

      let sql =
        "UPDATE rooms SET name = ?, description = ?, price = ?, discount = ? ,quantity = ?, area = ?, view_direction = ?, bed_type = ?, avatar_2 = ?, img_slider = ?";
      let params = [
        name,
        description,
        price,
        discount,
        quantity,
        area,
        view_direction,
        bed_type,
        avatar_2,
        JSON.stringify(img_slider),
      ];

      sql += " WHERE id = ?";
      params.push(roomId);

      const convertParamString = params.map((param) => param.toString());
      console.log(convertParamString);

      await pool.execute(sql, convertParamString);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditBooking = (bookingId, dataBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        room_id,
        new_room_id,
        room_name,
        guest_name,
        guest_phone,
        checkin_date,
        checkout_date,
        total_price,
        total_stay,
        guest_mess,
        admin_id,
      } = dataBooking;
      // console.log(">>> CHECK DATA BOOKING <<<:", dataBooking);

      // nếu không có new_room_id đc truyền từ client lên thì default là room_id
      let new_room_id_default = new_room_id || room_id;

      const [booking] = await pool.query(
        "SELECT * FROM bookings WHERE id = ?",
        [bookingId]
      );
      const statusBooking = booking[0].status;

      const [room] = await pool.execute(
        `SELECT * FROM rooms WHERE id = ${new_room_id_default}`
      );
      // console.log(">>> CHECK ROOM <<< ", room);

      if (statusBooking !== 0) {
        return resolve({ message: "Không thể chỉnh sửa phòng này nữa" });
      }

      if (room_id !== new_room_id_default && room[0].quantity <= 0) {
        return resolve({ message: "Phòng này đã hết số lượng" });
      }

      if (room_id !== new_room_id_default) {
        await pool.execute(
          `UPDATE rooms SET quantity = quantity + 1 WHERE id = ${room_id}`
        );

        await pool.execute(
          `UPDATE rooms SET quantity = quantity - 1 WHERE id = ${new_room_id_default}`
        );
      }

      let sql =
        "UPDATE bookings SET room_id = ?, admin_id = ?, room_name = ?, checkin_date = ?, checkout_date = ?, guest_name = ?,  guest_phone = ?, guest_mess = ?, total_stay = ?, total_price = ?";
      let params = [];

      sql += " WHERE id = ?";
      params.push(
        new_room_id_default,
        admin_id,
        room_name,
        checkin_date,
        checkout_date,
        guest_name,
        guest_phone,
        guest_mess,
        total_stay,
        total_price,
        bookingId
      );

      const convertStringParam = params.map((param) => param.toString());

      await pool.execute(sql, convertStringParam);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let handleDeleteBooking = (bookingId, roomId, roomName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stringBookingId = bookingId.toString();

      const [booking] = await pool.execute(
        `SELECT * FROM bookings WHERE id = ?`,
        [stringBookingId]
      );
      // console.log(booking);
      const statusBooking = parseInt(booking[0].status);
      // console.log(statusBooking);

      if (statusBooking === 0 || statusBooking === 3 || statusBooking === 4) {
        await pool.execute("delete from bookings where id = ?", [
          stringBookingId,
        ]);
        resolve("xoa ok r do");
        return;
      }

      if (statusBooking === 1 || statusBooking === 2) {
        await pool.execute(
          "UPDATE rooms SET quantity = quantity + 1 WHERE name = ?",
          [roomName]
        );
        await pool.execute("delete from bookings where id = ?", [
          stringBookingId,
        ]);
      }

      resolve("Xóa đơn thành công");
    } catch (err) {
      reject(err);
    }
  });
};

let handleChangeStatusBooking = (bookingId, dataBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { status, roomId } = dataBooking;
      const stringRoomId = roomId.toString();
      // console.log(">>> CHECK DATA BOOKING <<<:", dataBooking);

      const [booking] = await pool.execute(
        "SELECT * FROM bookings WHERE id = ?",
        [bookingId]
      );
      // console.log(booking);
      const statusBefore = parseInt(booking[0].status);
      // console.log(statusBefore);
      const statusDataBody = parseInt(status);

      if (statusBefore === 3) {
        resolve({ message: "Đã trả phòng, không thể hoàn tác" });
        return;
      } else if (statusBefore === 4) {
        resolve({ message: "Đã hủy, không thể hoàn tác" });
        return;
      }

      switch (statusDataBody) {
        case 1: // XÁC NHẬN ĐẶT PHÒNG
          if (statusBefore !== 2) {
            await pool.execute(
              "UPDATE rooms SET quantity = quantity - 1 WHERE id = ?",
              [stringRoomId]
            );
            await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [
              status,
              bookingId,
            ]);
            resolve({ message: "Đã xác nhận thành công" });
          } else {
            resolve({ message: "Phòng này đã thanh toán" });
          }
          break;

        case 2: // XÁC NHẬN THANH TOÁN
          if (statusBefore === 1) {
            await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [
              status,
              bookingId,
            ]);
            resolve({ message: "Đã xác nhận thanh toán thành công" });
          } else {
            resolve({ message: "Chưa xác nhận đặt phòng" });
          }
          break;

        case 3: // TRẢ PHÒNG
          if (statusBefore === 2) {
            await pool.execute(
              "UPDATE rooms SET quantity = quantity + 1 WHERE id = ?",
              [stringRoomId]
            );
            await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [
              status,
              bookingId,
            ]);
            resolve({ message: "Đã xác nhận trả phòng thành công" });
          } else {
            resolve({ message: "Chưa xác nhận thanh toán" });
          }
          break;

        case 4: // HỦY ĐƠN
          if (statusBefore === 1 || statusBefore === 2) {
            await pool.execute(
              "UPDATE rooms SET quantity = quantity + 1 WHERE id = ?",
              [stringRoomId]
            );
          }
          await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [
            status,
            bookingId,
          ]);
          resolve({ message: "Đã hủy đơn thành công" });
          break;

        default:
          await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [
            status,
            bookingId,
          ]);
          break;
      }

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getCustomers = (
  page = null,
  pageSize = null,
  customerId = null,
  filterStatus
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query =
        "SELECT id, name, email, address, phone, disabled FROM customers ";
      let params = [];

      if (page && pageSize && !filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += " LIMIT ?, ? ";
        params = [offset, limit];
      } else if (page && pageSize && filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += " WHERE disabled = ? LIMIT ?, ?";
        params = [filterStatus, offset, limit];
      } else {
        query += " WHERE id=?";
        params = [customerId];
      }
      // console.log(params);
      const convertParamString = params.map((param) => param.toString());
      // console.log(convertParamString);

      const [customerList, fields] = await pool.execute(
        query,
        convertParamString
      );

      // Truy vấn số lượng khách hàng
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM customers";
      let paramsCountSql = [];

      if (page && pageSize && !filterStatus) {
        const [totalUsers, _] = await pool.execute(countSql, paramsCountSql);
        total = totalUsers[0].total;
      } else if (page && pageSize && filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql = [filterStatus];
        const [totalUsers, _] = await pool.execute(countSql, paramsCountSql);
        total = totalUsers[0].total;
      } else {
        total = 1;
      }

      resolve({ customerList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditCustomer = (customerId, dataCustomer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name, email } = dataCustomer;
      // console.log(">>> CHECK DATA CUSTOMER <<<:", dataCustomer);
      const sql = "UPDATE customers SET name = ?, email = ? WHERE id = ?";
      const params = [name, email, customerId];
      const convertStringParam = params.map((param, i) => param.toString());
      await pool.execute(sql, convertStringParam);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getFAQs = (page = null, pageSize = null, faqId = null, filterStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = "SELECT * FROM faqs ";
      let params = [];

      if (page && pageSize && !filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += "LIMIT ?, ? ";
        params = [offset, limit];
      } else if (page && pageSize && filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += " WHERE disabled = ? LIMIT ?, ?";
        params = [filterStatus, offset, limit];
      } else {
        query += "WHERE id=?";
        params = [faqId];
      }
      // console.log(params);
      const convertStringParam = params.map((param) => param.toString());
      // console.log(convertStringParam);

      const [faqList, fields] = await pool.execute(query, convertStringParam);

      // Truy vấn số lượng khách hàng
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM faqs";
      let paramsCountSql = [];

      if (page && pageSize && !filterStatus) {
        const [totalFAQs, _] = await pool.execute(countSql, paramsCountSql);
        total = totalFAQs[0].total;
      } else if (page && pageSize && filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql = [filterStatus];
        const [totalFAQs, _] = await pool.execute(countSql, paramsCountSql);
        total = totalFAQs[0].total;
      } else {
        total = 1;
      }

      resolve({ faqList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditFAQ = (faqId, dataFAQ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, question, answer, disabled } = dataFAQ;
      // console.log(">>> CHECK DATA FAQ <<<:", dataFAQ);

      await pool.execute(
        "UPDATE faqs SET question = ?, answer = ? WHERE id = ?",
        [question, answer, faqId]
      );

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getContact = (page, pageSize, filterStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize;
      const offset = (page - 1) * limit;
      let sql = "SELECT * FROM contacts";
      let params = [];
      // console.log(params);

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        sql += " WHERE disabled = ? LIMIT ?, ?";
        params.push(filterStatus, offset, limit);
      } else {
        sql += " LIMIT ?, ?";
        params.push(offset, limit);
      }
      // console.log(params);
      const convertStringParam = params.map((param) => param.toString());
      // console.log(convertStringParam);

      const [contactList, fields] = await pool.execute(sql, convertStringParam);

      // Truy vấn số lượng phòng
      let paramsCountSql = [];
      let countSql = "SELECT COUNT(*) as total FROM contacts";

      // Nếu filterStatus được truyền từ client, thêm điều kiện WHERE status = ?
      if (filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql.push(filterStatus);
      }

      const [totalContact, _] = await pool.execute(countSql, paramsCountSql);
      const total = totalContact[0].total;
      resolve({ contactList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleChangeStatusContact = (contactId, dataContact) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { status } = dataContact;
      // console.log(">>> CHECK DATA CONTACT <<<:", dataContact);

      const [contact] = await pool.execute(
        "SELECT * FROM contacts WHERE id = ?",
        [contactId]
      );
      // console.log(contact);
      const statusBefore = parseInt(contact[0].disabled);
      // console.log(statusBefore);

      if (statusBefore === 0) {
        resolve({ message: "Không thể hoàn tác" });
        return;
      }

      await pool.execute("UPDATE contacts SET disabled = ? WHERE id = ?", [
        status,
        contactId,
      ]);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getCuisines = (
  page = null,
  pageSize = null,
  cuisineId = null,
  filterStatus
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = "SELECT * FROM cuisines ";
      let params = [];

      if (page && pageSize && !filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += "LIMIT ?, ? ";
        params = [offset, limit];
      } else if (page && pageSize && filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += " WHERE disabled = ? LIMIT ?, ?";
        params = [filterStatus, offset, limit];
      } else {
        query += "WHERE id=?";
        params = [cuisineId];
      }
      console.log(params);
      const convertStringParam = params.map((param) => param.toString());

      const [cuisineList, fields] = await pool.execute(
        query,
        convertStringParam
      );

      // Truy vấn số lượng khách hàng
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM cuisines";
      let paramsCountSql = [];

      if (page && pageSize && !filterStatus) {
        const [totalCuisines, _] = await pool.execute(countSql, paramsCountSql);
        total = totalCuisines[0].total;
      } else if (page && pageSize && filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql = [filterStatus];
        const [totalCuisines, _] = await pool.execute(countSql, paramsCountSql);
        total = totalCuisines[0].total;
      } else {
        total = 1;
      }
      resolve({ cuisineList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleCreateCuisine = (hotelId, dataCuisine) => {
  return new Promise(async (resolve, reject) => {
    let { name, description, opening_time, closing_time, img_slider } =
      dataCuisine;
    // console.log(dataCuisine);

    try {
      const sql = `INSERT INTO cuisines (hotel_id, name, description, opening_time, closing_time, img_slider) VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        hotelId,
        name,
        description,
        opening_time,
        closing_time,
        JSON.stringify(img_slider),
      ];
      const convertStringParam = params.map((param) => param.toString());
      const [result] = await pool.execute(sql, convertStringParam);
      resolve("create ok");
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditCuisine = (cuisineId, dataCuisine) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, opening_time, closing_time, description, img_slider } =
        dataCuisine;
      // console.log(">>> CHECK DATA CUISINE <<<:", dataCuisine);
      const sql =
        "UPDATE cuisines SET name = ?, opening_time = ?, closing_time = ?, description = ?, img_slider = ? WHERE id = ?";
      const params = [
        name,
        opening_time,
        closing_time,
        description,
        JSON.stringify(img_slider),
        cuisineId,
      ];
      const convertStringParam = params.map((param) => param.toString());
      await pool.execute(sql, convertStringParam);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let getServices = (
  page = null,
  pageSize = null,
  serviceId = null,
  filterStatus
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = "SELECT * FROM services ";
      let params = [];

      if (page && pageSize && !filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += "LIMIT ?, ? ";
        params = [offset, limit];
      } else if (page && pageSize && filterStatus) {
        const limit = pageSize;
        const offset = (page - 1) * limit;
        query += " WHERE disabled = ? LIMIT ?, ?";
        params = [filterStatus, offset, limit];
      } else {
        query += "WHERE id=?";
        params = [serviceId];
      }
      // console.log(params);
      const convertStringParam = params.map((param) => param.toString());

      const [serviceList, fields] = await pool.execute(
        query,
        convertStringParam
      );

      // Truy vấn số lượng dịch vụ
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM services";
      let paramsCountSql = [];

      if (page && pageSize && !filterStatus) {
        const [totalServices, _] = await pool.execute(countSql, paramsCountSql);
        total = totalServices[0].total;
      } else if (page && pageSize && filterStatus) {
        countSql += " WHERE disabled = ?";
        paramsCountSql = [filterStatus];
        const [totalServices, _] = await pool.execute(countSql, paramsCountSql);
        total = totalServices[0].total;
      } else {
        total = 1;
      }

      resolve({ serviceList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleCreateService = (hotelId, dataService) => {
  return new Promise(async (resolve, reject) => {
    let { name, description, opening_time, closing_time, img_slider } =
      dataService;
    // console.log(dataService);

    try {
      const sql = `INSERT INTO services (hotel_id, name, description, opening_time, closing_time, img_slider) VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        hotelId,
        name,
        description,
        opening_time,
        closing_time,
        JSON.stringify(img_slider),
      ];
      const convertStringParam = params.map((param) => param.toString());
      const [result] = await pool.execute(sql, convertStringParam);
      resolve("create ok");
    } catch (err) {
      reject(err);
    }
  });
};

let handleEditService = (serviceId, dataService) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, opening_time, closing_time, description, img_slider } =
        dataService;
      // console.log(">>> CHECK DATA SERVICE <<<:", dataService);
      const sql =
        "UPDATE services SET name = ?, opening_time = ?, closing_time = ?, description = ?, img_slider = ? WHERE id = ?";
      const params = [
        name,
        opening_time,
        closing_time,
        description,
        JSON.stringify(img_slider),
        serviceId,
      ];
      const convertStringParam = params.map((param) => param.toString());
      await pool.execute(sql, convertStringParam);

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

//>>>>>>>>>>>>>>>>>>> USER LOGIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let handleAdminLogin = (adminname, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let adminData = {};
      let isExist = await checkAdminName(adminname);

      if (isExist) {
        // user already exist
        let [admin] = await pool.execute(
          "select * from admins where name = ?",
          [adminname]
        );
        // console.log(admin);

        if (admin) {
          // compare password
          let check = await bcrypt.compareSync(password, admin[0].password);
          //   let check = password === admin[0].password;
          if (check) {
            adminData.errcode = 0;
            adminData.errMessage = "ok";
            adminData.admin = admin;
          } else {
            adminData.errCode = 3;
            adminData.errMessage = "Wrong password";
          }
        } else {
          adminData.errCode = 2;
          adminData.errMessage = "admin not found!!!";
        }
      } else {
        adminData.errCode = 1;
        adminData.errMessage = "no exist!!!";
      }

      resolve(adminData);
    } catch (e) {
      reject(e);
    }
  });
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

let checkAdminName = (userName) => {
  return new Promise(async (res, rej) => {
    try {
      let [user] = await pool.execute("select * from admins where name = ?", [
        userName,
      ]);
      //   console.log(user);

      if (user.length === 1) {
        res(true);
      } else {
        res(false);
      }
    } catch (e) {
      rej(e);
    }
  });
};

let hashAdminPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

//>>>>>>>>>>>>>>>>>>> ADMIN REGISTER <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let createNewAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { id, adminname, password, confirmPassword } = data;
      let adminData = {};

      let hashPasswordFromBrcypt = await hashAdminPassword(password);
      //   console.log(password);
      //   console.log(hashPasswordFromBrcypt);

      let isExistName = await checkAdminName(adminname);

      if (isExistName) {
        adminData.errCode = 1;
        adminData.errMessage = "adminname nay da ton tai!!!";
      } else {
        await pool.execute("insert into admins(name, password) values(?, ?)", [
          adminname,
          hashPasswordFromBrcypt,
        ]);
        adminData.errCode = 0;
        adminData.errMessage = "ok create admin success";
      }

      resolve(adminData);
    } catch (e) {
      reject(e);
    }
  });
};

let forgetPasswordAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, password, confirmPassword } = data;
      // console.log(data);
      let adminData = {};

      let hashPasswordFromBrcypt = await hashAdminPassword(password);
      //   console.log(password);
      //   console.log(hashPasswordFromBrcypt);

      let isExistname = await checkAdminName(name);

      if (!isExistname) {
        adminData.errCode = 1;
        adminData.errMessage = "name nay khong ton tai!!!";
      } else {
        await pool.execute("UPDATE admins SET password = ? WHERE name = ?", [
          hashPasswordFromBrcypt,
          name,
        ]);
        adminData.errCode = 0;
        adminData.errMessage = "ok change password admin success";
      }

      resolve(adminData);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleAdminLogin,
  createNewAdmin,
  forgetPasswordAdmin,
  handleEditInfoHotelAdmin,
  createRoom,
  getRooms,
  getBookings,
  handleEditRoom,
  handleEditBooking,
  handleDeleteBooking,
  handleChangeStatusBooking,
  getCustomers,
  handleEditCustomer,
  getFAQs,
  handleEditFAQ,
  getContact,
  handleChangeStatusContact,
  getCuisines,
  handleCreateCuisine,
  handleEditCuisine,
  getServices,
  handleCreateService,
  handleEditService,
};
