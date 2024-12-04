const Settings = require('../models/Settings');

// Get user settings
exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ user: req.user._id });
        
        if (!settings) {
            settings = await Settings.create({
                user: req.user._id
            });
        }

        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update settings
exports.updateSettings = async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate(
            { user: req.user._id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 