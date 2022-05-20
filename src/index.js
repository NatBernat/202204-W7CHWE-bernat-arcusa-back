require("dotenv").config();

const startServer = require("./server/startServer");

const port = process.env.API_PORT || 5000;

startServer(port);
