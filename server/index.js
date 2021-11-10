const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("series:indexServer");
const morgan = require("morgan");
const express = require("express");
const { validate } = require("express-validation");
const errorHandler = require("./error");
const auth = require("./middlewares/auth");
const usersRoutes = require("./routes/usersRoutes");
const platformsRoutes = require("./routes/platformsRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const userValidation = require("./schemas/userSchema");
const serieValidation = require("./schemas/serieSchema");
const platformValidation = require("./schemas/platformSchema");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgGreen.white(
          `Servidor ejecutada OK y escuchando el puerto ${port} ${"ᕦ( ͡° ͜ʖ ͡°)ᕤ"}`
        )
      );
      resolve(server);
    });

    server.on("error", (error) => {
      debug(
        chalk.bgRed.white(
          `Ha habido un problema inicializando el servidor ಥ╭╮ಥ`
        )
      );
      if (error.code === "EADDRINUSE") {
        debug(chalk.bgRed.white(`El puerto ${port} está en uso ಥ╭╮ಥ`));
      }
      reject();
    });

    server.on("close", () => {
      debug(
        chalk.bgBlue.white(
          `Se ha desconectado el servidor correctamente ( ͡° ͜ʖ ͡°)`
        )
      );
    });
  });

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", validate(userValidation, {}, {}), auth, usersRoutes);

app.use(
  "/platforms",
  validate(platformValidation, {}, {}),
  auth,
  platformsRoutes
);
app.use("/series", validate(serieValidation, {}, {}), auth, seriesRoutes);

app.use(errorHandler);

module.exports = { initializeServer, app };
