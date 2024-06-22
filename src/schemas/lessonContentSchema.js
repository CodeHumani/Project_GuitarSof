import Joi from 'joi';

const lessonContentSchema = Joi.object({
  lessonId: Joi.number().integer().positive().required(),
  url: Joi.string().uri().optional()
});

export default lessonContentSchema;
