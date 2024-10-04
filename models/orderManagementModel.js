const mongoose = require('mongoose');

// Return Schema
const returnSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    returnReason: {
        type: String,
        required: true
    },
    returnStatus: {
        type: String,
        enum: ['requested', 'approved', 'rejected', 'completed'],
        default: 'requested'
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    processedAt: Date
});

// Safety Claims Schema
const safetyClaimSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    claimReason: {
        type: String,
        required: true
    },
    claimStatus: {
        type: String,
        enum: ['filed', 'under_investigation', 'resolved', 'rejected'],
        default: 'filed'
    },
    filedAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: Date
});

// Case Log Schema
const caseLogSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    logMessage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Communication Schema
const communicationSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sentBy: {
        type: String,
        enum: ['customer', 'support'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

// Shipment Schema
const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    shipmentStatus: {
        type: String,
        enum: ['processing', 'shipped', 'in_transit', 'delivered', 'returned'],
        default: 'processing'
    },
    trackingNumber: {
        type: String,
        required: true
    },
    shippedAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: Date
});

const Return = mongoose.model('Return', returnSchema);
const SafetyClaim = mongoose.model('SafetyClaim', safetyClaimSchema);
const CaseLog = mongoose.model('CaseLog', caseLogSchema);
const Communication = mongoose.model('Communication', communicationSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = {
    Return,
    SafetyClaim,
    CaseLog,
    Communication,
    Payment,
    Shipment
};
