const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  description: Joi.string().min(5).max(200).required(),

  // image هنا string لأننا بنخزن اسم الملف
  image: Joi.string().optional(),
});

module.exports = {
  createCategorySchema,
};
