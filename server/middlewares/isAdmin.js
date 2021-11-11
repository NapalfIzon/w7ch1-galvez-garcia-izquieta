const chalk = require("chalk");
const debug = require("debug")("series:isAdmin");

const isAdmin = (req, res, next) => {
  debug(chalk.green("Estoy en isAdmin"));
  const admin = req.isAdmin;
  debug(chalk.green(`El usuario tiene el isAdmin en ${admin}`));
  if (admin) {
    next();
  } else {
    const error = new Error("No Admin user!");
    error.code = 403;
    debug(chalk.red(`El error generado es ${error}`));
    next(error);
  }
};

module.exports = isAdmin;
