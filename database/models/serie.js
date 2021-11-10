const { Schema, model, Types } = require("mongoose");

const serieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  view: {
    type: Boolean,
    required: true,
  },
  platform: {
    type: [Types.ObjectId],
    ref: "Platform",
    required: true,
  },
});

const Serie = model("serie", serieSchema);

serieSchema.set("toJSON", {
  virtuals: false,
});

module.exports = Serie;
