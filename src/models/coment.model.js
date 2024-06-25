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
    return result.rows[0];
};

export const deleteCourse = async (id) => {
    const result = await pool.query(
        'UPDATE "Comments" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};

export const getCommentByUser = async (id) => {
    const result = await pool.query('SELECT * FROM "Comments" WHERE id = $1 and eliminar= true', [id] );
    return result.rows; 
};

export const getCommentByLessons = async (lessonId) => {
    const query = `
        SELECT 
            c.*,
            u.name as userName
        FROM 
            "Comments" c
        JOIN 
            "Users" u ON c.userId = u.id
        WHERE 
            c.lessonId = $1 AND c.eliminar = true
    `;
    const result = await pool.query(query, [lessonId]);
    return result.rows;
};
