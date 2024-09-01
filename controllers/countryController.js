const countryService = require('../services/countryService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils');

const getCountries = async (req, res) => {
  try {
    const countries = await countryService.getAllCountries();
    return apiSuccessResponse(res, 'Countries retrieved successfully', countries, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  getCountries,
};
