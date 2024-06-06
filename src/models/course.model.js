import pool from '../config/db.js';

export const createCourse  = async (userId, title, description) => {
    try {
        const result = await pool.query(
            'INSERT INTO "Courses" (userId, title, description) VALUES ($1, $2, $3) RETURNING id, userId, title, description',
        [userId, title, description]
        );
        return result.rows[0];
    } catch (error) {
        
    }
};

export const updateCourse = async (id, title, description) => {
    let result;
    if (title && !description) {
        result = await pool.query(
            'UPDATE "Courses" SET title = $1 WHERE id = $2 AND eliminar = true RETURNING *', 
            [title, id]
        );
    } else if (!title && description) {
        result = await pool.query(
            'UPDATE "Courses" SET description = $1 WHERE id = $2 AND eliminar = true RETURNING *', 
            [description, id]
        );
    } else {
        result = await pool.query(
            'UPDATE "Courses" SET title = $1, description = $2 WHERE id = $3 AND eliminar = true RETURNING *', 
            [title, description, id]
        );
    }
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getCourse = async (id) => {
    const result = await pool.query('SELECT * FROM "Courses" WHERE eliminar = true');
    return result.rows;
};

export const getCourseById = async (id) => {
    const result = await pool.query('SELECT * FROM "Courses" WHERE id = $1 AND eliminar = true', [id] );
    return result.rows[0];
};

export const getCourseByTittle = async (title) => {
    const result = await pool.query('SELECT * FROM "Courses" WHERE title = $1 AND eliminar = true', [title] );
    return result.rows; // Devuelve todas las filas que coincidan
};

export const getCourseByIdUser = async (userId) => {
    const result = await pool.query('SELECT * FROM "Courses" WHERE userId = $1 AND eliminar = true', [userId] );
    return result.rows; // Devuelve todas las filas que coincidan
};

export const deleteCourse = async (id) => {
    const result = await pool.query(
        'UPDATE "Courses" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
