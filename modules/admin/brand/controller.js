const brandService = require('./service');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../../utils');

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

const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    return apiSuccessResponse(res, 'Brands retrieved successfully', brands, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Get Brands error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;
    const brand = await brandService.getBrandById(brandId);
    return apiSuccessResponse(res, 'Brand retrieved successfully', brand, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Get Brand By ID error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const updateData = req.body;
    const result = await brandService.updateBrand(brandId, updateData);
    return apiSuccessResponse(res, result.message, result.brand, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Update Brand error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const result = await brandService.deleteBrand(brandId);
    return apiSuccessResponse(res, result.message, null, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Delete Brand error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createBrand, getBrands, getBrandById, updateBrand, deleteBrand };
