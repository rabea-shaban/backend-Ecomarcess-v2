const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  description: Joi.string().min(5).max(200).required(),

  price: Joi.number().min(0).required(),

  image: Joi.string().allow(null, "").optional(),

  category: Joi.string().required(), // ObjectId كـ string

  stock: Joi.number().min(0).optional(),
});

module.exports = {
  createProductSchema,
};
