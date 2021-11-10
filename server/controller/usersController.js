require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("series:usersController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const addUser = async (req, res) => {
  const userBody = req.body;
  const password = await bcrypt.hash(userBody.password, 10);
  debug(chalk.blue("Creando usuario en el endpoint /users/register"));
  const users = await User.create({
    userName: userBody.userName,
    password,
    isAdmin: userBody.isAdmin,
  });
  debug(chalk.blue(`Hemos creado el usuario ${users}`));
  res.json(users);
};

const getusers = async (req, res, next) => {
  try {
    const users = await User.find();
    debug(chalk.blue("Haciendo un get a /users"));
    res.json(users);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { userName, password } = req.body;
  debug(chalk.blue("Haciendo un post a /users/login"));
  debug(chalk.blue("loginUser"));
  debug(chalk.blue(userName));
  debug(chalk.blue(password));
  const user = await User.findOne({ userName });
  debug(chalk.blue(user));
  if (!user) {
    const error = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const contraseñaOK = await bcrypt.compare(password, user.password);
    debug(chalk.blue(contraseñaOK));
    if (!contraseñaOK) {
      const error = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else {
      debug(chalk.blue("Seguimos para generar el Token!"));
      debug(chalk.blue(`Codificando: ${user.id}`));
      debug(chalk.blue(`Codificando: ${user.userName}`));
      debug(chalk.blue(`Codificando: ${user.isAdmin}`));
      const token = jwt.sign(
        {
          id: user.id,
          userName: user.userName,
          isAdmin: user.isAdmin,
        },
        process.env.SERIES_HASH,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

module.exports = {
  addUser,
  getusers,
  loginUser,
};
