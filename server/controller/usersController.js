const {
  userName,
  password,
  isAdmin,
  series,
} = require("../../database/models/user");
const User = require("../../database/models/user");

const addUser = async (req, res) => {
  const users = await User.create({ userName, password, isAdmin, series });
  res.json(users);
};

module.exports = {
  addUser,
};
