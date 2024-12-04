const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendDowntimeNotification = async (monitor, emails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emails.join(', '),
            subject: `🔴 Downtime Alert: ${monitor.name}`,
            html: `
                <h2>Monitor Status Alert</h2>
                <p>Your monitored service is currently down:</p>
                <ul>
                    <li><strong>Monitor Name:</strong> ${monitor.name}</li>
                    <li><strong>URL:</strong> ${monitor.url}</li>
                    <li><strong>Status:</strong> Down</li>
                    <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
                </ul>
                <p>We'll notify you when the service is back up.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Downtime notification sent to ${emails.join(', ')}`);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

const sendUptimeNotification = async (monitor, emails) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emails.join(', '),
            subject: `✅ Service Restored: ${monitor.name}`,
            html: `
                <h2>Monitor Status Update</h2>
                <p>Your monitored service is back online:</p>
                <ul>
                    <li><strong>Monitor Name:</strong> ${monitor.name}</li>
                    <li><strong>URL:</strong> ${monitor.url}</li>
                    <li><strong>Status:</strong> Up</li>
                    <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
                </ul>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Uptime notification sent to ${emails.join(', ')}`);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = {
    sendDowntimeNotification,
    sendUptimeNotification
}; 