const mongoose = require('mongoose');

const monitorHistorySchema = new mongoose.Schema({
    monitorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Monitor'
    },
    status: {
        type: String,
        enum: ['up', 'down'],
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    responseCode: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    index: { monitorId: 1, timestamp: -1 }
});

module.exports = mongoose.model('MonitorHistory', monitorHistorySchema); 