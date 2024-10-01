const mongoose = require('mongoose');
const { Schema } = mongoose;

const howToStyleSchema = new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    styleProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }]
}, {
    timestamps: true
});
const HowToStyle = mongoose.model('HowToStyle', howToStyleSchema);
module.exports = HowToStyle;