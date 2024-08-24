const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
