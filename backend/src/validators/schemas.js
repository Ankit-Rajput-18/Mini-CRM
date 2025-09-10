const Joi = require("joi");

// User Register/Login validation
const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Customer validation
const customerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  company: Joi.string().optional(),
});

// Lead validation
const leadSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid("New", "Contacted", "Converted", "Lost")
    .default("New"),
  value: Joi.number().min(0).required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  customerSchema,
  leadSchema,
};
