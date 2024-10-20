
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils');
const publicServices = require('./public.service')
const getCountries = async (req, res) => {
  try {
    const countries = await publicServices.getAllCountries();
    return apiSuccessResponse(res, 'Countries retrieved successfully', countries, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const productSuggestion = async (req, res) => {
  try {
    const { categories, tags } = req.query
    let filter = {}
    if (categories) {
      filter.categories = categories
    }
    if (tags) {
      filter.tags = tags
    }
    const suggestion = await publicServices.productSuggestion(filter);

    return apiSuccessResponse(res, 'Suggested products', suggestion, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
const curatorsSuggestion = async (req, res) => {
  try {
    const { influencerId } = req.query;
    const suggestion = await publicServices.curatorsSuggestion(influencerId)
    return apiSuccessResponse(res, 'Suggested curators', null, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const globalSearch = async (req, res) => {
  try {
    const searchProducts = await publicServices.globalSearch(req.query)
    return apiSuccessResponse(res, 'Suggested products', searchProducts, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
module.exports = {
  getCountries,
  productSuggestion,
  curatorsSuggestion,
  globalSearch
};
