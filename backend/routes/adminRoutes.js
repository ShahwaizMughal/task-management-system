const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const {
    addEmployee,
    removeEmployee,
    getEmployees,
    assignTask,
    getAllTasks
} = require('../controllers/adminController');


router.post('/employee', auth, role('admin'), addEmployee);
router.delete('/employee/:id', auth, role('admin'), removeEmployee);
router.get('/employees', auth, role('admin'), getEmployees);

router.post("/task", auth, role('admin'), assignTask);
router.get('/tasks', auth, role('admin'), getAllTasks);

module.exports = router;