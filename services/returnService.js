const Return = require('../models/returnModel');
const Order = require('../models/orderModel')
const createReturnRequest = async (orderId, returnReason) => {
    try {
        // Check if order exists
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        // Create a new return request
        const returnRequest = new Return({
            orderId,
            returnReason,
            returnStatus: 'requested'
        });

        await returnRequest.save();

        return {
            message: 'Return request created successfully',
            returnRequest
        };
    } catch (error) {
        throw new Error(error.message);
    }
};
const getAllReturns = async (data) => {

};
const getReturnById = async (returnId   ) => {
    try {
        const returnRequest = await Return.findById(returnId).populate('orderId');
        if (!returnRequest) {
            throw new Error('Return request not found');
        }

        return returnRequest;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getReturnsByOrderId = async(orderId)=>{
    try {
        const returnRequests = await Return.find({ orderId }).populate('orderId');
        return returnRequests;
    } catch (error) {
        throw new Error(error.message);
    }
};
const updateReturnStatus = async (returnId, newStatus) => {
    try {
        const validStatuses = ['requested', 'approved', 'rejected', 'completed'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error('Invalid return status');
        }

        const returnRequest = await Return.findById(returnId);
        if (!returnRequest) {
            throw new Error('Return request not found');
        }

        // Update the status and processed date
        returnRequest.returnStatus = newStatus;
        if (newStatus !== 'requested') {
            returnRequest.processedAt = new Date();
        }

        await returnRequest.save();

        return {
            message: 'Return status updated successfully',
            returnRequest
        };
    } catch (error) {
        throw new Error(error.message);
    }
};



module.exports = {
    createReturnRequest,
    getAllReturns,
    getReturnById,
    getReturnsByOrderId,
    updateReturnStatus,
    };
