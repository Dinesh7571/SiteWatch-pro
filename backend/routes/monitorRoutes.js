const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getMonitors,
    getMonitor,
    createMonitor,
    updateMonitor,
    deleteMonitor,
    getMonitorHistory
} = require('../controllers/monitorController');

router.use(protect);

router.route('/')
    .get(getMonitors)
    .post(createMonitor);

router.route('/:id')
    .get(getMonitor)
    .put(updateMonitor)
    .delete(deleteMonitor);

router.get('/:id/history', getMonitorHistory);

module.exports = router;
