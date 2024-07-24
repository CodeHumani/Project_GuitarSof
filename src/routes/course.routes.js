import { Router } from "express";
import courseController from '../controllers/course.controllers.js';
import { authRequired } from '../middlewares/validateToken.js';
import validateSchema from '../middlewares/validateSchema.js';
import courseSchema from '../schemas/courseSchema.js';

const router = Router();

router.get('/libre/:id', courseController.gestIdFilter);
router.get('/view', courseController.gestCourse);

// Administrador
router.route("/:id")
    .put(authRequired, courseController.update)
    .get(courseController.gestId)
    .delete(authRequired, courseController.eliminar);

router.route("/")
    .post(authRequired, validateSchema(courseSchema), courseController.create)
    .get(authRequired, courseController.gestUser);

export default router;
