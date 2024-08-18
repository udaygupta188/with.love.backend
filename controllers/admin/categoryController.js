const categoryService = require('../../services/categoryService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Assuming you have imported the helper functions

// Create a new category
const createCategory = async (req, res) => {
    try {
        const adminId = req.admin._id;
        const categoryData = { ...req.body, createdBy: adminId };
        
        const newCategory = await categoryService.createCategory(categoryData);

        if(newCategory){
            return apiSuccessResponse(
                res,
                'Category Created Successfully',
                newCategory,
                HTTP_STATUS.CREATED
            );
        }else{
            return apiErrorResponse(      
                res, 
                err.message, 
                null, 
                HTTP_STATUS.NOT_FOUND
            );
        }
    } catch (err) {
        return apiErrorResponse(      
            res, 
            err.message, 
            null, 
            HTTP_STATUS.BAD_REQUEST
        );
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedById = req.admin._id; 

        // Call the service function to update the category
        const result = await categoryService.updateCategory(id, updates, updatedById);
        
        // Check if the update was successful
        return apiSuccessResponse(
            res,
            'Category Updated Successfully',
            result,
            HTTP_STATUS.OK
        );
    } catch (error) {
        // Handle the error caught from the service layer
        console.error('Error in controller:', error.message);

        return apiErrorResponse(
            res, 
            error.message, // Display the error message from the service
            null, 
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);

        if (category) {
            return apiSuccessResponse(
                res,
                'Category fetched successfully',
                category,
                HTTP_STATUS.OK
            );
        } else {
            return apiErrorResponse(
                res,
                'Category not found',
                null,
                HTTP_STATUS.NOT_FOUND
            );
        }
    } catch (error) {
        return apiErrorResponse(
            res,
            'Internal Server Error',
            error.message,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

const getAllCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit of 10 if not provided
        const categories = await categoryService.getAllCategories(parseInt(page), parseInt(limit));

        return apiSuccessResponse(
            res,
            'Categories fetched successfully',
            categories,
            HTTP_STATUS.OK
        );
    } catch (error) {
        return apiErrorResponse(
            res,
            'Internal Server Error',
            error.message,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};



const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);

        if (result) {
            return apiSuccessResponse(
                res,
                'Category deleted successfully',
                null,
                HTTP_STATUS.OK
            );
        } else {
            return apiErrorResponse(
                res,
                'Category not found or not deleted',
                null,
                HTTP_STATUS.NOT_FOUND
            );
        }
    } catch (error) {
        return apiErrorResponse(
            res,
            'Internal Server Error',
            error.message,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
};

module.exports={
    createCategory,
    updateCategory,
    getCategoryById,
    deleteCategory,
    getAllCategories
}