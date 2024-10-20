const { apiSuccessResponse, HTTP_STATUS, apiErrorResponse } = require("../../../utils")

const createAds = async (req, res) => {
    try {
        return apiSuccessResponse(res, '', null, HTTP_STATUS.CREATED)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updateAds = () => {
    try {
        return apiSuccessResponse(res, '', null, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}
const deleteAds = async () => {
    try {
        return apiSuccessResponse(res, '', null, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, '', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports ={
    createAds,
    updateAds,
    deleteAds
}