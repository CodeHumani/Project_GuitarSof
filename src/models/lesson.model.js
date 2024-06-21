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
    const fields = [];
    const values = [];
    let query = 'UPDATE "Lessons" SET ';
    if (title) {
        fields.push('title');
        values.push(title);
    }
    if (content) {
        fields.push('content');
        values.push(content);
    }
    if (fields.length === 0) {
        return null;
    }
    fields.push('updatedAt');
    values.push(new Date());
    query += fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    query += ` WHERE id = $${fields.length + 1} AND eliminar = true RETURNING *`;
    values.push(id);
    const result = await pool.query(query, values);
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
