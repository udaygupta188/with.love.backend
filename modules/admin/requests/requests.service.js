
const Request = require("./requests.model")
const getRequests = async (req, res) => {
    try {
        const result = await Request.find({ status: 'pending' }).populate('brandId')
        if (result) {
            return {
                status: true,
                result: result
            };
        }

    } catch (error) {
        throw new Error('An error occured');
    }
}

const updateRequestStatus = async (reqId, updatedData) => {
    try {
        const result = await Request.findById(reqId, updatedData);
        return {
            status: true,
            result: result
        };
    } catch (error) {
        throw new Error('An error occured');
    }
}
module.exports = {
    getRequests,
    updateRequestStatus
}