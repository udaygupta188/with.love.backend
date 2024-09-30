const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for brand-influencer tie-up
const tieUpSchema = new Schema({
  brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true }, // Brand that reached out
  influencer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Influencer's user ID
  contactCount: { type: Number, default: 0 }, // Number of times brand has contacted the influencer
  status: { type: String, enum: ['pending', 'active', 'rejected'], default: 'pending' }, // Status of the tie-up
  notes: { type: String, trim: true }, // Any additional notes related to the tie-up
  lastContactedAt: { type: Date, default: Date.now }, // Last time the influencer was contacted
}, { timestamps: true });

const TieUp = mongoose.model('TieUp', tieUpSchema);
module.exports = TieUp;
