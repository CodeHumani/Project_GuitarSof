import { Router } from "express";
import { createCommentController, updateCommentController, deleteCommentController, getCommentControllerlessons, getCommentController } from "../controllers/comment.controllers.js";
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/create', authRequired, createCommentController);
router.put('/update', authRequired, updateCommentController);
router.put('/delete', authRequired, deleteCommentController);

router.get("/get", getCommentController);
router.get("/getLesson", getCommentControllerlessons);

export default router;
