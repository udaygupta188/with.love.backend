const Payment = require('../models/paymentModel');

const processPayment = async (paymentDetails) => {
    const payment = new Payment(paymentDetails);
    return await payment.save();
};

const getPaymentStatus = async (id) => {
    return await Payment.findById(id);
};

module.exports = {
    processPayment,
    getPaymentStatus
};
