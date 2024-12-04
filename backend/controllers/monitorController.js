const Monitor = require('../models/Monitor');
const MonitorHistory = require('../models/MonitorHistory');
const moment = require('moment');

// @desc    Get all monitors
// @route   GET /api/monitors
// @access  Private
exports.getMonitors = async (req, res) => {
    try {
        const monitors = await Monitor.find({ user: req.user._id });
        res.status(200).json(monitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single monitor
// @route   GET /api/monitors/:id
// @access  Private 
exports.getMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({ 
            _id: req.params.id,
            user: req.user._id
        });

        if (!monitor) {
            return res.status(404).json({ message: 'Monitor not found' });
        }

        res.status(200).json(monitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create monitor
// @route   POST /api/monitors
// @access  Private
exports.createMonitor = async (req, res) => {
    try {
        const monitorData = {
            ...req.body,
            interval: 3,
            user: req.user._id,
            notifications: {
                emails: req.body.notifications?.emails || [],
                enabled: req.body.notifications?.enabled ?? false,
                downtime: req.body.notifications?.downtime ?? true,
                uptime: req.body.notifications?.uptime ?? true
            }
        };

        const monitor = await Monitor.create(monitorData);
        res.status(201).json(monitor);
    } catch (error) {
        console.error('Create monitor error:', error);
        res.status(400).json({ 
            success: false,
            message: error.message || 'Failed to create monitor'
        });
    }
};

// @desc    Update monitor
// @route   PUT /api/monitors/:id
// @access  Private
exports.updateMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!monitor) {
            return res.status(404).json({ message: 'Monitor not found' });
        }

        const updateData = {
            ...req.body,
            interval: 3
        };

        const updatedMonitor = await Monitor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedMonitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete monitor
// @route   DELETE /api/monitors/:id
// @access  Private
exports.deleteMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!monitor) {
            return res.status(404).json({ message: 'Monitor not found' });
        }

        await Monitor.findByIdAndDelete(monitor._id);

        await MonitorHistory.deleteMany({ monitorId: monitor._id });

        res.status(200).json({ 
            success: true,
            message: 'Monitor deleted successfully' 
        });
    } catch (error) {
        console.error('Delete monitor error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to delete monitor' 
        });
    }
};

// @desc    Get monitor history
// @route   GET /api/monitors/:id/history
// @access  Private
exports.getMonitorHistory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verify monitor belongs to user
        const monitor = await Monitor.findOne({
            _id: id,
            user: req.user._id
        });

        if (!monitor) {
            return res.status(404).json({ message: 'Monitor not found' });
        }

        // Get last 30 records
        const history = await MonitorHistory.find({
            monitorId: id
        })
        .sort({ timestamp: -1 })
        .limit(30)
        .select('status responseTime timestamp');

        // Format and reverse to show oldest to newest
        const formattedHistory = history.reverse().map(record => ({
            time: moment(record.timestamp).format('HH:mm'),
            status: record.status,
            responseTime: record.responseTime
        }));

        res.json(formattedHistory);

    } catch (error) {
        console.error('Error fetching monitor history:', error);
        res.status(500).json({ message: 'Error fetching monitor history' });
    }
};
