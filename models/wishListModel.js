const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [wishlistItemSchema],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
