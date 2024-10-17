const roleService = require('./service');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../../utils');
const createRole = async (req, res) => {
    try {
        const result = await roleService.createRole(req.body);
        return apiSuccessResponse(res, result.message, result.role, HTTP_STATUS.CREATED);
    } catch (error) {
        console.error('Create Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const result = await roleService.updateRole(id, req.body);
        return apiSuccessResponse(res, result.message, result.role, HTTP_STATUS.OK);
    } catch (error) {
        console.error('Update Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
const getAllRoles = async (req, res) => {
    try {
        const result = await roleService.getAllRoles(req.body);
        return apiSuccessResponse(res, result.message || 'Roles retrieved successfully', { roles: result.roles, totalCount: result.totalCount, totalPages: result.totalPages, currentPage: result.currentPage }, HTTP_STATUS.OK);
    } catch (error) {
        console.error('Read Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await roleService.getRoleById(id);
        return apiSuccessResponse(res, result.message || 'Role retrieved successfully', result.role, HTTP_STATUS.OK);
    } catch (error) {

    }
}
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await roleService.deleteRole(id);
        return apiSuccessResponse(res, result.message, null, HTTP_STATUS.OK);
    } catch (error) {
        console.error('Delete Role error:', error);
        return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createRole,
    updateRole,
    getAllRoles,
    getRoleById,
    deleteRole
}