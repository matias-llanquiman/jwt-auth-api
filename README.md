# JWT Authentication API

A project to learn **JSON Web Token (JWT)** authentication with login and registration.  
The project follows a **Three-layer app architecture** with the **Repository pattern**.

---

## 🚀 Technologies Used

- Node.js
- Express
- TypeScript
- PostgreSQL
- Docker
- JWT (Json Web Token)
- Zod (input data validation)
- Prettier (formatting)
- ESLint (quality code)
- Bcrypt (password encryption)

---

## 🎯 Objectives

- Understand how JSON Web Tokens work.
- Learn best practices for input data validation using **Zod**.
- Use **bcrypt** for password encryption.
- Practice **Docker** for containerization and deployment.
- Enforce code formatting with **ESLint** and **Prettier**.
- Improve project structure and scalability.

---

## 📦 Requirements

- Node.js >= 18
- PostgreSQL
- npm

---

## 🛠️ Setup & Run

1. **Clone the repository**

```sh
 git clone <repo-url>
 cd jwt-auth-api
```

2. **Install dependencies**

```sh
npm install
```

3. **Configure environment variables**

```sh
cp .env.example .env
```

Fill in the required values.

4. **Initialize the PostgreSQL Database**

```sql
CREATE DATABASE users

CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  password    TEXT NOT NULL,

);
```

5. **Run the development server**

```sh
npm run dev
```

6. **Access the API**

```sh
  http://localhost:4000/
```

## 📌 Endpoints

| Method | Endpoint         | Description  | Request Body Example                                                       |
| ------ | ---------------- | ------------ | -------------------------------------------------------------------------- |
| POST   | `/auth/register` | Registration | `json { "name": "Test", "email": "Test content", "password": "12345678" }` |
| POST   | `/auth/login`    | Login        | `json { "email": "Test content", "password": "12345678" }`                 |

## 📂 Project Structure

jwt-auth-api/
│── src/
│ ├── app.ts # Express app initialization
│ ├── server.ts # Entry point
│ │
│ ├── config/ # Configurations (DB, environment)
| | ├── general.config.ts
│ │ └── postgres.config.ts
│ │
│ ├── controllers/ # Handle requests & responses
│ │ └── auth.controller.ts
│ │
│ ├── routes/ # API routes
│ │ └── auth.routes.ts
│ │
│ ├── middlewares/ # Custom middlewares (validation, errors)
│ │ ├── error.middleware.ts
│ │ └── validation.middleware.ts
│ │
│ ├── repositories/ # Database queries
│ │ └── user.repository.ts
│ │
│ ├── services/ # Business logic
│ │ └── auth.service.ts
│ │
│ ├── schemas/ # Zod validation schemas
│ │ └── user.schema.ts
│ │
│ ├── types/ # TypeScript types
│ │ └── user.types.ts
│ │
│ └── utils/ # Utility functions (JWT helpers, encryption)
| ├── hash.util.ts  
│ └── jwt.ts
│
│── .env.example # Example environment variables
│── .prettierrc # formatting
│── eslint.config.json # quality code
│── package.json
│── tsconfig.json
│── Dockerfile # containerization
│── README.md
