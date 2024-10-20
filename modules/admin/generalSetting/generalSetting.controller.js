const generalSettingService = require('./generalSetting.service');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../../utils'); // Adjust the path based on your structure

const createGeneralSetting = async (req, res) => {
    try {
        const newSetting = await generalSettingService.createGeneralSetting(req.body);
        return apiSuccessResponse(
            res, 
            'General Setting created successfully', 
            newSetting, 
            HTTP_STATUS.CREATED
        );
    } catch (err) {
        return apiErrorResponse(
            res, 
            err.message, 
            null, 
            HTTP_STATUS.BAD_REQUEST
        );
    }
};

const getAllGeneralSettings = async (req, res) => {
    try {
        const settings = await generalSettingService.getAllGeneralSettings();
        return apiSuccessResponse(
            res, 
            'General Settings retrieved successfully', 
            settings, 
            HTTP_STATUS.OK
        );
    } catch (err) {
        return apiErrorResponse(
            res, 
            err.message, 
            null, 
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

const getGeneralSettingById = async (req, res) => {
    try {
        const setting = await generalSettingService.getGeneralSettingById(req.params.id);
        if (!setting) {
            return apiErrorResponse(
                res, 
                'General Setting not found', 
                null, 
                HTTP_STATUS.NOT_FOUND
            );
        }
        return apiSuccessResponse(
            res, 
            'General Setting retrieved successfully', 
            setting, 
            HTTP_STATUS.OK
        );
    } catch (err) {
        return apiErrorResponse(
            res, 
            err.message, 
            null, 
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

const updateGeneralSetting = async (req, res) => {
    try {
        const updatedSetting = await generalSettingService.updateGeneralSetting(req.params.id, req.body);
        if (!updatedSetting) {
            return apiErrorResponse(
                res, 
                'General Setting not found', 
                null, 
                HTTP_STATUS.NOT_FOUND
            );
        }
        return apiSuccessResponse(
            res, 
            'General Setting updated successfully', 
            updatedSetting, 
            HTTP_STATUS.OK
        );
    } catch (err) {
        return apiErrorResponse(
            res, 
            err.message, 
            null, 
            HTTP_STATUS.BAD_REQUEST
        );
    }
};

const deleteGeneralSetting = async (req, res) => {
    try {
        const deletedSetting = await generalSettingService.deleteGeneralSetting(req.params.id);
        if (!deletedSetting) {
            return apiErrorResponse(
                res, 
                'General Setting not found', 
                null, 
                HTTP_STATUS.NOT_FOUND
            );
        }
        return apiSuccessResponse(
            res, 
            'General Setting deleted successfully', 
            null, 
            HTTP_STATUS.OK
        );
    } catch (err) {
        return apiErrorResponse(
            res, 
            err.message, 
            null, 
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports = {
    createGeneralSetting,
    getAllGeneralSettings,
    getGeneralSettingById,
    updateGeneralSetting,
    deleteGeneralSetting
};
