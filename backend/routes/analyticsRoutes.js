const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUptimeStats, getMonitorHistory } = require('../controllers/analyticsController');

router.use(protect);
router.get('/uptime', getUptimeStats);
router.get('/history/:id', getMonitorHistory);

module.exports = router; 