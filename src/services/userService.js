import pool from "../configs/connectDB";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

//>>>>>>>>>>>>>>>>>>> USER LOGIN <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        // user already exist
        let [user] = await pool.execute(
          "select * from customers where email = ?",
          [email]
        );
        console.log(user);

        if (user) {
          if (user[0].disabled === 1) {
            userData.errCode = 4;
            userData.errMessage = "User account is currently disabled";
          } else {
            // compare password
            let check = await bcrypt.compareSync(password, user[0].password);
            if (check) {
              userData.errcode = 0;
              userData.errMessage = "ok";
              userData.user = user;
            } else {
              userData.errCode = 3;
              userData.errMessage = "Wrong password";
            }
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user not found!!!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "no exist!!!";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

let checkUserEmail = (userEmail, customerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let [user] = await pool.execute(
      //   "select * from customers where email = ?",
      //   [userEmail]
      // );
      // // console.log(">>> CHECK USER EMAIL <<<: ", user);

      // if (user.length === 1) {
      //   resolve(true);
      // } else {
      //   resolve(false);
      // }
      let query = "SELECT * FROM customers WHERE email = ?";
      let params = [userEmail];

      if (customerId) {
        const stringCustomerId = customerId.toString();
        query += " AND id != ?";
        params.push(stringCustomerId);
      }

      let [user] = await pool.execute(query, params);

      if (user.length === 1) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserName = (userName, customerId) => {
  return new Promise(async (res, rej) => {
    try {
      // let [user] = await pool.execute(
      //   "select * from customers where name = ?",
      //   [userName]
      // );
      // //   console.log(user);

      // if (user.length === 1) {
      //   res(true);
      // } else {
      //   res(false);
      // }
      let query = "SELECT * FROM customers WHERE name = ?";
      let params = [userName];

      if (customerId) {
        const stringCustomerId = customerId.toString();
        query += " AND id != ?";
        params.push(stringCustomerId);
      }

      let [user] = await pool.execute(query, params);

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

//>>>>>>>>>>>>>>>>>>> USER REGISTER <<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { id, email, name, password, confirmPassword } = data;
      let userData = {};

      let hashPasswordFromBrcypt = await hashUserPassword(password);
      //   console.log(password);
      //   console.log(hashPasswordFromBrcypt);

      let isExistEmail = await checkUserEmail(email);
      let isExistName = await checkUserName(name);

      if (isExistEmail && isExistName) {
        userData.errCode = 1;
        userData.errMessage = "email va username nay da ton tai!!!";
      } else if (isExistName) {
        userData.errCode = 1;
        userData.errMessage = "username nay da ton tai!!!";
      } else if (isExistEmail) {
        userData.errCode = 1;
        userData.errMessage = "email nay da ton tai!!!";
      } else {
        await pool.execute(
          "insert into customers(email, name, password) values(?, ?, ?)",
          [email, name, hashPasswordFromBrcypt]
        );
        userData.errCode = 0;
        userData.errMessage = "ok create user success";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let forgetPasswordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { email, password, confirmPassword } = data;
      let userData = {};

      let hashPasswordFromBrcypt = await hashUserPassword(password);
      //   console.log(password);
      //   console.log(hashPasswordFromBrcypt);

      let isExistEmail = await checkUserEmail(email);

      if (!isExistEmail) {
        userData.errCode = 1;
        userData.errMessage = "email nay khong ton tai!!!";
      } else {
        await pool.execute(
          "UPDATE customers SET password = ? WHERE email = ?",
          [hashPasswordFromBrcypt, email]
        );
        userData.errCode = 0;
        userData.errMessage = "ok change password user success";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
let getBookings = (page, pageSize, customerId, filterStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = pageSize;
      const offset = (page - 1) * limit;
      let query = "SELECT * FROM bookings ";
      let params = [];

      if (!filterStatus) {
        query += " WHERE customer_id = ? LIMIT ?, ? ";
        params = [customerId, offset, limit];
      } else {
        query += " WHERE customer_id = ? AND status = ? LIMIT ?, ?";
        params = [customerId, filterStatus, offset, limit];
      }
      // console.log(params);
      const convertStringParam = params.map((param) => param.toString());
      // console.log(convertStringParam);

      const [bookingList, fields] = await pool.execute(
        query,
        convertStringParam
      );

      // Truy vấn số lượng dịch vụ
      let total = 0;
      let countSql = "SELECT COUNT(*) as total FROM bookings ";
      let paramsCountSql = [];

      if (!filterStatus) {
        countSql += " WHERE customer_id = ?";
        paramsCountSql = [customerId];
        const [totalBookings, _] = await pool.execute(countSql, paramsCountSql);
        total = totalBookings[0].total;
      } else {
        countSql += " WHERE customer_id = ? AND status = ?";
        paramsCountSql = [customerId, filterStatus];
        const [totalBookings, _] = await pool.execute(countSql, paramsCountSql);
        total = totalBookings[0].total;
      }
      resolve({ bookingList, total });
    } catch (err) {
      reject(err);
    }
  });
};

let handleChangeInfoUser = (customerId, dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, name, email, address, phone } = dataUser;
      // console.log(">>> CHECK DATA CUStomerS <<<:", dataUser);
      // console.log(id, customerId);
      // console.log(
      //   typeof customerId,
      //   typeof id,
      //   typeof name,
      //   typeof email,
      //   typeof address,
      //   typeof phone
      // );

      let isExistEmail = await checkUserEmail(email, customerId);
      let isExistName = await checkUserName(name, customerId);

      if (isExistEmail && isExistName) {
        reject({ err: "email và username này đã tồn tại." });
      } else if (isExistName) {
        reject({ err: "username này đã tồn tại." });
      } else if (isExistEmail) {
        reject({ err: "email này đã tồn tại." });
      } else {
        await pool.execute(
          "UPDATE customers SET name = ?, email = ?, address =?, phone = ? WHERE id = ?",
          [name, email, address, phone, customerId]
        );
      }

      resolve({ message: "update ok" });
    } catch (err) {
      reject(err);
    }
  });
};

let handleChangePasswordUser = (customerId, dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { oldPassword, newPassword, confirmNewPassword } = dataUser;
      console.log(">>> CHECK dataUser <<<: ", dataUser);

      let [user] = await pool.execute("select * from customers where id = ?", [
        customerId,
      ]);
      console.log(user);

      let checkOldPassword = await bcrypt.compareSync(
        oldPassword,
        user[0].password
      );
      console.log(">>> Check Old Password <<<", checkOldPassword);

      if (checkOldPassword) {
        let hashPasswordFromBrcypt = await hashUserPassword(newPassword);

        await pool.execute("UPDATE customers SET password = ? WHERE id = ?", [
          hashPasswordFromBrcypt,
          customerId,
        ]);
      } else {
        reject({ err: "Mật khẩu cũ không đúng." });
      }

      resolve({ message: "change password ok" });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin,
  createNewUser,
  forgetPasswordUser,
  getBookings,
  handleChangeInfoUser,
  handleChangePasswordUser,
};
