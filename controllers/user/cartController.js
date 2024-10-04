const { apiErrorResponse, HTTP_STATUS, apiSuccessResponse } = require("../../utils");
const cartService = require('../../services/cartServices');
const addProductToCart = async (req, res) => {
    try {
        console.log(req.user)
        const newCartItem = await cartService.addProductToCart(req.user._id,req.body);
        return apiSuccessResponse(res, 'Cart updated successfully', newCartItem, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Internal Server", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

};
const emptyCart = async (req, res) => {
    try {
        const removedCartItem = await cartService.emptyCart(req.user._id)
        return apiSuccessResponse(res, 'Cart cleared', removedCartItem, HTTP_STATUS.OK)
    } catch (error) {
        return apiErrorResponse(res, "Internal Server", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

};
const removeProductFromCart = async (req, res) => {
    try {
        const removedCartItem = await cartService.removeProductFromCart(req.user._id, req.params.productId);
        return apiSuccessResponse(res, 'Product removed from cart', removedCartItem, HTTP_STATUS.OK)

    } catch (error) {
        return apiErrorResponse(res, "Internal Server", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

};
const updateProductQuantityInCart = async (req, res) => {
    try {
        const updatedCartItem = await cartService.updateProductQuantityInCart(req.user._id, req.params.productId, req.body.quantity)
        return apiSuccessResponse(res, 'Cart updated successfully', updatedCartItem, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Internal Server", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

};
const getCartItems = async (req, res) => {
    try {
        
        const cartItems = await cartService.getCartItems(req.user._id)
        if (!cartItems) {
            return apiErrorResponse(res, 'Cart not found', null, HTTP_STATUS.NOT_FOUND)
        }
        return apiSuccessResponse(res, '', cartItems, HTTP_STATUS.OK);
    } catch (error) {
        return apiErrorResponse(res, "Internal Server", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }

}

module.exports = {
    addProductToCart,
    emptyCart,
    removeProductFromCart,
    updateProductQuantityInCart,
    getCartItems
}