import { Router } from "express";
import { createLessonContentController, updateLessonContentController, getLessonContAllController, getLessonContentByIdController, getLessonContentByLessonIdController, deleteLessonContentController } from '../controllers/lessonCont.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'uploads/'});

router.post('/create', upload.single('url'), createLessonContentController);
router.put('/lessonContent', upload.single('url'), updateLessonContentController);

router.get('/lessonContent/:id', getLessonContentByIdController);
router.get('/lessonContent/lesson/:lessonId', getLessonContentByLessonIdController);
router.get('/getAll', getLessonContAllController);

router.delete('/lessonContent', authRequired, deleteLessonContentController);

export default router;
