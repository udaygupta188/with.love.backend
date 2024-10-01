const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String }
    },
    {
        timestamps: true
    });
const Role = mongoose.model('Role', roleSchema);
module.exports = Role