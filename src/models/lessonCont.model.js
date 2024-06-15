import pool from '../config/db.js';

export const createLessonContent = async (lessonId, url) => {
    const result = await pool.query(
        'INSERT INTO "LessonContent" (lessonId, url) VALUES ($1, $2) RETURNING *', 
        [lessonId, url]
    );
    return result.rows[0];
};

export const updateLessonContent = async (id, url) => {
    if (!id) {
        return null;
    }
    let result;
    if (url) {
        result = await pool.query(
            'UPDATE "LessonContent" SET url = $1 WHERE id = $2 RETURNING *', [url, id]
        );
    } else {
        result = await pool.query(
            'UPDATE "LessonContent" SET url = NULL WHERE id = $1 RETURNING *', [id]
        );
    }
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getLessonContentAll = async () => {
    const result = await pool.query('SELECT * FROM "LessonContent"',);
    return result.rows;
};

export const getLessonContentById = async (id) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE id = $1', [id]);
    return result.rows[0];
};

export const verifi = async (lessonId, url) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE lessonId = $1 and url = $2', [lessonId, url]);
    return result.rows.length;
};

export const getLessonContentByLessonId = async (lessonId) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE lessonId = $1', [lessonId]);
    return result.rows;
};

export const deleteLessonContent = async (id) => {
    const result = await pool.query(
        'DELETE FROM "LessonContent" WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
