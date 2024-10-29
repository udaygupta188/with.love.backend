const { apiSuccessResponse, HTTP_STATUS, apiErrorResponse } = require("../../../utils")
const requestsService = require('./requests.service')
const getRequests = async (req, res) => {
    try {
        const requests = await requestsService.getRequests();
        return apiSuccessResponse(res, "Request fetched successfully", requests, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Error Occured", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const updateRequestStatus = async (req, res) => {
    try {
        const { reqId, status } = req.body;
        const requests = await requestsService.updateRequestStatus(reqId, { status });
        if(!requests.status){

        }
        return apiSuccessResponse(res, "Request updated successfully", null, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Error Occured", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getRequests,
    updateRequestStatus
}