import { createCourse, updateCourse, deleteCourse, getCourseByTittle, getCourseById, getCourseByIdUser, getCourse } from '../models/course.model.js';
import courseSchema  from '../schemas/courseSchema.js';
import { getUserById } from '../models/auth.model.js';
import { token } from 'morgan';

export const createCourseController = async (req, res) => {
  try {    
    const { error, value } = courseSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(detail => detail.message).join(', ') });
    }
    const { title, description } = value;
    const userFound =  await getUserById(req.user.id);
    const course = await createCourse(userFound.id, title, description);
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating course', detail: err.message });
  }
};

export const updateCourseController = async (req, res) => {
  try {    
    const { id, title, description } = req.body;
    if (!id || (!title && !description)) {
      return res.status(400).json({ message: 'please enter data' });
    }
    const course = await updateCourse(id, title, description);
    if (!course)  return res.status(400).json({ message: 'Error update course' });
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: 'Error update course', detail: err.message });
  }
};

export const deleteCourseController = async (req, res) => {
  try {    
    const { id } = req.body;
    const course = await deleteCourse(id);
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: 'Error delete course', detail: err.message });
  }
};

export const gestTitle =  async (req, res) => {
  try {
    const { title } = req.body;
    const course = await getCourseByTittle(title);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Error get course', detail: err.message });
  }
};

export const gestCourse =  async (req, res) => {
  try {
    const course = await getCourse();
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Error get course', detail: err.message });
  }
};

export const gestId =  async (req, res) => {
  try {
    const { id } = req.body;
    const course = await getCourseById(id);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Error get course', detail: err.message });
  }
};

export const gestUserCour =  async (req, res) => {
  try {
    const userFound =  await getUserById(req.user.id);
    const course = await getCourseByIdUser(userFound.id);
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: 'Error get course', detail: err.message });
  }
};
