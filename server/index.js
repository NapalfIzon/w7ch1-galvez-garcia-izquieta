const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("series:indexServer");
const morgan = require("morgan");

const usersRoutes = require("./routes/usersRoutes");
const seriesRoutes = require("./routes/seriesRoutes");
const platformsRoutes = require("./routes/platformsRoutes");

const {
  noEncontradoHandler,
  finalErrorHandler,
} = require("./middlewares/error");
const Auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isAdmin");

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

app.use("/users", usersRoutes);

app.use("/series", Auth, seriesRoutes);

app.use("/platforms", Auth, platformsRoutes);

app.use(noEncontradoHandler);
app.use(finalErrorHandler);

module.exports = { initializeServer, app };
