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
- **JWT-protected Employee routes** (All employee endpoints require authentication)
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
│   └── employeeRoutes.js    # Employee API routes (JWT protected)
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

### User Routes (Base: `/api/v1/user`) - Public

| Method | Endpoint | Description | Status Code | Auth Required |
|--------|----------|-------------|-------------|---------------|
| POST | `/signup` | Create a new user | 201 | No |
| POST | `/login` | User login | 200 | No |

### Employee Routes (Base: `/api/v1/emp`) - Protected 🔒

⚠️ **All employee routes require JWT authentication**

| Method | Endpoint | Description | Status Code | Auth Required |
|--------|----------|-------------|-------------|---------------|
| GET | `/employees` | Get all employees | 200 | Yes 🔒 |
| POST | `/employees` | Create a new employee | 201 | Yes 🔒 |
| GET | `/employees/:eid` | Get employee by ID | 200 | Yes 🔒 |
| PUT | `/employees/:eid` | Update employee by ID | 200 | Yes 🔒 |
| DELETE | `/employees?eid=xxx` | Delete employee by ID | 204 | Yes 🔒 |

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

### 3. Create Employee (JWT Required)
```http
POST /api/v1/emp/employees
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

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

### 4. Get All Employees (JWT Required)
```http
GET /api/v1/emp/employees
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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

### 5. Update Employee (JWT Required)
```http
PUT /api/v1/emp/employees/64c9e5a3d9f3c1a5c9b4e8a4
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

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

### 6. Delete Employee (JWT Required)
```http
DELETE /api/v1/emp/employees?eid=64c9e5a3d9f3c1a5c9b4e8a4
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (204)**: No content

## 🔐 JWT Authentication

### How it Works:

1. **Signup**: Create a user account
2. **Login**: Get a JWT token (valid for 24 hours)
3. **Use Token**: Include token in Authorization header for all employee endpoints

### Authorization Header Format:
```
Authorization: Bearer <your-jwt-token>
```

### Error Responses:

**No Token Provided (401)**:
```json
{
  "status": false,
  "message": "Access denied. No token provided."
}
```

**Invalid Token (401)**:
```json
{
  "status": false,
  "message": "Invalid token"
}
```

**Token Expired (401)**:
```json
{
  "status": false,
  "message": "Token expired"
}
```

## 🧪 Testing

### Postman Collection

Import the **101534641_COMP3123_Assignment1.postman_collection.json** file into Postman.

**What's included:**
- ✅ All 7 required API endpoints
- ✅ Automated tests for each endpoint
- ✅ JWT authentication with automatic token usage
- ✅ Status code validation
- ✅ Response structure validation
- ✅ Error handling tests
- ✅ Collection variables for dynamic testing
- ✅ Response time checks

**How to use:**
1. Import the collection into Postman
2. Ensure the API is running at `http://localhost:3000`
3. **Important**: Run requests in order:
   - First run "Signup" to create a user
   - Then run "Login" to get JWT token (auto-saved to collection variable)
   - All employee requests will automatically use the saved token
4. Or use the Collection Runner to run all tests in sequence

**Collection Variables:**
- `base_url`: http://localhost:3000
- `employee_id`: Auto-populated from Create Employee response
- `user_id`: Auto-populated from Signup response
- `jwt_token`: Auto-populated from Login response and auto-used in employee requests

**Test Execution Order:**
1. Health Check
2. User Signup (get user_id)
3. User Login (get jwt_token) **← Token saved automatically**
4. Create Employee (uses jwt_token) 🔒
5. Get All Employees (uses jwt_token) 🔒
6. Get Employee by ID (uses jwt_token) 🔒
7. Update Employee (uses jwt_token) 🔒
8. Delete Employee (uses jwt_token) 🔒

Each request includes automated tests that verify the correct status codes and response structure.

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
- **All employee endpoints require JWT authentication**
- JWT tokens expire after 24 hours
- Include JWT token in `Authorization: Bearer <token>` header for employee endpoints

## 📦 Submission Checklist

Before submitting, ensure you have:

✅ **GitHub Repository**: `101534641_COMP3123_Assignment1`
- All code committed with meaningful commit messages
- README.md with setup instructions

✅ **Project Files (ZIP)**:
- All source code
- Dockerfile and docker-compose.yml
- package.json
- README.md
- `.env` file (update JWT_SECRET for production)
- **NO node_modules folder**

✅ **Postman Collection**: 
- `101534641_COMP3123_Assignment1.postman_collection.json`
- Includes all 7 endpoints with automated tests
- JWT token automatically managed

✅ **Screenshots**:
- MongoDB database in Mongo Express showing collections
- All Postman requests with successful responses (200, 201, 204)
- JWT token being used in Authorization header
- Error cases (400, 401, 404) if requested

✅ **Sample Credentials**:
- Username: johndoe
- Email: johndoe@example.com  
- Password: password123

✅ **Notes/Comments**: Mention that JWT authentication is fully implemented

## 📄 License

This project is for educational purposes only.

## 👤 Author

Student Number: 101534641

## 📚 Assignment Requirements Met

- ✅ RESTful API with Node.js and Express
- ✅ MongoDB integration with proper schemas
- ✅ User signup and login functionality
- ✅ Password hashing with bcrypt
- ✅ Employee CRUD operations
- ✅ Input validation with express-validator
- ✅ Proper HTTP status codes
- ✅ **JWT authentication fully implemented (all employee routes protected)**
- ✅ Modular structure (routes/controllers/models/middleware)
- ✅ Docker and Docker Compose setup
- ✅ Mongo Express for database visualization
- ✅ Git version control ready
