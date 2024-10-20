const mongoose = require('mongoose');
const { Schema } = mongoose;

//Activity Model
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

//Session Model
const sessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_accessed: { type: Date, default: Date.now },
    device: { type: String },
    deviceType: { type: String },
    ip_address: { type: String }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);


//Login Model
const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  IP: {
    type: String,
    required: true,
  },
  loggedInAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Login = mongoose.model("Login", loginSchema);














module.exports = { Activity, Session, Login }

