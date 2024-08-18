const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Details Schema
const userDetailsSchema = new Schema({
  profile_avatar: { type: String },
  phone: { type: String },
  address: { type: String },
}, { _id: false });

// Activity Schema for User History
const activitySchema = new Schema({
  activity_type: {
    type: String,
    required: true,
    enum: ['login', 'logout', 'update_profile', 'purchase', 'viewed_item'], // Add more as needed
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    ip_address: { type: String },
    device: { type: String },
    deviceType: { type: String },
    location: { type: String },
    previous_data: { type: Schema.Types.Mixed }, // Can store any type of data (e.g., object, array, etc.)
  },
  user_agent: { type: String },
  reference_id: {
    type: Schema.Types.ObjectId, // References another collection (e.g., order ID for a purchase)
    ref: 'SomeOtherCollection',
  }
}, { _id: false });

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  email_verified_at: { type: Date },
  password: { type: String, required: true },
  userDetails: userDetailsSchema,
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  refreshToken: { type: String },
  blocked: { type: Boolean, default: false },
  joined: { type: Date, default: Date.now },
  history: [activitySchema], // Integrated Activity Schema here
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
