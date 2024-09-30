const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the brand
const brandSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  logo: { type: String, trim: true }, // URL for brand logo
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

  tieUps: [{ type: Schema.Types.ObjectId, ref: 'TieUp' }], // Store the tie-ups with influencers

  // History to track changes made to the brand
  history: [
    {
      updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' }, // Reference to the admin who made changes
      updatedAt: { type: Date, default: Date.now }, // Timestamp of the change
      changes: { type: Schema.Types.Mixed } // Store details of the changes made
    }
  ],

  // SEO fields
  seo: {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: { type: [String], trim: true },
    canonicalUrl: { type: String, trim: true }
  },

  //created By
  createdBy:{type:Schema.Types.ObjectId, refPath:'createdByModel'},
  createdByModel: { type: String, enum: ['Admin', 'User'] } // Dynamically reference the correct model
  
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to automatically update the `updatedAt` field
brandSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Brand Model
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
