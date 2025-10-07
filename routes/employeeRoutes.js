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

router.get('/employees', getAllEmployees);
router.post('/employees', createEmployeeValidation, createEmployee);
router.get('/employees/:eid', getEmployeeById);
router.put('/employees/:eid', updateEmployeeValidation, updateEmployee);
router.delete('/employees', deleteEmployee);

module.exports = router;
