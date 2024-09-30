const brandService = require('../../services/brandService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils');

const createBrand = async (req, res) => {
    try {
      const brandData = req.body;
      const result = await brandService.createBrand(brandData);
      return apiSuccessResponse(res, result.message, result.brand, HTTP_STATUS.CREATED);
    } catch (error) {
      console.error('Create Brand error:', error);
      return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  };

  module.exports = { createBrand};