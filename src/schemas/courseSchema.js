import Joi from 'joi';

const courseSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': 'Title should be a type of text',
    'string.empty': 'Title cannot be an empty field',
    'any.required': 'Title is a required field',
  }),
  description: Joi.string().optional().allow(null).messages({
    'string.base': 'Description should be a type of text',
  }),
});

export default courseSchema;
