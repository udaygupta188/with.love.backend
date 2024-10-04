const shipmentService = require("../../services/shipmentService");

const createShipment = async (req, res) => {
    try {
        const newShipment = await shipmentService.createShipment(req.body);
        return apiSuccessResponse(res, 'Shipment created successfully', newShipment, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to create shipment', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

// Additional controller methods can be added

module.exports = {
    createShipment,
    // other exports
};
