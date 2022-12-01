const router = require("express").Router();

const { checkToken } = require("../authentication/token_validation");
//const bodyParser = require("body-parser");

//router.use(bodyParser.raw({ inflate: true, limit: "100kb", type: "text/xml" }));

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
} = require("./user.controller");

router.post("/addUser", createUser);
router.get("/userList", checkToken, getUsers);

router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/updateUser", checkToken, updateUsers);
router.delete("/deleteUser", checkToken, deleteUser);

module.exports = router;
