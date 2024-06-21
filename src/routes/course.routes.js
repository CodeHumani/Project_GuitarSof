import { Router } from "express";
import { createCourseController, updateCourseController, deleteCourseController, gestTitle, gestId, gestUserCour, gestCourse } from "../controllers/course.controllers.js";
import { purchaseCourseController } from '../controllers/purchase.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create', authRequired, createCourseController);
router.put('/update', authRequired, updateCourseController);
router.put('/delete', authRequired, deleteCourseController);
router.get('/idUser', authRequired, gestUserCour);

router.get('/title', gestTitle);
router.get('/id', gestId);
router.get('/view',authRequired, gestCourse);

router.post('/purchase', authRequired, purchaseCourseController);

export default router;
