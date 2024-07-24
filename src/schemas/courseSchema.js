// src/schemas/courseSchema.js
import Joi from 'joi';

const courseSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'any.required': 'El título es requerido',
    'string.empty': 'El título no puede estar vacío'
  }),
  description: Joi.string().optional().allow(null),
  price: Joi.number().precision(2).required().messages({
    'any.required': 'El precio es requerido',
    'number.base': 'El precio debe ser un número',
    'number.precision': 'El precio debe tener hasta 2 decimales'
  })
});

export default courseSchema;
