const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
  brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Status of the request
  createdAt: { type: Date, default: Date.now }, // When the request was created
  updatedAt: { type: Date, default: Date.now } // When the request was last updated
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request
