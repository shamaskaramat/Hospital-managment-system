// controllers/departmentController.js
import Department from '../models/department.model.js';

// Create a new department
export const createDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newDepartment = new Department({ name, description });
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single department by ID
export const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('doctors');
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a department by ID
export const updateDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a department by ID
export const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ message: 'Department not found' });
        res.status(200).send({ success: true, message: "Department Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
