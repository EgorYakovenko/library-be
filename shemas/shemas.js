import Joi from "joi";

export const createBookSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  isBorrowed: Joi.bool(),
});

export const updateBookSchema = Joi.object({
  isbn: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  isBorrowed: Joi.bool(),
});
