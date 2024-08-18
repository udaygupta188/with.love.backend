const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    parent: { type: Schema.Types.ObjectId, ref: 'category', default: null },
    level: { type: Number, default: 1 },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    children: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'admin', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'admin' },
    history: [
      {
        updatedBy: { type: Schema.Types.ObjectId, ref: 'admin' },
        updatedAt: { type: Date, default: Date.now },
        changes: { type: Schema.Types.Mixed }, // Store the changes made
      }
    ],
    // SEO fields
    seo: {
        metaTitle: { type: String, trim: true },
        metaDescription: { type: String, trim: true },
        metaKeywords: { type: [String], trim: true },
        canonicalUrl: { type: String, trim: true }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to automatically update the `updatedAt` field
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Category Model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
