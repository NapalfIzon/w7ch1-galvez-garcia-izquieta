const { Joi } = require("express-validation");

const platformValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports = platformValidation;
