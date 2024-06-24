import pool from '../config/db.js';
import { buildUpdateQuery, getCourseByFilters }  from '../libs/utils.js';

export const createLesons = async (courseId, title, content, imagePath, url) => {
  const result = await pool.query(
    'INSERT INTO "Lessons" (courseId, title, content, imagePath, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [courseId, title, content, imagePath, url]
  );
  return result.rows[0];
};

export const updateLessons = async (id, title, content, imagepath) => {
    const fieldsToUpdate = { title, content, imagepath, url};
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
    const query = `
        SELECT 
            l.id,
            l.title,
            l.content,
            l.eliminar,
            l.createdAt,
            l.updatedAt,
            c.title as courseTitle
        FROM 
            "Lessons" l
        JOIN 
            "Courses" c ON l.courseId = c.id
        WHERE 
            l.courseId = $1
    `;
    const result = await pool.query(query, [courseId]);
    return result.rows;
};

export const deleteLesson = async (id) => {
    const result = await pool.query(
        'UPDATE "Lessons" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
