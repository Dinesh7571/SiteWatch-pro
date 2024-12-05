const Monitor = require('../models/Monitor');
const MonitorHistory = require('../models/MonitorHistory');
const { sendDowntimeNotification, sendUptimeNotification } = require('./emailService');

const enhancedMonitoring = async (monitor) => {
    console.log(`\n=== Starting monitoring check for ${monitor.url} ===`);
    const startTime = Date.now();
    
    try {
        const response = await fetch(monitor.url, { timeout: 10000 });
        const responseTime = Date.now() - startTime;
        
        let status = response.ok ? 'up' : 'down';

        // For keyword monitoring, check the content
        if (monitor.type === 'keyword' && response.ok) {
            const content = await response.text();
            const keywordsFound = monitor.keywords.every(keyword => 
                content.toLowerCase().includes(keyword.toLowerCase())
            );
            
            // If shouldExist is true, keywords should be present
            // If shouldExist is false, keywords should be absent
            status = (keywordsFound === monitor.shouldExist) ? 'up' : 'down';
        }

        // Save history record
        await MonitorHistory.create({
            monitorId: monitor._id,
            status,
            responseTime,
            responseCode: response.status
        });

        const updateData = {
            status,
            lastChecked: new Date(),
            responseTime,
            responseCode: response.status
        };

        // Check if status changed and send notifications
        const previousStatus = monitor.status;
        if (previousStatus !== updateData.status && monitor.notifications?.enabled) {
            if (updateData.status === 'down' && monitor.notifications.downtime) {
                await sendDowntimeNotification(monitor, monitor.notifications.emails);
            } else if (updateData.status === 'up' && previousStatus === 'down' && monitor.notifications.uptime) {
                await sendUptimeNotification(monitor, monitor.notifications.emails);
            }
        }

        await Monitor.findByIdAndUpdate(monitor._id, updateData);
        console.log(`Monitor status updated successfully for ${monitor.url}`);

    } catch (error) {
        console.error(`Monitoring failed for ${monitor.url}:`, error.message);
        
        // Save failed check to history
        await MonitorHistory.create({
            monitorId: monitor._id,
            status: 'down',
            responseTime: Date.now() - startTime,
            responseCode: null
        });

        await Monitor.findByIdAndUpdate(monitor._id, {
            status: 'down',
            lastChecked: new Date(),
            error: error.message
        });
    }
};

const startMonitoring = async () => {
    try {
        console.log('Starting monitoring service...');
        const monitors = await Monitor.find({});
        console.log(`Found ${monitors.length} monitors to track`);

        monitors.forEach(monitor => {
            // Set fixed 3-minute interval
            const interval = 3 * 60 * 1000; // 3 minutes in milliseconds
            setInterval(() => enhancedMonitoring(monitor), interval);
            // Run initial check
            enhancedMonitoring(monitor);
        });
    } catch (error) {
        console.error('Failed to start monitoring services:', error);
    }
    

};

module.exports = { startMonitoring }; 