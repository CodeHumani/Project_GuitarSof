import { getCourseById } from '../models/course.model.js';
import { createLesons, updateLessons, deleteLesson, getLessonById, getLessonByTittle, getLessonByIdCourse } from '../models/lesson.model.js';
import lessonSchema  from '../schemas/lessonSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';

export const createLessonsController = catchedAsync(async (req, res) => {
  const { error, value } = lessonSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const { courseId, title, content, imagePath, url } = value;
  const lesson = await createLesons(courseId, title, content, imagePath, url);
  response(res, 201, lesson);
});

export const updateLessonsController = catchedAsync(async (req, res) => {
    const { id, title, content, imagePath, url } = req.body;
    const lesson = await updateLessons(id, title, content, imagePath, url);
    if (!lesson) {
      const err = new Error('Error update lessons');
      err.statusCode = 400;
      throw err;
    }
    response(res, 201, lesson);
});

export const getLessonsId = catchedAsync(async (req, res) => {
    const { id } = req.body;
    const lesson = await getLessonById(id);
    if (!lesson) {
      const err = new Error('Error get lessons');
      err.statusCode = 400;
      throw err;
    }
    response(res, 201, lesson);
});

export const gestTitle =  catchedAsync(async (req, res) => {
    const { title } = req.body;
    const lesson = await getLessonByTittle(title);
    response(res, 201, lesson);
});

export const gestlessonCour =  catchedAsync(async (req, res) => {
    const { courseId } = req.params;
    const lesson = await getLessonByIdCourse(courseId);
    response(res, 201, lesson);
});

export const deleteLessons = catchedAsync(async (req, res) => {
    const { id } = req.body;
    const lesson = await deleteLesson(id);
    if (!lesson)  return res.status(400).json({ message: 'Error get lessons' });
    response(res, 201, lesson);
});
