const express = require("express");
const { validate } = require("express-validation");

const app = express();
const usersRoutes = require("./routes/usersRoutes");
const userValidation = require("./schemas/userSchema");

app.use("/users", validate(userValidation, {}, {}), usersRoutes);
