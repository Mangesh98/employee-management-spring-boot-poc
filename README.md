# 🏢 Employee Management System

A full-stack **Employee Management System** with **Spring Boot** backend and **React** frontend.  
This project demonstrates CRUD operations, authentication with Spring Security, and a modern glassmorphism UI.

---

## 🚀 Features

### Backend (Spring Boot)

- 🔐 JWT Authentication with Spring Security
- 👤 User management with role-based access (ADMIN/USER)
- 📋 Complete CRUD operations for employees
- 🗄️ PostgreSQL database integration
- 🔒 Secure endpoints with Spring Security
- 🌐 CORS configured for frontend integration

### Frontend (React + Vite)

- 🎨 Modern glassmorphism design with Tailwind CSS
- 🔐 Secure authentication flow
- 📊 Employee management dashboard with stats
- 🔍 Real-time search functionality
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🛡️ Protected routes with session management

---

## 📸 Screenshots

### Login Page

![Login Page](images/Login.png)

### Home Dashboard

![Home Dashboard](images/Home.png)

### Employee Details

![Employee Details](images/EmployeeDetails.png)

---



#### Test Users

Insert test users into your database:

```sql
-- Password: 'password' (BCrypt encoded)
INSERT INTO users (username, password, role, enabled)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', true);

INSERT INTO users (username, password, role, enabled)
VALUES ('user', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', true);
```

**Login Credentials:**
| Username | Password | Role |
|----------|----------|------|
| admin | password | ROLE_ADMIN |
| user | password | ROLE_USER |

### 3️⃣ Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Run the Frontend

```bash
npm run dev
```

> Frontend starts on [http://localhost:5173](http://localhost:5173)

---

## 📡 API Endpoints

### Authentication

| Method   | Endpoint  | Description | Access        |
| -------- | --------- | ----------- | ------------- |
| **POST** | `/login`  | User login  | Public        |
| **POST** | `/logout` | User logout | Authenticated |

### Employee Management

| Method     | Endpoint               | Description                   | Access        |
| ---------- | ---------------------- | ----------------------------- | ------------- |
| **POST**   | `/employees`           | Create a new employee         | Authenticated |
| **GET**    | `/employees`           | Retrieve all employees        | Authenticated |
| **GET**    | `/employees/{id}`      | Get employee by ID            | Authenticated |
| **PUT**    | `/employees/{id}`      | Update employee               | Authenticated |
| **DELETE** | `/employees/{id}`      | Delete employee               | Authenticated |
| **GET**    | `/employees/org/{org}` | Get employees by organization | Authenticated |

---

## 🧩 API Examples

### 1. Login

**POST** `/login`

```
Content-Type: application/x-www-form-urlencoded

username=admin&password=password
```

### 2. Create Employee

**POST** `/employees`

```json
{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "organization": "Tech Corp",
  "location": "Mumbai",
  "salary": 150000
}
```

### 3. Get All Employees

**GET** `/employees`

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@email.com",
    "organization": "Tech Corp",
    "location": "Mumbai",
    "salary": 150000
  }
]
```

### 4. Update Employee

**PUT** `/employees/1`

```json
{
  "name": "John Doe",
  "email": "john.updated@email.com",
  "organization": "Tech Corp",
  "location": "Pune",
  "salary": 175000
}
```

### 5. Delete Employee

**DELETE** `/employees/1`

---

## 🛠️ Tech Stack

### Backend

- **Framework:** Spring Boot 3.x
- **Security:** Spring Security with form-based authentication
- **Database:** PostgreSQL
- **ORM:** Spring Data JPA
- **Build Tool:** Maven

### Frontend

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API
- **State Management:** React Context API
- **Routing:** React Router DOM

---


## 👤 Author

**Mangesh Kokare**

- GitHub: [@Mangesh98](https://github.com/Mangesh98)
- Repository: [employee-management-spring-boot-poc](https://github.com/Mangesh98/employee-management-spring-boot-poc)

---

