import pool from '../config/db.js';

export const createLessonContent = async (lessonId, type, url) => {
    const result = await pool.query(
        'INSERT INTO "LessonContent" (lessonId, type, url) VALUES ($1, $2, $3) RETURNING *', 
        [lessonId, type, url]
    );
    return result.rows[0];
};

export const updateLessonContent = async (id, type, url) => {
    if (!id) {
        return null;
    }
    let result;
    if (type && !url) {
        result = await pool.query(
            'UPDATE "LessonContent" SET type = $1 WHERE id = $2 RETURNING *', 
            [type, id]
        );
    } else if (!type && url) {
        result = await pool.query(
            'UPDATE "LessonContent" SET url = $1 WHERE id = $2 RETURNING *', 
            [url, id]
        );
    } else {
        result = await pool.query(
            'UPDATE "LessonContent" SET type = $1, url = $2 WHERE id = $3 RETURNING *', 
            [type, url, id]
        );
    }
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getLessonContentById = async (id) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE id = $1', [id]);
    return result.rows[0];
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
