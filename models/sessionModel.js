const mongoose = require('mongoose');
const { Schema } = mongoose;

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
module.exports = Session;
