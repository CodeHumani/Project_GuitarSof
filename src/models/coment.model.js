import pool from '../config/db.js';

export const createComments = async (lessonId, userId, content) => {
    const result = await pool.query(
        'INSERT INTO "Comments" (lessonId, userId, content) VALUES ($1, $2, $3) RETURNING *',
        [lessonId, userId, content]
    );
    return result.rows[0];
};

export const updateComment = async (id, content) => {
    const result = await pool.query(
        'UPDATE "Comments" SET content = $2 WHERE id = $1 AND eliminar = true RETURNING *', 
        [id, content]
    );
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const deleteCourse = async (id) => {
    const result = await pool.query(
        'UPDATE "Comments" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};

export const getCommentByUser = async (lessonId, userId) => {
    const result = await pool.query('SELECT * FROM "Comments" WHERE lessonId = $1 and userId = $2 and eliminar= true', [lessonId, userId] );
    return result.rows; // Devuelve todas las filas que coincidan
};

export const getCommentByLessons = async (lessonId) => {
    const result = await pool.query('SELECT * FROM "Comments" WHERE lessonId = $1 and eliminar = true', [lessonId] );
    return result.rows; // Devuelve todas las filas que coincidan
};
