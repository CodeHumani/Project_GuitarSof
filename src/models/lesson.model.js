import pool from '../config/db.js';

export const createLesons  = async (courseId, title, content) => {
    const result = await pool.query(
        'INSERT INTO "Lessons" (courseId, title, content) VALUES ($1, $2, $3) RETURNING *', 
        [courseId, title, content]
    );
    console.log('goog');
    return result.rows[0];
};

export const updateLessons = async (id, title, content) => {
    if (!id) {
        return null;
    }
    let result;
    if (title && !content) {
        result = await pool.query(
            'UPDATE "Lessons" SET title = $1 WHERE id = $2 AND eliminar = true RETURNING *', 
            [title, id]
        );
    } else if (!title && content) {
        result = await pool.query(
            'UPDATE "Lessons" SET content = $1 WHERE id = $2 AND eliminar = true RETURNING *', 
            [content, id]
        );
    } else {
        result = await pool.query(
            'UPDATE "Lessons" SET title = $1, content = $2 WHERE id = $3 AND eliminar = true RETURNING *', 
            [title, content, id]
        );
    }
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getLessonById = async (id) => {
    const result = await pool.query('SELECT * FROM "Lessons" WHERE id = $1', [id] );
    return result.rows[0];
};

export const getLessonByTittle = async (title) => {
    const result = await pool.query('SELECT * FROM "Lessons" WHERE title = $1', [title] );
    return result.rows;
};

export const getLessonByIdCourse = async (courseId) => {
    const result = await pool.query('SELECT * FROM "Lessons" WHERE courseId = $1', [courseId] );
    return result.rows;
};

export const deleteLesson = async (id) => {
    const result = await pool.query(
        'UPDATE "Lessons" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
