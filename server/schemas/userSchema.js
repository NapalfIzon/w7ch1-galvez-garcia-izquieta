const { Joi } = require("express-validation");

const userValidation = {
  body: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    isAdmin: Joi.boolean(),
  }),
};

module.exports = userValidation;
