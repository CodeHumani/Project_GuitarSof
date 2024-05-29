import { createComments, updateComment, deleteCourse, getCommentByUser, getCommentByLessons } from '../models/coment.model.js';
import commentSchema  from '../schemas/commetSchema.js';
import { getUserById } from '../models/auth.model.js';
import { token } from 'morgan';

export const createCommentController = async (req, res) => {
    try {
      // Validar la solicitud
      const { error, value } = commentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { lessonId, content } = value;
      // Obtener el usuario a partir del ID del token
      const userFound = await getUserById(req.user.id);  
      // Crear el comentario
      const comment = await createComments(lessonId, userFound.id, content);
      return res.status(201).json(comment);
    } catch (err) {
      return res.status(500).json({ message: 'Error creating comment', detail: err.message });
    }
};

export const updateCommentController = async (req, res) => {
  try {
    const { id, content } = req.body;
    const comment = await updateComment(id, content);
    if (!comment)  return res.status(400).json({ message: 'Error update comments' });
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: 'Error update comment', detail: err.message });
  }
};

export const deleteCommentController = async (req, res) => {
  try {    
    const { id } = req.body;
    const course = await deleteCourse(id);
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: 'Error delete comment', detail: err.message });
  }
};

export const getCommentController = async (req, res) => {
    try {    
        const { lessonId }  = req.body;
        const userFound = await getUserById(req.user.id);  
        const comment = await getCommentByUser(lessonId, userFound.id);
        if (!comment)  return res.status(400).json({ message: 'Error get comments' });
        return res.status(201).json(comment);
    } catch (err) {
      return res.status(500).json({ message: 'Error get comments', detail: err.message });
    }
};

export const getCommentControllerlessons = async (req, res) => {
  try {    
      const { lessonId }  = req.body;
      const comment = await getCommentByLessons(lessonId);
      if (!comment)  return res.status(400).json({ message: 'Error get comments' });
      return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: 'Error get comments', detail: err.message });
  }
};
