const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileLevelSchema = new Schema({
  levelName: { type: String, required: true, unique: true }, // e.g., 'New', 'Start', 'Spotlight'
  criteria: { type: Map, of: String }, // e.g., { 'followers': '>= 100', 'posts': '>= 10' }
  pointsRequired: { type: Number, required: true }, // Points required to reach this level
  rewards: { type: String }, // Description of rewards for this level
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProfileLevel = mongoose.model('ProfileLevel', profileLevelSchema);
module.exports = ProfileLevel;
