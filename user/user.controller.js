const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
} = require("./user.service");

//const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

//const bodyParser = require("body-parser");

//create.use(bodyParser.raw({ inflate: true, limit: "100kb", type: "text/xml" }));

module.exports = {
  createUser: function (req, res) {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    console.log(body.name);

    create(body, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: function (req, res) {
    const body = req.body;
    getUserByUserEmail(body.email, function (err, results) {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = bcrypt.compareSync(body.password, results.password);
      if (result) {
        results.password = undefined; // not passing real password to the sign function written below, that's why made undefined

        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "2h",
        });

        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: function (req, res) {
    const id = req.params.id;
    getUserByUserId(id, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: function (req, res) {
    getUsers(function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUsers: function (req, res) {
    const body = req.body;

    if (body.password != undefined) {
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
    }
    updateUser(body, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },

  deleteUser: function (req, res) {
    const data = req.body;

    deleteUser(data, function (err, results) {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
