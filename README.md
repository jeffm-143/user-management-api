# User Management API

## Project Overview
The **User Management API** is a RESTful API built with Node.js, Express, and TypeORM. It provides CRUD (Create, Read, Update, Delete) operations for managing users in a MySQL database. The API is designed to handle user data securely, including password hashing.

---

## Setup Instructions
``` bash
### 1. Clone the Repository
git clone https://github.com/your-username/user-management-api.git
cd user-management-api

### 2. Install Dependencies
npm install 
npm install express typeorm mysql2 bcrypt reflect-metadata
npm install --save-dev typescript ts-node nodemon @types/express @types/bcrypt
npm install mysql2
npx tsc --init

### 3. Configure the Database
Create a MySQL database named user_management (or any name of your choice).
Update the database credentials in src/config/data-source.ts:

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User"; 

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost", 
  port: 3306, 
  username: "root",
  password: "J22683320-m", 
  database: "user_management", 
  synchronize: true, 
  logging: true, 
  entities: [User], 
  migrations: [], 
  subscribers: [],
});

### 4. Start the Application
npm run dev
The server will start on http://localhost:3000.

### API Documentation
Base URL
http://localhost:3000/api

Endpoints
1. Create a User
URL: POST /users
Request Body:
{
  "name": "Jay",
  "email": "jay@gmail.com",
  "password": "jay123"
}
Response:
  {
    "id": 1,
    "name": "Jay",
    "email": "jay@gmail.com",
    "password": "$2b$10$SIvaTwmBpfPAHK8VvWTrBe9oJpEmg95oihzPPsRuck1mTFw0Iiz/q"
  }
  ########### Another
  Request Body:
{
  "name": "Jeff",
  "email": "jeff@gmail.com",
  "password": "jeff123"
}
Response:
  {
    "id": 2,
    "name": "Jeff",
    "email": "jeff@gmail.com",
    "password": "$2b$10$vNS7/Bc54VOrUinYvMYIVuIkBBM2HLJSZ68J8q2iadLOPSMYB1sP."
  }

2. Get All Users
URL: GET /users
Response:
[
  {
    "id": 1,
    "name": "Jay",
    "email": "jay@gmail.com",
    "password": "$2b$10$SIvaTwmBpfPAHK8VvWTrBe9oJpEmg95oihzPPsRuck1mTFw0Iiz/q"
  },
  {
    "id": 2,
    "name": "Jeff",
    "email": "jeff@gmail.com",
    "password": "$2b$10$vNS7/Bc54VOrUinYvMYIVuIkBBM2HLJSZ68J8q2iadLOPSMYB1sP."
  }
]

3. Get a User by ID
URL: GET /users/:id
Response:
{
  "id": 2,
  "name": "Jeff",
  "email": "jeff@gmail.com",
  "password": "$2b$10$vNS7/Bc54VOrUinYvMYIVuIkBBM2HLJSZ68J8q2iadLOPSMYB1sP."
}

4. Delete a User
URL: DELETE /users/:id
Response:
{
  "message": "User deleted successfully"
}