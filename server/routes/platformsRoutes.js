const express = require("express");
const { validate } = require("express-validation");
const {
  getPlatforms,
  addPlatform,
  updatePlatform,
  removePlatform,
} = require("../controller/platformController");
const platformValidation = require("../schemas/platformSchema");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("/", validate(platformValidation), getPlatforms);

router.post("/", validate(platformValidation), isAdmin, addPlatform);

router.put("/:id", validate(platformValidation), isAdmin, updatePlatform);

router.delete("/:id", validate(platformValidation), isAdmin, removePlatform);

module.exports = router;
