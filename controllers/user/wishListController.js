const wishlistService = require('../../services/wishListService');
const { apiSuccessResponse, HTTP_STATUS } = require('../../utils');

const addToWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistService.addToWishlist(req.body);
        return apiSuccessResponse(res, 'Product added to wishlist', wishlist, HTTP_STATUS.CREATED);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to add to wishlist', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getWishlistItems = async (req, res) => {
    try {
        const wishlistItems = await wishlistService.getWishlistItems(req.user.id); // assuming user ID is available
        return apiSuccessResponse(res, 'Wishlist items fetched successfully', wishlistItems, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to fetch wishlist items', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

const removeWishlistItem = async (req, res) => {
    try {
        const updatedWishlist = await wishlistService.removeWishlistItem(req.params.id);
        return apiSuccessResponse(res, 'Item removed from wishlist', updatedWishlist, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, 'Failed to remove item', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};


module.exports ={
    addToWishlist,
    getWishlistItems,
    removeWishlistItem
}