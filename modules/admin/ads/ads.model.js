const mongoose = require('mongoose');

const { Schema } = mongoose;

const adsAchema = new Schema({

}, {
    timestamps: true
});

const Ads = mongoose.model('Ads', adsAchema);

module.exports = Ads