const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require("../../utils");
const returnService = require("../../services/returnService");

const createReturn = async (req, res) => {
    try {
        const newReturn = await returnService.createReturn(req.body);
        return apiSuccessResponse(res, 'Return created successfully', newReturn, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create return', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Additional controller methods can be added for getAllReturns, getReturnById, updateReturn, deleteReturn

module.exports = {
    createReturn,
    // other exports
};
