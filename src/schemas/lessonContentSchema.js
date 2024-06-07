import Joi from 'joi';

const lessonContentSchema = Joi.object({
  lessonId: Joi.number().integer().positive().required(),
  type: Joi.string().valid('document', 'image', 'video').required(),
  url: Joi.string().uri().required(),
});

export default lessonContentSchema;
