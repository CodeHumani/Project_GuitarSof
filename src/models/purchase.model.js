import pool from '../config/db.js';

export const createPurchase = async (userId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, totalAmount) => {
    const result = await pool.query(
        'INSERT INTO "Purchases" (userId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, totalAmount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [userId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, totalAmount]
    );
    console.log('createPurchase result:', result.rows[0]); // Depuración
    return result.rows[0];
};

export const createPurchaseDetail = async (purchaseId, courseId, coursePrice) => {
    const result = await pool.query(
        'INSERT INTO "PurchaseDetails" (purchaseId, courseId, coursePrice) VALUES ($1, $2, $3) RETURNING *', 
        [purchaseId, courseId, coursePrice]
    );
    return result.rows;
};
