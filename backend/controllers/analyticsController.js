const Monitor = require('../models/Monitor');
const moment = require('moment');

// Get uptime statistics
exports.getUptimeStats = async (req, res) => {
    try {
        const monitors = await Monitor.find({ user: req.user._id });
        const stats = monitors.map(monitor => ({
            name: monitor.name,
            uptime: calculateUptime(monitor),
            responseTime: monitor.responseTime || 0,
            status: monitor.status,
            lastChecked: monitor.lastChecked
        }));

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get monitor history
exports.getMonitorHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const monitor = await Monitor.findOne({ _id: id, user: req.user._id });
        
        if (!monitor) {
            return res.status(404).json({ message: 'Monitor not found' });
        }

        // Get history from the last 30 days
        const history = await MonitorHistory.find({
            monitorId: id,
            createdAt: { $gte: moment().subtract(30, 'days').toDate() }
        }).sort('createdAt');

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 