==============================
Task Manager with Auth Backend
==============================

A simple authentication and task management API using:
- Node.js
- Express.js
- PostgreSQL
- JWT for auth
- bcrypt for password hashing

Frontend can be built with React + MUI (e.g., using Vite).

------------------------------
📁 Project Structure
------------------------------
- index.js         => Main server file
- .env             => Environment variables
- users table      => Stores username, email, hashed password
- tasks table      => Stores task title, description, and user_id

------------------------------
🔧 Setup Instructions
------------------------------
1. Install dependencies(in Frontend folder):
   yarn install

2. run Frontend:
   yarn dev


2. Set up PostgreSQL:
   - Create a database: "auth_task_app"
   - Run the SQL setup script:

     //in bash:
     psql -U your_username -d auth_task_app

     //Then inside the psql prompt:
     \i /full/path/to/Task_Manager.sql

3. Start the server:
node app.js

4. Server will run on:
http://localhost:5000/
