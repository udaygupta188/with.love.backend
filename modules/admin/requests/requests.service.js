
const { User } = require("../../user/userProfile/userProfile.model");

const getRequests = async (req, res) => {
    try {
        // const result = await Request.find({ status: 'pending' }).populate('brandId')
        const result = await User.find({ status: 'inactive' }, { email: 1, role: 1 }).populate('role')
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
        // const result = await Request.findById(reqId, updatedData);
        const result = await User.findOneAndUpdate({_id:reqId}, updatedData, {new:true})
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