const Task = require('../models/Task');

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.user.id
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                msg: 'Task not found'
            })
        };
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({
                msg: 'Not your task'
            })
        }
        task.status = status;
        await task.save();
        res.json({
            msg: 'Task updated successfully',
            task
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

const getTaskStats = async (req, res) => {
    try {
        const tasks = await Task.find({
            assignedTo: req.user.id
        });
        const stats = {
            total: tasks.length,
            completed: tasks.filter(t => t.status === "completed").length,
            pending: tasks.filter(t => t.status === "pending").length,
            inProgress: tasks.filter(t => t.status === "in-progress").length,
        }
        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

module.exports = {
    getMyTasks,
    updateTaskStatus,
    getTaskStats
}