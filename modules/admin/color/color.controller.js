const { apiErrorResponse, HTTP_STATUS, apiSuccessResponse } = require("../../../utils")
const colorService = require('./color.service')
module.exports = {
    createColor: async (req, res) => {
        try {
            console.log(req.body)
            const result = await colorService.createColor(req.body)
            if(!result.status){
                apiErrorResponse(res, 'Color not created', result.status, HTTP_STATUS.BAD_REQUEST)
            }

            apiSuccessResponse(res, 'New Color Created', result, HTTP_STATUS.CREATED)
        } catch (error) {
            apiErrorResponse(res, 'Internal Server Error', error, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    },

    getColors   : async (req, res) => {
        try {
            const result = await colorService.getColors(req.query);
            if(!result.status){
                apiErrorResponse(res, 'No Color found', result, HTTP_STATUS.BAD_REQUEST)
            }
            apiSuccessResponse(res, 'All Color fetched successfully', result, HTTP_STATUS.OK)
        } catch (error) {
            apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    },
    updateColor: async (req, res) => {
        try {
            const result = await colorService.updateColor(req.params.id, req.body);
            if(!result.status){
                apiErrorResponse(res, 'Color not updated', result, HTTP_STATUS.BAD_REQUEST)
            }
            apiSuccessResponse(res, 'Color updated successfully', result, HTTP_STATUS.OK)
        } catch (error) {
            apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    },
    deleteColor: async (req, res) => {
        try {
            const result = await colorService.deleteColor(req.params.id);
            if(!result.status){
                apiErrorResponse(res, 'Color not updated', result, HTTP_STATUS.BAD_REQUEST)
            }
            apiSuccessResponse(res, 'Color deleted successfully', null, HTTP_STATUS.OK)
        } catch (error) {
            apiErrorResponse(res, 'Internal Server Error', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
    }
}