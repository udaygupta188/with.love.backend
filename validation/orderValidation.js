const Yup = require('yup');

const orderItemValidationSchema = Yup.object().shape({
    productId: Yup.string().required().length(24), // MongoDB ObjectId
    quantity: Yup.number().integer().min(1).required(),
    price: Yup.number().positive().required()
});

const shippingAddressValidationSchema = Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string().required(),
    postalCode: Yup.string().required()
});

const orderValidationSchema = Yup.object().shape({
    userId: Yup.string().required().length(24), // MongoDB ObjectId
    items: Yup.array().of(orderItemValidationSchema).min(1).required(),
    totalPrice: Yup.number().positive().required(),
    totalQuantity: Yup.number().integer().min(1).required(),
    paymentMethod: Yup.string().oneOf(['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']).required(),
    paymentStatus: Yup.string().oneOf(['pending', 'completed', 'failed']).optional(),
    orderStatus: Yup.string().oneOf(['processing', 'shipped', 'delivered', 'cancelled']).optional(),
    shippingAddress: shippingAddressValidationSchema.required(),
    createdAt: Yup.date().optional(),
    updatedAt: Yup.date().optional()
});

// Return Validation Schema
const returnValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    returnReason: Yup.string().required(),
    returnStatus: Yup.string().oneOf(['requested', 'approved', 'rejected', 'completed']).optional(),
    requestedAt: Yup.date().optional(),
    processedAt: Yup.date().optional()
});


// Safety Claim Validation Schema
const safetyClaimValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    claimReason: Yup.string().required(),
    claimStatus: Yup.string().oneOf(['filed', 'under_investigation', 'resolved', 'rejected']).optional(),
    filedAt: Yup.date().optional(),
    resolvedAt: Yup.date().optional()
});


// Case Log Validation Schema
const caseLogValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    logMessage: Yup.string().required(),
    createdAt: Yup.date().optional()
});


// Communication Validation Schema
const communicationValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    message: Yup.string().required(),
    sentBy: Yup.string().oneOf(['customer', 'support']).required(),
    createdAt: Yup.date().optional()
});

// Payment Validation Schema
const paymentValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    paymentMethod: Yup.string().oneOf(['credit_card', 'paypal', 'bank_transfer']).required(),
    paymentStatus: Yup.string().oneOf(['pending', 'completed', 'failed']).optional(),
    amount: Yup.number().positive().required(),
    paymentDate: Yup.date().optional()
});

// Shipment Validation Schema
const shipmentValidationSchema = Yup.object().shape({
    orderId: Yup.string().required().length(24), // MongoDB ObjectId
    shipmentStatus: Yup.string().oneOf(['processing', 'shipped', 'in_transit', 'delivered', 'returned']).optional(),
    trackingNumber: Yup.string().required(),
    shippedAt: Yup.date().optional(),
    deliveredAt: Yup.date().optional()
});

module.exports = {
    orderValidationSchema,
    orderItemValidationSchema,
    shippingAddressValidationSchema,
    returnValidationSchema,
    safetyClaimValidationSchema,
    caseLogValidationSchema,
    communicationValidationSchema,
    paymentValidationSchema,
    shipmentValidationSchema
};
