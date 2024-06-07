import { createLessonContent, updateLessonContent, getLessonContentById, getLessonContentByLessonId, deleteLessonContent } from '../models/lessonCont.model.js';
import lessonContentSchema from '../schemas/lessonContentSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const createLessonContentController = catchedAsync(async (req, res) => {
    const { error, value } = lessonContentSchema.validate(req.body);
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }
    const { lessonId, type, url } = value;
    saveImage(req.file, lessonId);
    console.log(req.file);
    const lessonContent = await createLessonContent(lessonId, type, req.file.originalname);
    response(res, 201, lessonContent);
});

function saveImage(file, lessonId) { // aca tienes modificar
    const dir = `./uploads/${lessonId}`;
    if (!fs.existsSync(dir)) {
        console.log('Para poder crear nueva carpeta');
    }
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

export const updateLessonContentController = catchedAsync(async (req, res) => {
    const { id, type, url } = req.body;
    const updatedUrl = req.file ? saveImage(req.file, 1) : null;
    const lessonContent = await updateLessonContent(id, type, updatedUrl);
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
