const Wishlist = require('../models/wishListModel');

const addToWishlist = async (wishlistItem) => {
    const wishlist = await Wishlist.findOneAndUpdate(
        { userId: wishlistItem.userId },
        { $addToSet: { items: wishlistItem } }, // Add item only if it doesn't already exist
        { new: true, upsert: true }
    );
    return wishlist;
};

const getWishlistItems = async (userId) => {
    const wishlist = await Wishlist.findOne({ userId }).populate('items.productId');
    return wishlist ? wishlist.items : [];
};

const removeWishlistItem = async (itemId) => {
    return await Wishlist.findOneAndUpdate(
        {},
        { $pull: { items: { _id: itemId } } }, // Remove item by ID
        { new: true }
    );
};

module.exports = {
    addToWishlist,
    getWishlistItems,
    removeWishlistItem
};
