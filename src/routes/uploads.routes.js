import { Router } from "express";
import { createLessonContentController, updateLessonContentController, getLessonContentByIdController, getLessonContentByLessonIdController, deleteLessonContentController } from '../controllers/lessonCont.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/lessonContent', authRequired, createLessonContentController);
router.put('/lessonContent', authRequired, updateLessonContentController);
router.get('/lessonContent', getLessonContentByIdController);
router.get('/lessonContent/lesson', getLessonContentByLessonIdController);
router.delete('/lessonContent', authRequired, deleteLessonContentController);

export default router;
