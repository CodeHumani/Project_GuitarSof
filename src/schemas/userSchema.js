// src/schemas/userSchema.js
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});

export default userSchema;
