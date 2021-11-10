const { Joi } = require("express-validation");

const serieValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    season: Joi.number().required(),
    view: Joi.boolean().required(),
  }),
};

module.exports = serieValidation;
