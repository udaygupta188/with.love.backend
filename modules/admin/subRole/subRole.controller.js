const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../../utils');
const subRoleService = require('./subRole.service');
const createSubRole = async (req, res) => {
    try {
        const result = await subRoleService.createSubRole(req.body);
        return apiSuccessResponse(res, result.message, result.subRole, HTTP_STATUS.CREATED);
    } catch (error) {
        console.error('Create Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const getSubRoles = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await subRoleService.getSubRoles(id);
        return apiSuccessResponse(res, result.message || 'Sub Roles retrieved successfully', { subRoles: result.subRoles }, HTTP_STATUS.OK);
    } catch (error) {
        console.error('Read Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createSubRole,
    getSubRoles
}