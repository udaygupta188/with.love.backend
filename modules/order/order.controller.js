const { apiErrorResponse, HTTP_STATUS, apiSuccessResponse } = require("../../utils")
const orderService = require('./order.service');
const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        return apiSuccessResponse(res, 'Orders fetched successfully', orders.data, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await orderService.getUserOrders(userId);
        return apiSuccessResponse(res, 'Orders fetched successfully', orders.data, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params
        const orders = await orderService.getOrderDetail(id);
        return apiSuccessResponse(res, 'Orders fetched successfully', orders.data, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

const checkPurchase = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const orderStatus = await orderService.checkPurchase(userId, productId);
        if(!orderStatus.data){
            return apiErrorResponse(res, "User haven't this product", false, HTTP_STATUS.BAD_REQUEST)
        }
        return apiSuccessResponse(res, 'Purchase status fetch successfully', orderStatus.data, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    getOrders,
    getUserOrders,
    getOrderDetail,
    checkPurchase
}