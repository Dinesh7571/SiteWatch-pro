const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSettings, updateSettings } = require('../controllers/settingsController');

router.use(protect);
router.route('/')
    .get(getSettings)
    .put(updateSettings);

module.exports = router; 