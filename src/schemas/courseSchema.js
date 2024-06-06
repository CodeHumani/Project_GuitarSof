import Joi from 'joi';

const courseSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().optional().allow(null),
});

export default courseSchema;
