import { crear, modificar, eliminar, getCourseByIdFilter, getCourseById, getCourseByIdUser, getCourse } from '../models/course.model.js';
import { response } from '../middlewares/catchedAsync.js';

class CourseController {
    constructor() { }

    async create(req, res) {
        const { title, description, price } = req.body;
        const course = await crear(req.user.id, title, description, price);
        response(res, 201, course);
    }

    async update(req, res) {
        const { title, description, price } = req.body;
        const { id } = req.params;
        if (!id || (!title && !description && !price)) {
            return res.status(400).json({ error: true, message: 'Please enter data' });
        }
        const course = await modificar(id, title, description, price);
        response(res, 201, course);
    }

    async eliminar(req, res) {
        const { id } = req.params;
        const course = await eliminar(id);
        response(res, 201, course);
    }

    async gestIdFilter(req, res) {
        const { id } = req.params;
        const course = await getCourseByIdFilter(id);
        response(res, 201, course);
    }

    async gestCourse(req, res) {
        const course = await getCourse();
        response(res, 201, course);
    }

    async gestId(req, res) {
        const { id } = req.params;
        const course = await getCourseById(id);
        response(res, 201, course);
    }

    async gestUser(req, res) {
        const course = await getCourseByIdUser(req.user.id);
        response(res, 201, course);
    }
}

export default new CourseController();
