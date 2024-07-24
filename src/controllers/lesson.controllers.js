import { getCourseById } from '../models/course.model.js';
import { createLesons, updateLessons, deleteLesson, getLessonById, getLessonByTittle, getLessonByIdCourse } from '../models/lesson.model.js';
import { response } from '../middlewares/catchedAsync.js';

class CourseController {
    constructor() { }

    async createLessons(req, res) {
      const { courseId, title, imagePath, position } = value;
      const lesson = await createLesons(courseId, title, imagePath, url);
      response(res, 201, lesson);
    }

    async updateLessons(req, res) {
        const { id,  title, imagePath, position } = req.body;
        const lesson = await updateLessons(id,  title, imagePath, position);
        if (!lesson) {
          return res.status(400).json({ error: true, message: 'Please enter data' });
        }
        response(res, 201, lesson);
    }

    async deleteLessons(req, res) {
        const { id } = req.params;
        const lesson = await deleteLesson(id);
        response(res, 201, lesson);
    }

    async gestTitle(req, res) {
      const { title } = req.body;
      const lesson = await getLessonByTittle(title);
      response(res, 201, lesson);
    }

    async gestlessonCour(req, res) {
        const { courseId } = req.params;
        const lesson = await getLessonByIdCourse(courseId);
        response(res, 201, lesson);
    }

    async getLessonsId(req, res) {
      const { id } = req.params;
      const lesson = await getLessonById(id);
      response(res, 201, lesson);
  }
}

export default new CourseController();
