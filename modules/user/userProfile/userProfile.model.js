const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    profile_avatar: { type: String },
    phone: { type: String },
    address: { type: String },
    date_of_birth: { type: Date },
    gender: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    refreshToken: { type: String },
    blocked: { type: Boolean, default: false },
    joined: { type: Date, default: Date.now },
    // role: { type: String, enum: ['user', 'curator', 'admin','brand'], default: 'user' },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    profile_completeness: { type: Number, default: 0 },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    resetPasswordToken: { type: String }, // Field to store reset token
    resetPasswordExpires: { type: Date }, // Field to store reset token expiration time
    profileLevel: { type: Schema.Types.ObjectId, ref: 'profileLevelModel' }, // Reference to ProfileLevel
    points: { type: Number, default: 0 }, // Track user's points
    socialmedia: [{ type: Schema.Types.ObjectId, ref: "SocialMedia" }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);




const influencerSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    brands: [{ type: mongoose.Types.ObjectId, ref: "Brand" }],

},
    {
        timestamps: true
    }
);

const Influencer = mongoose.model('Influencer', influencerSchema)
module.exports = { User, Influencer };