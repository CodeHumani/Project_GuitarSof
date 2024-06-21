import { createPurchase, createPurchaseDetail } from '../models/purchase.model.js';
import purchaseSchema from '../schemas/purchaseSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import { getByUserAndCourse } from '../models/course.model.js';

export const purchaseCourseController = catchedAsync(async (req, res) => {
    const { error, value } = purchaseSchema.validate(req.body);
    const { courses, paymentMethod, cardNumber, cardHolderName, cardExpirationDate } = value;
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }
    let totalAmount = 0;
    for (const course of courses) {
        const existingPurchase = await getByUserAndCourse(req.user.id, course.courseId);
        if (existingPurchase) {
            const err = new Error(`Ya has comprado el curso con ID ${course.courseId}`);
            err.statusCode = 400;
            throw err;
        }
        totalAmount += course.coursePrice;
    }
    const purchase = await createPurchase(req.user.id, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, totalAmount);
    for (const course of courses) {
        const purchaseDetail = await createPurchaseDetail(purchase.id, course.courseId, course.coursePrice);
    }
    const responsePayload = {
        ...purchase,
        details: courses
    };
    response(res, 201, responsePayload);
});
