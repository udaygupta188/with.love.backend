const SafetyClaim = require('../models/safetyClaimModel');

const createSafetyClaim = async (data) => {
    const newClaim = new SafetyClaim(data);
    return await newClaim.save();
};

// Additional service methods can be added

module.exports = {
    createSafetyClaim,
    // other exports
};
