const caseLogService = require("../../services/caseLogService");

const createCaseLog = async (req, res) => {
    try {
        const newLog = await caseLogService.createCaseLog(req.body);
        return apiSuccessResponse(res, 'Case log created successfully', newLog, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create case log', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Additional controller methods can be added

module.exports = {
    createCaseLog,
    // other exports
};
