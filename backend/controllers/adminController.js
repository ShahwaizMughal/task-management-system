const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');

const addEmployee = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                msg: "Employee alread exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = new User({
            name,
            email,
            password: hashedPassword,
            role: "employee"
        });
        await employee.save();
        res.status(201).json({
            msg: "Employeed Added Successfully",
            employee
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

const removeEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user || user.role !== "employee") {
            return res.status(404).json({
                msg: "Employee not found"
            })
        };
        await user.deleteOne();
        res.status(200).json({
            msg: "Employee removed succesfully"
        })

    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    };
};

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: "employee" }).select("-password");
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

const assignTask = async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    try {
        const employee = await User.findById(assignedTo);
        if (!employee || employee.role !== 'employee') {
            return res.status(404).json({
                msg: "Employee not found"
            })
        }
        const task = new Task({
            title,
            description,
            assignedTo,
            assignedBy: req.user.id,
            status
        })
        await task.save();
        res.status(201).json({
            msg: 'Task assigned successfully'
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email").populate("assignedBy", "name email");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
};

module.exports = {
    addEmployee,
    removeEmployee,
    getEmployees,
    assignTask,
    getAllTasks
};