const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activity_type: {
    type: String,
    required: true,
    enum: ['login', 'logout', 'update_profile', 'purchase', 'viewed_item', 'other'] // Add more as needed
  },
  timestamp: { type: Date, default: Date.now },
  details: {
    ip_address: { type: String },
    device: { type: String },
    deviceType: { type: String },
    location: { type: String },
    previous_data: { type: Schema.Types.Mixed } // To store previous data if needed
  },
  user_agent: { type: String },
  reference_id: { type: Schema.Types.ObjectId, ref: 'Post' } // For actions like 'purchase', reference related models
}, { timestamps: true });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
