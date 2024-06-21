import Joi from 'joi';

const purchaseSchema = Joi.object({
    courseId: Joi.number().integer().required(),
    paymentMethod: Joi.string().required(),
    cardNumber: Joi.string().optional(),
    cardHolderName: Joi.string().optional(),
    cardExpirationDate: Joi.date().optional(),
    coursePrice: Joi.number().precision(2).required()
});

export default purchaseSchema;
