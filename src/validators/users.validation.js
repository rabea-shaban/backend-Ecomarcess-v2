const Joi = require("joi");

const createRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

module.exports = {
  createRegisterSchema,
};
