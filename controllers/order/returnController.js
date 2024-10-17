const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require("../../utils");
const returnService = require("../../services/returnService");

const createReturnRequest = async (req, res) => {
    try {
        const { orderId, returnReason } = req.body;
        const newReturn = await returnService.createReturnRequest(orderId, returnReason);
        return apiSuccessResponse(res, 'Return created successfully', newReturn, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getAllReturns = async (req, res) => {
    try {
        const returns = await returnService.getAllReturns(req.body)
        return apiSuccessResponse(res, 'Return list fetched successfully', returns, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getReturnById = async (req, res) => {
    try {
        const { returnId } = req.body;
        const returns = await returnService.getReturnById(returnId)
        return apiSuccessResponse(res, 'Return list fetched successfully', returns, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const getReturnsByOrderId = async(req, res)=>{
    try {
        const { orderId } = req.body;
        const returns = await returnService.getReturnsByOrderId(orderId);
        return apiSuccessResponse(res, 'Return list fetched successfully', returns, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);   
    }
}
const updateReturnStatus = async (req, res) => {
    try {
        const { returnId, newStatus } = req.body;
        const returns = await returnService.updateReturnStatus(returnId, newStatus)
        return apiSuccessResponse(res, 'Return status updated', returns, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createReturnRequest,
    getAllReturns,
    getReturnById,
    getReturnsByOrderId,
    updateReturnStatus,

};
