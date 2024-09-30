const mongoose = require('mongoose');
const { Schema } = mongoose;

const SocialMediaSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g., Instagram, Twitter, etc.
  socialId: { type: String, required: true }, // unique ID from the platform
  followers: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const SocialMedia = mongoose.model('SocialMedia', SocialMediaSchema);
module.exports = SocialMedia;