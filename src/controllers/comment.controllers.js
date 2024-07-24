import { createComments, updateComment, deleteCourse, getCommentByUser, getCommentByLessons } from '../models/coment.model.js';
import commentSchema from '../schemas/commetSchema.js';
import { getUserById } from '../models/auth.model.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';

export const createCommentController = catchedAsync(async (req, res) => {
  const { error, value } = commentSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const { lessonId, content } = value;
  const userFound = await getUserById(req.user.id);
  const comment = await createComments(lessonId, userFound.id, content);
  response(res, 201, comment);
});

export const updateCommentController = catchedAsync(async (req, res) => {
  const { id, content } = req.body;
  const comment = await updateComment(id, content);
  response(res, 200, comment);
});

export const deleteCommentController = catchedAsync(async (req, res) => {
  const { id } = req.body;
  const course = await deleteCourse(id);
  response(res, 200, course);
});

export const getCommentController = catchedAsync(async (req, res) => {
  const { id } = req.body;
  const comment = await getCommentByUser(id);
  response(res, 200, comment);
});

export const getCommentControllerlessons = catchedAsync(async (req, res) => {
  const { lessonId } = req.body;
  const comment = await getCommentByLessons(lessonId);
  response(res, 200, comment);
});
