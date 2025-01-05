const mongoose = require('mongoose');
const SearchTagsHistorySchema = new mongoose.Schema({
    tags: { type: String, required: true },

}, { timestamps: true });

const SearchTagsHistory = mongoose.model('searchTagsHistory', SearchTagsHistorySchema);

module.exports =
    SearchTagsHistory
