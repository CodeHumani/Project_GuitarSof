import Joi from 'joi';

const purchaseSchema = Joi.object({
    courses: Joi.array().items(
        Joi.object({
            courseId: Joi.number().integer().required(),
            coursePrice: Joi.number().precision(2).required()
        })
    ).required(),
    paymentMethod: Joi.string().required(),
    cardNumber: Joi.string().optional(),
    cardHolderName: Joi.string().optional(),
    cardExpirationDate: Joi.date().optional()
});

export default purchaseSchema;
