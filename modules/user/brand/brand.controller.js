const brandService = require("../../admin/brand/brand.service");
const {
  apiSuccessResponse,
  apiErrorResponse,
  HTTP_STATUS,
} = require("../../../utils");

const createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    const result = await brandService.createBrand(brandData);
    return apiSuccessResponse(
      res,
      result.message,
      result.brand,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    console.error("Create Brand error:", error);
    return apiErrorResponse(
      res,
      error.message,
      null,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const brandsProduct = async (req, res) => {
  try {
    const { brandId } = req.params;
    const result = await brandService.otherProducts(brandId);
    if (!result.status) {
      return apiErrorResponse(
        res,
        "No products found",
        null,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return apiSuccessResponse(
      res,
      "Other product of same brand",
      result.data,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return apiErrorResponse(
      res,
      error.message,
      error.message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createBrand, brandsProduct };
