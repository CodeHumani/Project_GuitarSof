import { createLessonContent, updateLessonContent, getLessonContentById, verifi, getLessonContentAll, getLessonContentByLessonId, deleteLessonContent } from '../models/lessonCont.model.js';
import lessonContentSchema from '../schemas/lessonContentSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const createLessonContentController = catchedAsync(async (req, res) => {
    const { error, value } = lessonContentSchema.validate(req.body);
    const { lessonId, url, tipo } = value;
    if (!tipo) {
        const lessonContent = await createLessonContent(lessonId, url, 'youtuber');
        return response(res, 201, lessonContent);
    }
    ensureDirectoryExistence(`./uploads/${lessonId}`)
    saveImage(req.file, lessonId);
    const existingContent = await verifi(lessonId, req.file.originalname);
    if (existingContent || error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }
    const lessonContent = await createLessonContent(lessonId, req.file.originalname, tipo);
    response(res, 201, lessonContent);
});

function ensureDirectoryExistence(dirPath) {
    if (fs.existsSync(dirPath)) {
        return true;
    }
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
};

function saveImage(file, lessonId) {
    const newPath = `./uploads/${lessonId}/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

export const updateLessonContentController = catchedAsync(async (req, res) => {
    const { id, url } = req.body;
    const codigo = await getLessonContentById(id);
    console.log(codigo.lessonid);
    if (req.file && codigo.tipo !== 'youtuber') {
        ensureDirectoryExistence(`./uploads/${codigo.lessonid}`);
        saveImage(req.file, codigo.lessonid);
        const existingContent = await verifi(codigo.lessonid, req.file.originalname);
        if (existingContent) {
            const err = new Error(error.details[0].message);
            err.statusCode = 400;
            throw err;
        }
        const lessonContent = await updateLessonContent(id, req.file.originalname);
        response(res, 201, lessonContent);
    }
    const lessonContent = await updateLessonContent(id, url);
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

export const getLessonContAllController = catchedAsync(async (req, res) => {
    const lessonContent = await getLessonContentAll();
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
