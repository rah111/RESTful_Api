const pool = require("../config/database");

module.exports = {
  create: function (data, callBack) {
    pool.query(
      `insert into user(name, gender, email, password, number) 
                values(?,?,?,?,?)`,
      [data.name, data.gender, data.email, data.password, data.number],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }
        console.log(data.name);
        return callBack(null, results);
      }
    );
  },

  getUserByUserEmail: function (email, callBack) {
    pool.query(
      `select * from user where email = ?`,
      [email],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: function (id, callBack) {
    pool.query(
      `select user_id,name,gender,email,number from user where user_id = ?`,
      [id],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  },
  getUsers: function (callBack) {
    pool.query(
      `select name,gender,email,number from user`,
      [],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: function (data, callBack) {
    pool.query(
      `update user set name=?, gender=?, email=?, password=?, number=? where user_id = ?`,
      [
        data.name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.user_id,
      ],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: function (data, callBack) {
    pool.query(
      `delete from user where user_id = ?`,
      [data.user_id],
      function (error, results, fields) {
        if (error) {
          callBack(error);
        }
        console.log(data.user_id);

        return callBack(null, results);
      }
    );
  },
};
