const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true }, // Added required for better validation
    expiresAt: { type: Date, required: true }, // Define as a field
  },
  {
    timestamps: true, // Enable automatic `createdAt` and `updatedAt` fields
  }
);

// Add an index to `expiresAt` to automatically remove documents after the specified time
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
