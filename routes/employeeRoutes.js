const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { 
  createEmployeeValidation, 
  updateEmployeeValidation 
} = require('../middleware/employeeValidation');
const verifyToken = require('../middleware/auth');

// All employee routes are now protected with JWT authentication
router.get('/employees', verifyToken, getAllEmployees);
router.post('/employees', verifyToken, createEmployeeValidation, createEmployee);
router.get('/employees/:eid', verifyToken, getEmployeeById);
router.put('/employees/:eid', verifyToken, updateEmployeeValidation, updateEmployee);
router.delete('/employees', verifyToken, deleteEmployee);

module.exports = router;
