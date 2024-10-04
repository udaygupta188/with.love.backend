const safetyClaimService = require("../../services/safetyClaimService");

const createSafetyClaim = async (req, res) => {
    try {
        const newClaim = await safetyClaimService.createSafetyClaim(req.body);
        return apiSuccessResponse(res, 'Safety claim filed successfully', newClaim, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to file safety claim', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Additional controller methods can be added

module.exports = {
    createSafetyClaim,
    // other exports
};
