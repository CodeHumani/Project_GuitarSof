import Joi from 'joi';

const lessonSchema = Joi.object({
    courseId: Joi.number().integer().positive().required().messages({
      'any.required': 'El ID del curso es requerido',
      'number.base': 'El ID del curso debe ser un número entero positivo',
    }),
    title: Joi.string().max(255).required().messages({
      'any.required': 'El título es requerido',
      'string.max': 'El título no puede exceder los 255 caracteres'
    }),
    content: Joi.string().optional().allow(null).messages({
      'string.base': 'El contenido debe ser un texto'
    }),
    imagePath: Joi.string().max(255).optional().messages({
      'string.max': 'La ruta de la imagen no puede exceder los 255 caracteres'
    }),
    url: Joi.string().max(255).optional().messages({
      'string.max': 'La URL no puede exceder los 255 caracteres'
    }),
    position: Joi.number().integer().positive().required().messages({
      'any.required': 'La posición es requerida',
      'number.base': 'La posición debe ser un número entero positivo'
    })
});

export default lessonSchema;
