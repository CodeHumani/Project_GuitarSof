const validateCourseAccess = (req, res, next) => {
    const { courseId } = req.params;
    const user = req.user;

    if (!user.courseIds.purchased.includes(parseInt(courseId, 10)) && !user.courseIds.created.includes(parseInt(courseId, 10))) {
        return res.status(403).json({ error: true, message: 'Access denied: You do not have access to this course' });
    }

    next();
};

export default validateCourseAccess;
