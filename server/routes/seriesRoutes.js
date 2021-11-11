const admin = require("firebase-admin");
const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");
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

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "w07ch01-galvez-garcia-izquieta.appspot.com",
});

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        ""
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}${oldFilenameExtension}`;

      callback(null, newFilename);
    },
  }),
});

const router = express.Router();

router.get("/", getSeries);
router.get("/viewed", getViewedSeries);
router.get("/pending", validate(serieValidation), getPendingSeries);

router.post(
  "/",
  upload.single("img"),
  async (req, res, next) => {
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    console.log(fileURL);
    next();
  },
  validate(serieValidation),
  addSerie
);

router.put("/:idSerie", validate(serieValidation), updateSerie);
router.delete("/:idSerie", validate(serieValidation), deletedSerie);
router.patch("/view/:idSerie", validate(serieValidation), markViewedSerie);

module.exports = router;
