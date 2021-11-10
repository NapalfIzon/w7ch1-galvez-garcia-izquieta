const { Schema, model } = require("mongoose");

const platformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Platform = model("platform", platformSchema);

module.exports = Platform;
