const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    notifications: {
        email: {
            enabled: { type: Boolean, default: true },
            addresses: [String]
        },
        slack: {
            enabled: { type: Boolean, default: false },
            webhook: String
        }
    },
    defaultCheckInterval: {
        type: Number,
        default: 5
    },
    timezone: {
        type: String,
        default: 'UTC'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema); 