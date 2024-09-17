const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true },
  description: String,
  stock: Number,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [String],
  discount: { type: Number, default: 0 }, // in percentage
  images: [String],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  variants: [
    {
      name: String,
      price: Number,
      stock: Number,
    },
  ],
  sku: { type: String, unique: true },
  weight: Number, // e.g. in grams
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
