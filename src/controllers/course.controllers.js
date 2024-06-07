import { createCourse, updateCourse, deleteCourse, getCourseByTittle, getCourseById, getCourseByIdUser, getCourse } from '../models/course.model.js';
import courseSchema  from '../schemas/courseSchema.js';
import { getUserById } from '../models/auth.model.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import { token } from 'morgan';

export const createCourseController = catchedAsync(async (req, res) => {   
  const { error, value } = courseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const { title, description } = value;
  const userFound =  await getUserById(req.user.id);
  const course = await createCourse(userFound.id, title, description);
  response(res, 201, course);
});

export const updateCourseController = catchedAsync(async (req, res) => {
    const { id, title, description } = req.body;
    if (!id || (!title && !description)) {
      const err = new Error('please enter data');
      err.statusCode = 400;
      throw err;
    }
    const course = await updateCourse(id, title, description);
    if (!course) {
      const err = new Error('Update not found');
      err.statusCode = 400;
      throw err;
    }
    response(res, 201, course);
});

export const deleteCourseController = catchedAsync(async (req, res) => {
    const { id } = req.body;
    const course = await deleteCourse(id);
    response(res, 201, course);
});

export const gestTitle =  catchedAsync(async (req, res) => {
    const { title } = req.body;
    const course = await getCourseByTittle(title);
    response(res, 201, course);
});

export const gestCourse =  catchedAsync(async (req, res) => {
    const course = await getCourse();
    response(res, 201, course);
});

export const gestId =  catchedAsync(async (req, res) => {
    const { id } = req.body;
    const course = await getCourseById(id);
    response(res, 201, course);
});

export const gestUserCour =  catchedAsync(async (req, res) => {
    const userFound =  await getUserById(req.user.id);
    const course = await getCourseByIdUser(userFound.id);
    response(res, 201, course);
});
