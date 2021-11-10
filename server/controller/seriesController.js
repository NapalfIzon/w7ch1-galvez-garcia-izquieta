require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("series:seriesController");
const Serie = require("../../database/models/serie");

const getSeries = async (req, res, next) => {
  try {
    const series = await Serie.find();
    debug(chalk.blue("Haciendo un get a /series"));
    res.json(series);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const getViewedSeries = async () => {};

const getPendingSeries = async () => {};

const addSerie = async (req, res, next) => {
  try {
    const serie = req.body;
    const newSerie = await Serie.create(serie);
    debug(chalk.blue("Haciendo un post a /series"));
    res.json(newSerie);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const updateSerie = async () => {};

const deletedSerie = async () => {};

const markViewedSerie = async () => {};

module.exports = {
  getSeries,
  getViewedSeries,
  getPendingSeries,
  addSerie,
  updateSerie,
  deletedSerie,
  markViewedSerie,
};
