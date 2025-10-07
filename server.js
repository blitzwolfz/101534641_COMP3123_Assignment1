require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/emp', require('./routes/employeeRoutes'));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'COMP 3123 Assignment 1 API - Student #101534641',
    status: 'running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: false, 
    message: err.message || 'Internal Server Error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
