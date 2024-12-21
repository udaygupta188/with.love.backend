
const { Schema, default: mongoose } = require("mongoose");

const ratingSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        rating: { type: Number, default: 0 },
        comment: { type: String, default: '' }
    },
    {
        timestamps: true
    }
);

const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating