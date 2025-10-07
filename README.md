# 101534641_COMP3123_Assignment1

A RESTful API built with Node.js, Express, and MongoDB for user and employee management.

## 👤 Student Information

- **Student Number**: 101534641
- **Course**: COMP 3123
- **Assignment**: Assignment 1 (Backend, 10%)
- **Database**: MongoDB (Database name: `comp3123_assigment1`)

## 🚀 Features

- User signup and login with JWT authentication
- Password hashing with bcrypt
- Employee CRUD operations
- Input validation using express-validator
- Proper HTTP status codes
- MongoDB with Docker support
- Mongo Express for database visualization

## 📁 Project Structure

```
.
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── userController.js    # User signup & login logic
│   └── employeeController.js # Employee CRUD logic
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── userValidation.js    # User input validation
│   └── employeeValidation.js # Employee input validation
├── models/
│   ├── User.js              # User schema
│   └── Employee.js          # Employee schema
├── routes/
│   ├── userRoutes.js        # User API routes
│   └── employeeRoutes.js    # Employee API routes
├── .env                     # Environment variables
├── .gitignore              
├── docker-compose.yml       # Docker services configuration
├── Dockerfile               # Node.js app container
├── package.json
├── server.js                # Main application entry point
└── README.md
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **Docker** - Containerization
- **Mongo Express** - Database GUI

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Option 1: Run with Docker (Recommended)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 101534641_COMP3123_Assignment1
```

2. Start all services with Docker Compose:
```bash
docker-compose up -d
```

This will start:
- MongoDB on port `27017`
- Mongo Express on port `8081`
- Node.js API on port `3000`

3. Access the application:
- API: http://localhost:3000
- Mongo Express: http://localhost:8081

### Option 2: Run Locally (Without Docker)

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/comp3123_assigment1
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. Make sure MongoDB is running locally on port 27017

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 🔗 API Endpoints

### User Routes (Base: `/api/v1/user`)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| POST | `/signup` | Create a new user | 201 |
| POST | `/login` | User login | 200 |

### Employee Routes (Base: `/api/v1/emp`)

| Method | Endpoint | Description | Status Code |
|--------|----------|-------------|-------------|
| GET | `/employees` | Get all employees | 200 |
| POST | `/employees` | Create a new employee | 201 |
| GET | `/employees/:eid` | Get employee by ID | 200 |
| PUT | `/employees/:eid` | Update employee by ID | 200 |
| DELETE | `/employees?eid=xxx` | Delete employee by ID | 204 |

## 📝 Sample API Requests

### 1. User Signup
```http
POST /api/v1/user/signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response (201)**:
```json
{
  "message": "User created successfully.",
  "user_id": "64c9e5a3d9f3c1a5c9b4e8a1"
}
```

### 2. User Login
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "message": "Login successful.",
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Create Employee
```http
POST /api/v1/emp/employees
Content-Type: application/json

{
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
```

**Response (201)**:
```json
{
  "message": "Employee created successfully.",
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4"
}
```

### 4. Get All Employees
```http
GET /api/v1/emp/employees
```

**Response (200)**:
```json
[
  {
    "employee_id": "64c9e5a3d9f3c1a5c9b4e8a2",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "position": "Software Engineer",
    "salary": 90000,
    "date_of_joining": "2023-08-01T00:00:00.000Z",
    "department": "Engineering"
  }
]
```

### 5. Update Employee
```http
PUT /api/v1/emp/employees/64c9e5a3d9f3c1a5c9b4e8a4
Content-Type: application/json

{
  "position": "Senior Designer",
  "salary": 95000
}
```

**Response (200)**:
```json
{
  "message": "Employee details updated successfully."
}
```

### 6. Delete Employee
```http
DELETE /api/v1/emp/employees?eid=64c9e5a3d9f3c1a5c9b4e8a4
```

**Response (204)**: No content

## 🔐 JWT Authentication (Optional)

To protect employee routes with JWT authentication:

1. Uncomment the import line in `routes/employeeRoutes.js`:
```javascript
const verifyToken = require('../middleware/auth');
```

2. Add `verifyToken` middleware to routes you want to protect:
```javascript
router.get('/employees', verifyToken, getAllEmployees);
```

3. Include the JWT token in requests:
```http
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing

1. Import the Postman collection (101534641_COMP3123_Assignment1.postman_collection.json)
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint and verify the responses match the expected status codes

## 🐳 Docker Commands

Start all services:
```bash
docker-compose up -d
```

Stop all services:
```bash
docker-compose down
```

View logs:
```bash
docker-compose logs -f
```

Rebuild containers:
```bash
docker-compose up -d --build
```

Remove all containers and volumes:
```bash
docker-compose down -v
```

## 🗄️ Database Access

Access Mongo Express at http://localhost:8081 to view and manage your MongoDB data visually.

## 📸 Sample Credentials for Testing

**User Login**:
- Email: `johndoe@example.com`
- Password: `password123`

(Create users via the signup endpoint)

## ⚠️ Important Notes

- The database name must be exactly: `comp3123_assigment1`
- All passwords are hashed using bcrypt before storage
- Login accepts either `username` OR `email` with password
- All requests and responses are in JSON format
- Proper HTTP status codes are returned for all endpoints

## 📄 License

This project is for educational purposes only.

## 👤 Author

Student Number: 101534641
