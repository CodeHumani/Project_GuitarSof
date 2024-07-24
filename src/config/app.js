import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';  // Importar cors
import authRoutes from '../routes/auth.routes.js';
import authCourse from '../routes/course.routes.js';
import authLessons from '../routes/lesson.routes.js';
import authComment from '../routes/commet.routes.js';
import uploads from '../routes/uploads.routes.js';
import { authRequired } from '../middlewares/validateToken.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/apis", authRoutes);
app.use("/apis/curso", authCourse);
app.use("/apis/leccion", authLessons);
app.use("/apis/contLeccion", authRequired, uploads);
app.use("/apis/comentario", authComment);

export default app;
