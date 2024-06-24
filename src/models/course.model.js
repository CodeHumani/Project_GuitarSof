import pool from '../config/db.js';
import { buildUpdateQuery, getCourseByFilters }  from '../libs/utils.js';

export const createCourse  = async (userId, title, description, price) => {
    const result = await pool.query(
        'INSERT INTO "Courses" (userId, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, description, price]
    );
    return result.rows[0];
};

export const updateCourse = async (id, title, description, price) => {
    const fieldsToUpdate = { title, description, price };
    const { query, values } = buildUpdateQuery('Courses', fieldsToUpdate, id);
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const getCourse = async () => {
    const result = await pool.query('SELECT * FROM "Courses" WHERE eliminar = true');
    return result.rows;
};

export const getCourseById = async (id) => {
    return getCourseByFilters('Courses', { id });
};

export const getCourseByTittle = async (title) => {
    return getCourseByFilters('Courses', { title });
};

export const getCourseByIdUser = async (userid) => {
    return getCourseByFilters('Courses', { userid });
};

export const getByUserAndCourse = async (userid, id) => {
    return getCourseByFilters('Courses', { userid, id });
};

export const deleteCourse = async (id) => {
    const result = await pool.query(
        'UPDATE "Courses" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
