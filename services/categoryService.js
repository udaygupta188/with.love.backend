const Category = require('../models/categoryModel');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils');


const createCategory = async (data) => {
    const { 
        name, 
        parent, 
        level, 
        slug, 
        description, 
        image, 
        createdBy, 
        metaTitle, 
        metaDescription, 
        metaKeywords 
    } = data;

    // Create new category with SEO fields
    const newCategory = new Category({
        name,
        parent: parent || null,
        level: parent ? level + 1 : 1,
        slug,
        description,
        image,
        createdBy,
        updatedBy: createdBy,
        seo: {
            metaTitle,
            metaDescription,
            metaKeywords
        }
    });

    // Save the category
    await newCategory.save();

    // If the category has a parent, update the parent's children field
    if (parent) {
        await Category.findByIdAndUpdate(parent, { $push: { children: newCategory._id } });
    }

    return newCategory;
};


const updateCategory = async (id, updates, updatedById) => {
    try {
       
        const category = await Category.findById(id);

        if (!category) {
            throw new Error('Your error message here');
        }

        // Track changes
        const changes = {};
        for (const key in updates) {
            if (category[key] !== updates[key]) {
                changes[key] = { oldValue: category[key], newValue: updates[key] };
            }
        }

        // Update the category
        Object.assign(category, updates);
        category.updatedBy = updatedById;

        // Add to history if there are changes
        if (Object.keys(changes).length > 0) {
            category.history.push({
                updatedBy: updatedById,
                updatedAt: new Date(),
                changes
            });
        }

        // Save the updated category
        await category.save();

        return category;
    } catch (error) {
        console.error('Error updating category:', error.message);
        throw error; // Rethrow the error to handle it in the controller
    }
};

const getCategoryById = async (id) => {
    try {
        // Find the category by ID
        const category = await Category.findById(id).exec();
        return category;
    } catch (error) {
        console.error('Error fetching category:', error.message);
        throw error;
    }
};

const deleteCategory = async (id) => {
    try {
        // Delete the category by ID
        const result = await Category.findByIdAndDelete(id).exec();
        return result; // Will be null if no document was found and deleted
    } catch (error) {
        console.error('Error deleting category:', error.message);
        throw error;
    }
};

const getAllCategories = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)
            .exec();
        const totalCount = await Category.countDocuments().exec();
        
        return {
            categories,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

module.exports = {
    createCategory,
    updateCategory,
    getCategoryById,
    deleteCategory,
    getAllCategories
};
