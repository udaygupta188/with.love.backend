const Brand = require("../models/brandModel");
const Influencer = require("../models/influencerModel")

const getAllInfluencer = async () => {
    return await Influencer.find().exec();
}

const getInfluencerBrands = async (userId) => {
    const influencer = await Brand.findOne({ createdBy: userId }).exec();
    return influencer
}
module.exports = {
    getAllInfluencer,
    getInfluencerBrands
}