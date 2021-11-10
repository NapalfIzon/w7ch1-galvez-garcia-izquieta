const express = require("express");
const {
  getPlatforms,
  addPlatform,
  updatePlatform,
  removePlatform,
} = require("../controller/platformController");

const router = express.Router();

router.get("/", getPlatforms);

router.post("/", addPlatform);

router.put("/:id", updatePlatform);

router.delete("/:id", removePlatform);
