const express = require('express');
const router = express.Router();

const {
    getMyTasks,
    updateTaskStatus,
    getTaskStats
} = require('../controllers/employeeController');

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.get('/tasks', auth, role('employee'), getMyTasks);
router.patch('/tasks/:id', auth, role('employee'), updateTaskStatus);
router.get('/stats', auth, role('employee'), getTaskStats)

module.exports = router;