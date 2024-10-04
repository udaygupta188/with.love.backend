const paymentService = require('../services/paymentService');

const processPayment = async (req, res) => {
    try {
        const payment = await paymentService.processPayment(req.body);
        return apiSuccessResponse(res, 'Payment processed successfully', payment, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Payment processing failed', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getPaymentStatus = async (req, res) => {
    try {
        const paymentStatus = await paymentService.getPaymentStatus(req.params.id);
        return apiSuccessResponse(res, 'Payment status retrieved', paymentStatus, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to fetch payment status', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exportd ={
    processPayment,
    getPaymentStatus
}