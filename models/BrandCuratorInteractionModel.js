const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema to track brand interactions with curators (influencers)
const brandCuratorInteractionSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true }, // Reference to Brand
  curator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Curator (influencer)
  reachedAt: { type: Date, default: Date.now }, // Date of the interaction
  message: { type: String, trim: true }, // Optional message from the brand
  status: { type: String, enum: ['pending', 'contacted', 'declined'], default: 'pending' }, // Status of the interaction
}, { timestamps: true });

// Create the model
const BrandCuratorInteraction = mongoose.model('BrandCuratorInteraction', brandCuratorInteractionSchema);

module.exports = BrandCuratorInteraction;
