import { getCourseById } from '../models/course.model.js';
import { createLesons, updateLessons, deleteLesson, getLessonById, getLessonByTittle, getLessonByIdCourse } from '../models/lesson.model.js';
import lessonSchema  from '../schemas/lessonSchema.js';

export const createLessonsController = async (req, res) => {
  try {    
    const { error, value } = lessonSchema.validate(req.body);
    const { courseId, title, content } = value;
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const lesson = await createLesons(courseId, title, content);
    return res.status(201).json(lesson);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating lessons', detail: err.message });
  }
};

export const updateLessonsController = async (req, res) => {
  try {
    const { id, title, content } = req.body;
    if (!id || (!title && !content)) {
      return res.status(400).json({ message: 'please enter data' });
    }
    const lesson = await updateLessons(id, title, content);
    if (!lesson)  return res.status(400).json({ message: 'Error update lessons' });
    return res.status(201).json(lesson);
  } catch (err) {
    return res.status(500).json({ message: 'Error update lessons', detail: err.message });
  }
};

export const getLessonsId = async (req, res) => {
  try {
    const { id } = req.body;
    const lesson = await getLessonById(id);
    if (!lesson)  return res.status(400).json({ message: 'Error get lessons' });
    return res.status(201).json(lesson);
  } catch (err) {
    return res.status(500).json({ message: 'Error get lessons', detail: err.message });
  }
};

export const gestTitle =  async (req, res) => {
  try {
    const { title } = req.body;
    const lesson = await getLessonByTittle(title);
    return res.status(201).json(lesson);
  } catch (error) {
    return res.status(500).json({ message: 'Error get lessons', detail: err.message });
  }
};

export const gestlessonCour =  async (req, res) => {
  try {
    const { courseId } = req.body;
    const lesson = await getLessonByIdCourse(courseId);
    return res.status(201).json(lesson);
  } catch (error) {
    return res.status(500).json({ message: 'Error get lessons', detail: err.message });
  }
};

export const deleteLessons = async (req, res) => {
  try {
    const { id } = req.body;
    const lesson = await deleteLesson(id);
    if (!lesson)  return res.status(400).json({ message: 'Error get lessons' });
    return res.status(201).json(lesson);
  } catch (err) {
    return res.status(500).json({ message: 'Error get lessons', detail: err.message });
  }
};
