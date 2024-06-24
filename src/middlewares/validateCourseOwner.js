import Course from '../models/course.model.js';

const validateCourseOwner = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id; // assuming req.user contains the authenticated user
        const course = await Course.findOne({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (course.creatorId !== userId) {
            return res.status(403).json({ message: 'You are not the owner of this course' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default validateCourseOwner;
