import pool from '../config/db.js';
import { getCourseByFilters }  from '../libs/utils.js';

export const createLessonContent = async (lessonId, url, tipo) => {
    const result = await pool.query(
        'INSERT INTO "LessonContent" (lessonId, url, tipo) VALUES ($1, $2, $3) RETURNING *', 
        [lessonId, url, tipo]
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
            'UPDATE "LessonContent" SET url = $2 WHERE id = $1 RETURNING *', [id, url]
        );
    } else {
        result = await pool.query(
            'UPDATE "LessonContent" SET url = NULL WHERE id = $1 RETURNING *', [id]
        );
    }
    return result.rows[0];
};

export const getLessonContentAll = async () => {
    const result = await pool.query('SELECT * FROM "LessonContent"',);
    return result.rows;
};

export const getLessonContentById = async (id) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE id = $1', [id]);
    return result.rows;
};

export const verifi = async (lessonId, url) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE lessonId = $1 and url = $2', [lessonId, url]);
    return result.rows.length;
};

export const getLessonContentByLessonId = async (lessonId) => {
    const result = await pool.query('SELECT * FROM "LessonContent" WHERE lessonId = $1', [lessonId]);
    return result.rows;
}

export const deleteLessonContent = async (id) => {
    const result = await pool.query(
        'DELETE FROM "LessonContent" WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
