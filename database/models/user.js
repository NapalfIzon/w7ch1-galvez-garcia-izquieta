const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  series: {
    type: [Types.ObjectId],
    ref: "Serie",
    required: true,
  },
});

const User = model("user", userSchema, "users");

module.exports = User;
