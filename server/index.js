const express = require("express");

const app = express();
const usersRoutes = require("./routes/usersRoutes");

app.use("/users", usersRoutes);
