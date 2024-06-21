import { createPurchase } from '../models/purchase.model.js';
import purchaseSchema from '../schemas/purchaseSchema.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';
import { getByUserAndCourse } from '../models/course.model.js';

export const purchaseCourseController = catchedAsync(async (req, res) => {
    const { error, value } = purchaseSchema.validate(req.body);
    const { courseId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, coursePrice } = value;
    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }
    const existingPurchase = await getByUserAndCourse(req.user.id, courseId);
    console.log('Existing Purchase:', existingPurchase);  // Imprime el resultado en la consola
    if (existingPurchase) {
        const err = new Error('Ha subido el curso');
        err.statusCode = 400;
        throw err;
    }
    const purchase = await createPurchase(req.user.id, courseId, paymentMethod, cardNumber, cardHolderName, cardExpirationDate, coursePrice);
    response(res, 201, purchase);
});
