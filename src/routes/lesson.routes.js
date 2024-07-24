import { Router } from "express";
import lessonController from "../controllers/lesson.controllers.js";

import { authRequired } from '../middlewares/validateToken.js';
import validateSchema from '../middlewares/validateSchema.js';
import lessonSchema from '../schemas/lessonSchema.js';

const router = Router();

router.post("/").post(authRequired, validateSchema(lessonSchema), lessonController.createLessons);

router.get('/curso/:courseId', lessonController.gestTitle);

// Administrador
router.route("/:id")
    .put(authRequired, lessonController.updateLessons)
    .get(lessonController.getLessonsId)
    .delete(authRequired, lessonController.deleteLessons);

export default router;