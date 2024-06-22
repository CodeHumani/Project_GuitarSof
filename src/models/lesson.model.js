import pool from '../config/db.js';
import { buildUpdateQuery, getCourseByFilters }  from '../libs/utils.js';

export const createLesons  = async (courseId, title, content) => {
    const result = await pool.query(
        'INSERT INTO "Lessons" (courseId, title, content) VALUES ($1, $2, $3) RETURNING *', 
        [courseId, title, content]
    );
    return result.rows[0];
};

export const updateLessons = async (id, title, content) => {
    const fieldsToUpdate = { title, content };
    const { query, values } = buildUpdateQuery('Lessons', fieldsToUpdate, id);
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getLessonById = async (id) => {
    return getCourseByFilters('Lessons', { id });
};

export const getLessonByTittle = async (title) => {
    return getCourseByFilters('Lessons', { title });
};

export const getLessonByIdCourse = async (courseId) => {
    return getCourseByFilters('Lessons', { courseId });
};

export const deleteLesson = async (id) => {
    const result = await pool.query(
        'UPDATE "Lessons" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
