const Communication = require('../models/communicationModel');

const sendMessage = async (data) => {
    const message = new Communication(data);
    return await message.save();
};

// Additional service methods can be added

module.exports = {
    sendMessage,
    // other exports
};
