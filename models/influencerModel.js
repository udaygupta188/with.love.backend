const mongoose = require('mongoose');
const { Schema } = mongoose;

const influencerSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    brands: [{ type: mongoose.Types.ObjectId, ref: "Brand" }],

},
    {
        timestamps: true
    }
);

const Influencer = mongoose.model('Influencer', influencerSchema)
module.exports = Influencer;