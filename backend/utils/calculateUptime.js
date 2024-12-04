const moment = require('moment');
const MonitorHistory = require('../models/MonitorHistory');

const calculateUptime = async (monitorId, days = 30) => {
    const startDate = moment().subtract(days, 'days').toDate();
    
    const history = await MonitorHistory.find({
        monitorId,
        timestamp: { $gte: startDate }
    });

    if (history.length === 0) return 100;

    const upChecks = history.filter(check => check.status === 'up').length;
    return (upChecks / history.length) * 100;
};

module.exports = calculateUptime; 