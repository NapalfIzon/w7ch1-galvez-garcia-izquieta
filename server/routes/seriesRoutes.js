const express = require("express");
const { validate } = require("express-validation");
const {
  getSeries,
  getViewedSeries,
  getPendingSeries,
  addSerie,
  updateSerie,
  deletedSerie,
  markViewedSerie,
} = require("../controller/seriesController");
const serieValidation = require("../schemas/serieSchema");

const router = express.Router();

router.get("/", getSeries);
router.get("/viewed", getViewedSeries);
router.get("/pending", validate(serieValidation), getPendingSeries);
router.post("/", validate(serieValidation), addSerie);
router.put("/:idSerie", validate(serieValidation), updateSerie);
router.delete("/:idSerie", validate(serieValidation), deletedSerie);
router.patch("/view/:idSerie", validate(serieValidation), markViewedSerie);

module.exports = router;
