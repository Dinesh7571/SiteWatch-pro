const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    url: {
        type: String,
        required: [true, 'Please add a URL'],
    },
    type: {
        type: String,
        required: true,
        enum: ['http', 'ping', 'port']
    },
    method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
        default: 'GET'
    },
    headers: {
        type: String
    },
    expectedStatus: {
        type: String,
        default: '200'
    },
    host: String,
    port: Number,
    notifications: {
        emails: [{
            type: String,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add valid email(s)']
        }],
        enabled: {
            type: Boolean,
            default: false
        },
        downtime: {
            type: Boolean,
            default: true
        },
        uptime: {
            type: Boolean,
            default: true
        }
    },
    status: {
        type: String,
        enum: ['up', 'down', 'pending'],
        default: 'pending',
    },
    interval: {
        type: Number,
        default: 3,  // Changed from 5 to 3 minutes
    },
    lastChecked: {
        type: Date,
    },
    responseTime: {
        type: Number,
    },
    keywords: [{
        type: String,
        trim: true
    }],
    shouldExist: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Monitor', monitorSchema);
