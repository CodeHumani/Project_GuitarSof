import { Router } from "express";
import { createCourseController, updateCourseController, deleteCourseController, gestTitle, gestId, gestUserCour, gestCourse } from "../controllers/course.controllers.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create', authRequired, createCourseController);
router.put('/update', authRequired, updateCourseController);
router.put('/delete', authRequired, deleteCourseController);
router.get('/title', authRequired, gestTitle);
router.get('/id', authRequired, gestId);
router.get('/idUser', authRequired, gestUserCour);

router.get('/course', authRequired, gestCourse);

export default router;
