import { createCourse, updateCourse, deleteCourse, getCourseByTittle, getCourseById, getCourseByIdUser, getCourse } from '../models/course.model.js';
import courseSchema  from '../schemas/courseSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import { token } from 'morgan';

export const createCourseController = catchedAsync(async (req, res) => {   
  const { error, value } = courseSchema.validate(req.body, { abortEarly: false });
  const { title, description, price } = value;
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const course = await createCourse(req.user.id, title, description, price);
  response(res, 201, course);
});

export const updateCourseController = catchedAsync(async (req, res) => {
    const { id, title, description, price } = req.body;
    if (!id || (!title && !description && !price)) {
      const err = new Error('please enter data');
      err.statusCode = 400;
      throw err;
    }
    const course = await updateCourse(id, title, description, price);
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
    const course = await getCourseByIdUser(req.user.id);
    response(res, 201, course);
});
