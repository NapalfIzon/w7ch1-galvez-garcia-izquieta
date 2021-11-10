const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("series:indexServer");
const morgan = require("morgan");
const errorHandler = require("./error");
const auth = require("./middlewares/auth");
const usersRoutes = require("./routes/usersRoutes");
const platformsRoutes = require("./routes/platformsRoutes");
const seriesRoutes = require("./routes/seriesRoutes");

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

/* app.use("/users", usersRoutes);

app.use("/platforms", platformsRoutes);

app.use("/series", auth, seriesRoutes);

app.use(errorHandler); */

module.exports = { initializeServer, app };
