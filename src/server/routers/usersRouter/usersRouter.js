const express = require("express");
const {
  userLogin,
} = require("../../controllers/usersControllers/usersControllers");

const usersRouter = express.Router();

usersRouter.post("/login", userLogin);

module.exports = usersRouter;
