require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("series:seriesController");
const Serie = require("../../database/models/serie");
const User = require("../../database/models/user");
const Platform = require("../../database/models/platform");

const getSeries = async (req, res, next) => {
  try {
    debug(chalk.green(`Soy el usuario ${req.userid}`));
    const user = await User.findOne({ _id: req.userid }).populate({
      path: "series",
      select: "name season view",
      populate: {
        path: "platform",
        select: "name",
      },
    });
    debug(chalk.green("Estamos poblando->"));
    debug(chalk.green(user));
    debug(chalk.blue("Mis series son:"));
    debug(chalk.blue(user.series));
    res.json(user.series);
  } catch (error) {
    error.code = 400;
    debug(chalk.green("Estamos mostrando el error->"));
    debug(chalk.green(error));
    error.message = "Datos erroneos!";
    next(error);
  }
};

const getViewedSeries = async (req, res, next) => {
  try {
    const series = req.body;
    await Serie.find({ view: true });
    debug(chalk.blue("Haciendo un get a /series vistas"));
    res.json(series);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const getPendingSeries = async (req, res, next) => {
  try {
    const series = req.body;
    await Serie.find({ view: false });
    debug(chalk.blue("Haciendo un get a /series  no vistas"));
    res.json(series);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const addSerie = async (req, res, next) => {
  try {
    debug(chalk.green("Haciendo un post a /series"));
    debug(chalk.green("Que tiene req.data"));
    debug(chalk.green(JSON.stringify(req.file)));
    const serie = req.body;
    serie.img = req.file.path;
    debug(chalk.green("El path de la foto será:"));
    debug(chalk.green(serie.img));
    debug(chalk.green(`La serie que llega es ${JSON.stringify(serie)}`));
    debug(chalk.green(`Soy el usuario ${req.userid}`));
    const newSerie = await Serie.create(serie);
    debug(chalk.green(`La serie que crea es ${JSON.stringify(newSerie)}`));
    const user = await User.findOne({ _id: req.userid });
    debug(chalk.green(`El usuario es ${JSON.stringify(user)}`));
    user.series = [...user.series, newSerie.id];
    await user.save();
    res.json(newSerie);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const updateSerie = async (req, res, next) => {
  const serie = req.body;
  const { idSerie } = req.params;
  debug(chalk.green("Haciendo un put a /series/:idSerie"));
  debug(chalk.green(JSON.stringify(req.body)));
  try {
    const updatedSerie = await Serie.findByIdAndUpdate(idSerie, serie, {
      new: true,
    });
    debug(chalk.green("Actualizando la serie->"));
    debug(chalk.green(updatedSerie));
    if (updatedSerie) {
      res.json(updatedSerie);
    } else {
      const error = new Error("Serie no encontrada");
      error.code = 404;
      next(error);
    }
  } catch {
    const error = new Error("Formato erroneo");
    error.code = 400;
    next(error);
  }
};

const deletedSerie = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const deleteSerie = await Serie.findByIdAndDelete(idSerie);
    debug(chalk.blue("Haciendo un delete a /series"));
    if (deleteSerie) {
      res.json({ id: deleteSerie.id });
    } else {
      const error = new Error("Serie no encontrada");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const markViewedSerie = async (req, res, next) => {
  const serie = req.params;
  try {
    const markedSerie = await Serie.findByIdAndUpdate(serie.id, serie, {
      view: true,
    });
    debug(chalk.blue("Marcando como vista a /series"));
    if (markedSerie) {
      res.json(markedSerie);
    } else {
      const error = new Error("Serie no encontrada");
      error.code = 404;
      next(error);
    }
  } catch {
    const error = new Error("Formato erroneo");
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getSeries,
  getViewedSeries,
  getPendingSeries,
  addSerie,
  updateSerie,
  deletedSerie,
  markViewedSerie,
};
