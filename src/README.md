# 🛒 Product Management API System

A complete RESTful backend API built with Node.js and Express for managing Users, Products, and Categories with authentication, authorization, and file uploads.

---

## 🚀 Overview

This project is a full-featured backend system that allows frontend applications to interact with a structured API for managing:

- 👤 Users
- 📦 Products
- 🗂️ Categories

It follows clean architecture principles and simulates real-world backend systems used in production.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Token Authentication
- Protected Routes
- Role-Based Access Control (Admin / User)

---

### 📂 Category Management

- Create Category
- Get All Categories
- Get Single Category
- Update Category
- Delete Category

---

### 🛍️ Product Management

- Create Product
- Get All Products
- Get Single Product
- Update Product
- Delete Product

---

### 🖼️ File Upload

- Upload product images
- Store images locally
- Save image path in database
- Serve static files

---

### 🧠 Validation & Security

- Input validation (Joi / express-validator)
- Secure routes using middleware
- Environment variables protection

---

### ⚙️ Middleware

- Authentication middleware
- Role authorization middleware
- Request validation middleware
- Error handling middleware
- Logger (Morgan)

---

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (Authentication)**
- **Multer (File Upload)**
- **Joi / express-validator**
- **Morgan (Logging)**

---

## 📁 Project Structure

```

src/
│
├── config/           # Database configuration
├── controllers/      # Business logic
├── middleware/       # Auth, validation, error handling
├── models/           # Mongoose models
├── routes/           # API routes
├── validators/       # Input validation schemas
├── uploads/          # Uploaded images
│
├── App.js            # App setup
├── server.js         # Server entry point
│
.env
package.json

```

---

## 🔗 API Base URL

```

[http://localhost:5000](http://localhost:5000)

```

---

## 🔐 Authentication

### Register

```

POST /auth/register

```

### Login

```

POST /auth/login

```

### Response

```json
{
  "token": "JWT_TOKEN"
}
```

### Use Token

```
Authorization: Bearer <token>
```

---

## 👥 User Roles

| Role  | Permissions        |
| ----- | ------------------ |
| Admin | Full access (CRUD) |
| User  | Read-only          |

---

## 📂 Categories API

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | /categories     | Get all categories |
| GET    | /categories/:id | Get category by ID |
| POST   | /categories     | Create category    |
| PUT    | /categories/:id | Update category    |
| DELETE | /categories/:id | Delete category    |

---

## 🛍️ Products API

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /products     | Get all products  |
| GET    | /products/:id | Get product by ID |
| POST   | /products     | Create product    |
| PUT    | /products/:id | Update product    |
| DELETE | /products/:id | Delete product    |

---

### 📸 Upload Product Image

```
POST /products/:id/upload-image
```

---

## 🔄 Relationships

- One Category → Many Products
- One User → Many Products

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-management-api.git
```

### 2. Navigate to project

```bash
cd product-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 5. Run the server

```bash
npm run dev
```

---

## 🧪 API Testing

You can test the API using:

- Postman
- Thunder Client
- Swagger (if implemented)

---

## 🧱 Development Phases

### Phase 1 — Setup

- Initialize project
- Setup server
- Configure environment

### Phase 2 — REST API

- CRUD for Products & Categories

### Phase 3 — Database

- MongoDB integration
- Mongoose models

### Phase 4 — Auth

- JWT authentication
- Role-based access

### Phase 5 — Middleware

- Auth middleware
- Logger
- Validation

### Phase 6 — Uploads

- Image upload using Multer

### Phase 7 — Testing

- Postman collection

### Phase 8 — Error Handling

- Global error handler

### Phase 9 — Security

- Input validation
- Secure API

---

## 🛡️ Security Features

- JWT-based authentication
- Input validation
- Protected routes
- Role-based authorization

---

## 📦 Future Improvements

- Pagination
- Filtering & Search
- API Versioning (/api/v1)
- Rate Limiting
- Docker support
- Deployment (AWS / Vercel / DigitalOcean)

---

## 👨‍💻 Author

**Rabea Shaban**
Frontend Developer | React.js & Next.js

🌐 Portfolio: [https://rabea-shaban.com](https://rabea-shaban.com)
💼 LinkedIn: [https://www.linkedin.com/in/rabea-sh-elzayat](https://www.linkedin.com/in/rabea-sh-elzayat)
💻 GitHub: [https://github.com/rabea-shaban](https://github.com/rabea-shaban)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
