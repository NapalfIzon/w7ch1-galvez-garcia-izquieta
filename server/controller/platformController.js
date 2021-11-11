const chalk = require("chalk");
const debug = require("debug")("series:platformController");
const Platform = require("../../database/models/platform");

const getPlatforms = async (req, res) => {
  debug(
    chalk.bgBlueBright.white(
      "Se han consultado todas las plataformas registradas ₍ᐢ.⚇.ᐢ₎"
    )
  );
  const platforms = await Platform.find();
  res.json(platforms);
};

const addPlatform = async (req, res, next) => {
  const newPlatform = req.body;

  try {
    await Platform.create(newPlatform);
    res.json(newPlatform);
    debug(
      chalk.bgBlueBright.white("Se ha añadido una nueva plataforma ₍ᐢ.⚇.ᐢ₎")
    );
  } catch (error) {
    debug(
      chalk.bgBlueBright.white(
        "Se ha intentado añadir una plataforma sin autorización ₍ᐢ.⚇.ᐢ₎"
      )
    );
    error.code = 401;
    error.message = "No hemos podido crear la plataforma solicitada ʅ(°,ʖ°)ʃ";
    next(error);
  }
};

const updatePlatform = async (req, res, next) => {
  const temporalPlatform = req.body;
  try {
    const updatedPlatform = await Platform.findByIdAndUpdate(
      temporalPlatform.id,
      temporalPlatform,
      { new: true }
    );
    if (updatedPlatform) {
      res.json(updatedPlatform);
      debug(
        chalk.bgBlueBright.white("Se ha modificado la plataforma OK ₍ᐢ.⚇.ᐢ₎")
      );
    } else {
      const error = new Error("Plataforma no encontrada");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    debug(
      chalk.bgBlueBright.white(
        "Se ha intentado modificar una plataforma sin autorización ₍ᐢ.⚇.ᐢ₎"
      )
    );
    error.code = 401;
    error.message =
      "No hemos podido modificar la plataforma solicitada ʅ(°,ʖ°)ʃ";
    next(error);
  }
};

const removePlatform = async (req, res, next) => {
  const { idPlatform } = req.params;
  try {
    const deletedPlatform = await Platform.findByIdAndDelete(idPlatform);
    if (deletedPlatform) {
      res.json(deletedPlatform);
      debug(
        chalk.bgBlueBright.white("Se ha eliminado la plataforma OK ₍ᐢ.⚇.ᐢ₎")
      );
    } else {
      const error = new Error("Plataforma no encontrada");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    debug(
      chalk.bgBlueBright.white(
        "Se ha intentado eliminar una plataforma sin autorización ₍ᐢ.⚇.ᐢ₎"
      )
    );
    error.code = 401;
    error.message =
      "No hemos podido eliminar la plataforma solicitada ʅ(°,ʖ°)ʃ";
    next(error);
  }
};

module.exports = { getPlatforms, addPlatform, updatePlatform, removePlatform };
