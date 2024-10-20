
const Brand = require("../admin/brand/brand.model");
const { Influencer } = require("../user/userProfile/userProfile.model");


const getAllInfluencer = async () => {
    return await Influencer.find().exec();
}

const getInfluencerBrands = async (userId) => {
    const influencer = await Brand.findOne({ createdBy: userId }).exec();
    return influencer
}
const getInfluencer = async(userId)=>{
    try{
    const response = await Influencer.find({userId}).exec();
    return response
    }catch(error){
        throw error
    }
}
module.exports = {
    getAllInfluencer,
    getInfluencerBrands,
    getInfluencer
}