const express = require("express");
const { validate } = require("express-validation");
const { addUser } = require("../controller/usersController");
const userValidation = require("../schemas/userSchema");

const router = express.Router();

router.post("/register", validate(userValidation), addUser);

module.exports = router;
