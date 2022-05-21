require("dotenv").config();
const debug = require("debug")("social-api:server:users");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../../db/model/User");

const userLogin = async (req, res, next) => {
  const { username, password } = await req.body;
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
  const { username, password, name } = await req.body;
  const user = await User.findOne({ username });

  if (user) {
    const error = new Error("Username not available");
    error.statuscode = 409;
    error.customMessage = "Username not available";

    next(error);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username,
      password: encryptedPassword,
      name,
    });

    res.status(201).json("User succesfully created");
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Cannot create user";

    next(error);
  }
};

module.exports = { userLogin, userRegister };
