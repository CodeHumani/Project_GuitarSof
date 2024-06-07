import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controllers.js";
import { authRequired, checkNotAuthenticated } from '../middlewares/validateToken.js';

const router = Router();

router.post('/register', checkNotAuthenticated, register);
router.post('/login', checkNotAuthenticated, login);
router.post('/logout', authRequired, logout);
router.get("/profile", authRequired, profile);

export default router;
