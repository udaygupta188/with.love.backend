const { Shipment } = require('../models/orderManagementModel')

const createShipment = async (data) => {
    const newShipment = new Shipment(data);
    return await newShipment.save();
};

// Additional service methods can be added

module.exports = {
    createShipment,
    // other exports
};
