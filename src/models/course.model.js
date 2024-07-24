import pool from '../config/db.js';
import { buildUpdateQuery, getCourseByFilters, getCourseByAll }  from '../libs/utils.js';

export const crear  = async (userId, title, description, price) => {
    const result = await pool.query(
        'INSERT INTO "Courses" (userId, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, description, price]
    );
    return result.rows[0];
};

export const modificar = async (id, title, description, price) => {
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
    return getCourseByAll('Courses', { id });
};

export const getCourseByIdFilter = async (id) => {
    return getCourseByFilters('Courses', { id });
};

export const getCourseByIdUser = async (userid) => {
    return getCourseByAll('Courses', { userid });
};

export const getByUserAndCourse = async (userid, id) => {
    return getCourseByFilters('Courses', { userid, id });
};

export const eliminar = async (id) => {
    const result = await pool.query(
        'UPDATE "Courses" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
