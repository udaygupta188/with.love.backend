const CaseLog = require('../models/caseLogModel');

const createCaseLog = async (data) => {
    const newLog = new CaseLog(data);
    return await newLog.save();
};

// Additional service methods can be added

module.exports = {
    createCaseLog,
    // other exports
};
