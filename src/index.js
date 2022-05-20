require("dotenv").config();
const debug = require("debug")("social-api:root");
const chalk = require("chalk");
const connectDB = require("../../202204-W7CH1-bernat-arcusa-boris-randebrock/db");
const startServer = require("./server/startServer");

const port = process.env.API_PORT || 5000;
const mongoConnection = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDB(mongoConnection);
    await startServer(port);
  } catch (error) {
    debug(chalk.red("Error: ", error.message));
  }
})();
