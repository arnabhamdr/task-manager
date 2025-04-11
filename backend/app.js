require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const pool = new Pool({
  user: "arnabhamdr",
  host: "localhost",
  database: "auth_task_app",
  password: "3029",
  port: 5432,
});

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword],
    );
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging.", error });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "token Required." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.userId = decoded.userId;
    next();
  });
};

app.get("/tasks", authenticate, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      req.userId,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Cannot get task getting task.", error });
  }
});

app.post("/tasks", authenticate, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [req.userId, title, description],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cannot add task adding task.", error });
  }
});

app.delete("/tasks/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.userId],
    );
    if (result.rows.length > 0) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Id not found.", error });
  }
});

app.listen(5000, () => {
  console.log("Server is running on localhost port 5000.");
});
