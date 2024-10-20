const { Product } = require("../product/product.model");
const productService = require("../product/product.service")

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


const productSuggestion = async (filter) => {
    try {
        const result = await productService.getFilterProducts(filter);
        return result
    } catch (error) {
        throw new Error('Error Fetching in suggestion' + error.message)
    }
}
const curatorsSuggestion = async (filter) => {
    try {
        //filter should array of influencers ids
        let options = [filter]
        const result = await Product.find({ influencer: { $in: { options } } }).populate('influencers')
        return result
    } catch (error) {
        throw new Error('Error Fetching in suggestion' + error.message)
    }
}
const globalSearch = async (searchQuery) => {
    try {
        // Example search query object can have fields like name, category, tags, etc.
        const query = {};

        if (searchQuery.name) {
            // Using regex for partial match, case-insensitive
            query.name = { $regex: searchQuery.name, $options: 'i' };
        }

        if (searchQuery.category) {
            query.categories = searchQuery.category;
        }

        if (searchQuery.tags) {
            let tags = searchQuery.tags.join(',')
            query.tags = { $in: tags };
        }

        if (searchQuery.priceRange) {
            query.price = { $gte: searchQuery.priceRange.min, $lte: searchQuery.priceRange.max };
        }

        if (searchQuery.rating) {
            query.rating = { $gte: searchQuery.rating };
        }

        const result = await Product.find(query).populate('brand categories');
        return result;
    } catch (error) {
        throw new Error('Error searching product: ' + error.message);
    }
};

module.exports = {
    getAllCountries,
    productSuggestion,
    globalSearch,
    curatorsSuggestion
}
