const communicationService = require("../../services/communicationService");

const sendMessage = async (req, res) => {
    try {
        const message = await communicationService.sendMessage(req.body);
        return apiSuccessResponse(res, 'Message sent successfully', message, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to send message', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Additional controller methods can be added

module.exports = {
    sendMessage,
    // other exports
};
