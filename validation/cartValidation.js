const Yup = require('yup');

const cartItemValidationSchema = Yup.object().shape({
    productId: Yup.string().required().length(24), // MongoDB ObjectId
    quantity: Yup.number().integer().min(1).required(),
    price: Yup.number().positive().required() // Positive number with precision
});


const cartValidationSchema = Yup.object().shape({
    userId: Yup.string().required().length(24), // MongoDB ObjectId
    items: Yup.array().of(cartItemValidationSchema).min(1).required(),
    totalPrice: Yup.number().positive().required(), // Positive number for price
    totalQuantity: Yup.number().integer().min(1).required(),
    createdAt: Yup.date().optional(),
    updatedAt: Yup.date().optional()
});


module.exports = {
    cartValidationSchema,
    cartItemValidationSchema
};
