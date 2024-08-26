const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalSettingSchema = new Schema({
    type:{
        type: String,
        require: true
    },
    value:{
        type: String,
        require: true
    }
},{
    timestamps: true
});

generalSettingSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next();
});

const GeneralSetting = mongoose.model('GeneralSetting',generalSettingSchema);
module.exports = GeneralSetting;