import Joi from 'joi';

const lessonSchema = Joi.object({
  courseId: Joi.number().integer().positive().required(),
  title: Joi.string().max(255).required(),
  content: Joi.string().optional().allow(null),
  imagePath: Joi.string().max(255).optional(),
  url: Joi.string().max(255).optional(),
});

export default lessonSchema;
