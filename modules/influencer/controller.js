const influencerService = require('./service');
const brandService = require('../admin/brand/service');
const { apiSuccessResponse, HTTP_STATUS, apiErrorResponse } = require('../../utils');
const { Influencer } = require('../user/userProfile/model');

const getAllInfluencer = async (req, res) => {
    try {
        const influencers = await influencerService.getAllInfluencer();
        if (influencers.length === 0) {
            return apiErrorResponse(res, "No influencers found", null, HTTP_STATUS.NOT_FOUND);
        }

        return apiSuccessResponse(res, "All Influencer fetched", influencers, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, "Internal server:", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
const getInfluencerBrands = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return apiErrorResponse(res, "Invalid or missing userId", null, HTTP_STATUS.BAD_REQUEST);
        }
        const brands = await influencerService.getInfluencerBrands(userId);
        if (!brands) {
            return apiErrorResponse(res, "No brands found for this user", null, HTTP_STATUS.NOT_FOUND);
        }
        console.log(brands)
        return apiSuccessResponse(res, "Influencer brand fetched successfully", brands, HTTP_STATUS.OK)

    } catch (error) {
        return apiErrorResponse(res, "Internal server:", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

const addBrand = async (req, res) => {
    try {
        const brand = await brandService.createBrand(req.body);

        // Find the influencer by createdBy (userId)
        const influencer = await Influencer.findOne({ userId: req.body.createdBy });
        if (!influencer) {
            return apiErrorResponse(res, "Influencer not found", null, HTTP_STATUS.NOT_FOUND);
        }
        const brands = influencer.brands ? [...influencer.brands, brand.brand._id] : [brand.brand._id];


        // Update the influencer with the new brand
        const updatedInfluencer = await Influencer.findOneAndUpdate(
            { userId: req.body.createdBy },
            { brands },
            { new: true }
        );
        if (!updatedInfluencer) {
            return apiErrorResponse(res, "Failed to update influencer with new brand", null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        // Success response
        return apiSuccessResponse(res, "Brand added successfully", brand, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Internal server:", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
const getInfluencer = async(req, res) => {
    try {
        const { userId } = req.params;
        const influencer =await influencerService.getInfluencer(userId)
        console.log(influencer)
        return apiSuccessResponse(res, "Influencer fetched", influencer, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, "Internal server:", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllInfluencer,
    getInfluencerBrands,
    addBrand,
    getInfluencer
}