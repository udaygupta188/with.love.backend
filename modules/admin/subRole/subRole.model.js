const mongoose = require('mongoose');
const { Schema } = mongoose;

const subRoleSchema = new Schema({
    name: { type: String },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true  }
},
    {
        timestamps: true
    });
const Role = mongoose.model('SubRole', subRoleSchema);
module.exports = Role