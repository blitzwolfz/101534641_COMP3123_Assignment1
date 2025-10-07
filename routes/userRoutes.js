const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../middleware/userValidation');

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
