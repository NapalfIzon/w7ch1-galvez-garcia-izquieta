require("dotenv").config();
const initializeServer = require("./server/index");
const initializeMongoDBServer = require("./database/index");

const port = process.env.PORT || process.env.LOCAL_PORT || 5000;

initializeServer(port);
initializeMongoDBServer(process.env.MONGODB_STRING);
