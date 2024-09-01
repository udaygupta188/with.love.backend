const { countries } = require('countries-list');

const getAllCountries = async () => {
  // No need to fetch data, use the imported 'countries' directly
  return Object.keys(countries).map((key) => {
    const { name, native, phone, continent, capital, currency, languages } = countries[key];
    return {
      code: key,
      name,
      native,
      phone,
      continent,
      capital,
      currency,
      languages,
    };
  });
};

module.exports = {
  getAllCountries,
};
