require("dotenv").config();

const express = require("express");

//const bodyParser = require("body-parser");

const app = express();

const userRouter = require("./user/user.router");

//app.use(bodyParser.raw({ inflate: true, limit: "100kb", type: "text/xml" }));

// pass json objects

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, function () {
  console.log("sever is up at " + process.env.APP_PORT);
});
