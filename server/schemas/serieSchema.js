const { Joi } = require("express-validation");

const serieValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    season: Joi.number().required(),
    platform: Joi.string().required(),
    view: Joi.boolean().required(),
  }),
};

module.exports = serieValidation;
