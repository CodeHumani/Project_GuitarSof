import pool from '../config/db.js';

export const createCourse  = async (userId, title, description, price) => {
    const result = await pool.query(
        'INSERT INTO "Courses" (userId, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, description, price]
    );
    return result.rows[0];
};

export const updateCourse = async (id, title, description, price) => {
    if (!id) {
        return null;
    }
    const fields = [];
    const values = [];
    let query = 'UPDATE "Courses" SET ';
    if (title) {
        fields.push('title');
        values.push(title);
    }
    if (description) {
        fields.push('description');
        values.push(description);
    }
    if (price !== undefined) {
        fields.push('price');
        values.push(price);
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

export const getByUserAndCourse = async (userId, id) => {
    const result = await pool.query(
        'SELECT * FROM "Courses" WHERE userId = $1 AND id = $2 AND eliminar = true',
        [userId, id]
    );
    return result.rows[0];
};

export const deleteCourse = async (id) => {
    const result = await pool.query(
        'UPDATE "Courses" SET eliminar = false WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};
