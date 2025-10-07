const { body } = require('express-validator');

const createEmployeeValidation = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required'),
  
  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('position')
    .trim()
    .notEmpty().withMessage('Position is required'),
  
  body('salary')
    .notEmpty().withMessage('Salary is required')
    .isNumeric().withMessage('Salary must be a number')
    .isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
  
  body('date_of_joining')
    .notEmpty().withMessage('Date of joining is required')
    .isISO8601().withMessage('Please provide a valid date in ISO format'),
  
  body('department')
    .trim()
    .notEmpty().withMessage('Department is required')
];

const updateEmployeeValidation = [
  body('first_name')
    .optional()
    .trim()
    .notEmpty().withMessage('First name cannot be empty'),
  
  body('last_name')
    .optional()
    .trim()
    .notEmpty().withMessage('Last name cannot be empty'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email'),
  
  body('position')
    .optional()
    .trim()
    .notEmpty().withMessage('Position cannot be empty'),
  
  body('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number')
    .isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
  
  body('date_of_joining')
    .optional()
    .isISO8601().withMessage('Please provide a valid date in ISO format'),
  
  body('department')
    .optional()
    .trim()
    .notEmpty().withMessage('Department cannot be empty')
];

module.exports = {
  createEmployeeValidation,
  updateEmployeeValidation
};
