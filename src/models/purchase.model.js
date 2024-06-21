import pool from '../config/db.js';

export const createPurchase = async (userId, courseId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, coursePrice) => {
    const result = await pool.query(
        'INSERT INTO "Purchases" (userId, courseId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, coursePrice) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
        [userId, courseId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, coursePrice]
    );
    return result.rows[0];
};
