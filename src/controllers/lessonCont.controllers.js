import { createLessonContent, updateLessonContent, getLessonContentById, getLessonContentByLessonId, deleteLessonContent } from '../models/lessonCont.model.js';
import lessonContentSchema from '../schemas/lessonContentSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';

export const createLessonContentController = catchedAsync(async (req, res) => {
    const { error, value } = lessonContentSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }
    const { lessonId, type, url } = value;
    const lessonContent = await createLessonContent(lessonId, type, url);
    response(res, 201, lessonContent);
});

export const updateLessonContentController = catchedAsync(async (req, res) => {
    const { id, type, url } = req.body;
    const lessonContent = await updateLessonContent(id, type, url);
    if (!lessonContent) {
        const err = new Error('Error updating lesson content');
        err.statusCode = 400;
        throw err;
    }
    response(res, 201, lessonContent);
});

export const getLessonContentByIdController = catchedAsync(async (req, res) => {
    const { id } = req.params;
    const lessonContent = await getLessonContentById(id);
    if (!lessonContent) {
        const err = new Error('Error getting lesson content');
        err.statusCode = 400;
        throw err;
    }
    response(res, 201, lessonContent);
});

export const getLessonContentByLessonIdController = catchedAsync(async (req, res) => {
    const { lessonId } = req.params;
    const lessonContents = await getLessonContentByLessonId(lessonId);
    response(res, 201, lessonContents);
});

export const deleteLessonContentController = catchedAsync(async (req, res) => {
    const { id } = req.body;
    const lessonContent = await deleteLessonContent(id);
    if (!lessonContent) {
        return res.status(400).json({ message: 'Error deleting lesson content' });
    }
    response(res, 201, lessonContent);
});
