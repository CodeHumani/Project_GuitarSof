import Joi from 'joi';

const commentSchema = Joi.object({
  lessonId: Joi.number().integer().positive().required(),
  content: Joi.string().trim().required(),
});

export default commentSchema;
