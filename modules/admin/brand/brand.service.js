const { generateSlug } = require("../../../utils");
const { Product } = require("../../product/product.model");
const Brand = require("./brand.model");

const createBrand = async (brandData) => {
  try {
    if (!brandData.name) {
      throw new Error('Brand name is required.');
    }

    // Ensure canonical URL is set
    if (!brandData.seo || !brandData.seo.canonicalUrl) {
      brandData.seo = {
        ...brandData.seo,
        canonicalUrl: generateSlug(brandData.name)
      };
    }

    const brand = new Brand({
      name: brandData.name,
      description: brandData.description,
      logo: brandData.logo,
      status: brandData.status,
      seo: brandData.seo,
      createdBy: brandData.createdBy,
      createdByModel: brandData.createdByModel
    });

    const savedBrand = await brand.save();

    return {
      message: 'Brand created successfully.',
      brand: savedBrand
    };
  } catch (error) {
    throw new Error(`Error creating brand: ${error.message}`);
  }
};


const getBrands = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const brands = await Brand.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCount = await Brand.countDocuments().exec();

    return {
      brands,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching brands:', error.message);
    throw error;
  }
};


const getBrandById = async (brandId) => {
  const brand = await Brand.findById(brandId);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return brand;
};

const updateBrand = async (brandId, brandData) => {
  try {
    // Generate canonical URL if not provided
    if (brandData.name) {
      brandData.seo = {
        ...brandData.seo,
        canonicalUrl: brandData.seo?.canonicalUrl || generateSlug(brandData.name)
      };
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      {
        $set: {
          name: brandData.name,
          description: brandData.description,
          logo: brandData.logo,
          status: brandData.status,
          seo: brandData.seo,
          updatedAt: Date.now()
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      throw new Error('Brand not found.');
    }

    return {
      message: 'Brand updated successfully.',
      brand: updatedBrand
    };
  } catch (error) {
    throw new Error(`Error updating brand: ${error.message}`);
  }
};


const deleteBrand = async (brandId) => {
  const brand = await Brand.findById(brandId);
  if (!brand) {
    throw new Error('Brand not found');
  }

  await brand.remove();
  return { message: 'Brand deleted successfully' };
};

const otherProducts = async (brandId) => {
  try {
    const result = await Product.find({ brand: brandId });
    console.log(result)
    if (!result.length) {
      return {
        status: false, data: null
      }
    }
    return {
      status: true, data: result
    }
  } catch (error) {
    throw new Error('Brand not found');
  }
}
module.exports = { createBrand, getBrands, getBrandById, updateBrand, deleteBrand, otherProducts };
