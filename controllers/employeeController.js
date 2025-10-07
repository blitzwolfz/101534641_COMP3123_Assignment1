const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select('-__v');
    
    const formattedEmployees = employees.map(emp => ({
      employee_id: emp._id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department
    }));

    res.status(200).json(formattedEmployees);

  } catch (error) {
    console.error('Get all employees error:', error);
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error fetching employees' 
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: false, 
        message: errors.array()[0].msg 
      });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ 
        status: false, 
        message: 'Employee with this email already exists' 
      });
    }

    const employee = new Employee({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department
    });

    await employee.save();

    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: employee._id
    });

  } catch (error) {
    console.error('Create employee error:', error);
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error creating employee' 
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid).select('-__v');

    if (!employee) {
      return res.status(404).json({ 
        status: false, 
        message: 'Employee not found' 
      });
    }

    const formattedEmployee = {
      employee_id: employee._id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      position: employee.position,
      salary: employee.salary,
      date_of_joining: employee.date_of_joining,
      department: employee.department
    };

    res.status(200).json(formattedEmployee);

  } catch (error) {
    console.error('Get employee by ID error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        status: false, 
        message: 'Invalid employee ID' 
      });
    }
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error fetching employee' 
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: false, 
        message: errors.array()[0].msg 
      });
    }

    const employee = await Employee.findById(req.params.eid);

    if (!employee) {
      return res.status(404).json({ 
        status: false, 
        message: 'Employee not found' 
      });
    }

    const allowedUpdates = ['first_name', 'last_name', 'email', 'position', 'salary', 'date_of_joining', 'department'];
    const updates = Object.keys(req.body);
    
    updates.forEach(update => {
      if (allowedUpdates.includes(update)) {
        employee[update] = req.body[update];
      }
    });

    await employee.save();

    res.status(200).json({
      message: 'Employee details updated successfully.'
    });

  } catch (error) {
    console.error('Update employee error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        status: false, 
        message: 'Invalid employee ID' 
      });
    }
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error updating employee' 
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { eid } = req.query;

    if (!eid) {
      return res.status(400).json({ 
        status: false, 
        message: 'Employee ID is required' 
      });
    }

    const employee = await Employee.findByIdAndDelete(eid);

    if (!employee) {
      return res.status(404).json({ 
        status: false, 
        message: 'Employee not found' 
      });
    }

    res.status(204).send();

  } catch (error) {
    console.error('Delete employee error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        status: false, 
        message: 'Invalid employee ID' 
      });
    }
    res.status(500).json({ 
      status: false, 
      message: error.message || 'Error deleting employee' 
    });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
