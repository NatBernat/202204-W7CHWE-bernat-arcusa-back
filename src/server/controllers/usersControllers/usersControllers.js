require("dotenv").config();
const debug = require("debug")("social-api:server:users");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../db/model/User");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    debug(chalk.red("Username is wrong"));
    const error = new Error("Username or password are wrong");
    error.statusCode = 403;
    error.customMessage = "Username or password are wrong";
    next(error);
  }
  const userData = {
    username: user.username,
  };
  const actualPassword = await bcrypt.compare(password, user.password);

  if (!actualPassword) {
    debug(chalk.red("Password is wrong"));
    const error = new Error("Username or password are wrong");
    error.statusCode = 403;
    error.customMessage = "Username or password are wrong";
    next(error);
  } else {
    const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);
    res.status(200).json(token);
  }
};

const userRegister = async (req, res, next) => {
  try {
    const { username, password, name } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      throw new Error("Username already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: encryptedPassword,
      name,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "Username already exists") {
      error.statusCode = 409;
      error.customMessage = "Username already exists";
    } else {
      error.statusCode = 400;
      error.customMessage = "Bad request";
    }
    next(error);
  }
};

module.exports = { userLogin, userRegister };
