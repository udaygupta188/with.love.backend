const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
