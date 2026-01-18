import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all todo routes
router.use(authMiddleware);

// Get all todos for logged-in user
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

// Create a new todo
router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const insertTodo = db.prepare(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
  );
  const result = insertTodo.run(req.userId, task);

  res.status(201).json({
    id: result.lastInsertRowid,
    task,
  });
});

// Update a todo
router.put("/:id", (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  const updateTodo = db.prepare(
    "UPDATE todos SET task = ? WHERE id = ? AND user_id = ?",
  );

  const result = updateTodo.run(task, id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json({ message: "Todo updated" });
});

// Delete a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const deleteTodo = db.prepare(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
  );

  const result = deleteTodo.run(id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json({ message: "Todo deleted" });
});

export default router;
