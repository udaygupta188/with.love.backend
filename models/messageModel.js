const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
