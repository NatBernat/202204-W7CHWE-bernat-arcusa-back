const express = require("express");
const {
  userLogin,
} = require("../../controllers/usersControllers/usersControllers");
const app = require("../../index");

const usersRouter = express.Router();

app.use("/login", userLogin);

module.exports = usersRouter;
