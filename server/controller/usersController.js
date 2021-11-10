const chalk = require("chalk");
const debug = require("debug")("series:usersController");
const bcrypt = require("bcrypt");
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

module.exports = {
  addUser,
};
