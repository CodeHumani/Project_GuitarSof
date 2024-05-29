import { Router } from "express";
import { createLessonsController, updateLessonsController, deleteLessons, getLessonsId, gestTitle, gestlessonCour } from "../controllers/lesson.controllers.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create', authRequired, createLessonsController);
router.put('/update', authRequired, updateLessonsController);
router.put('/delete', authRequired, deleteLessons);
router.get('/id', authRequired, getLessonsId);
router.get('/title', authRequired, gestTitle);
router.get('/idCourse', authRequired, gestlessonCour);

export default router;
