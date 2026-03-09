import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: "*"
}))
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: 'Learn Express', priority: 'high', completed: false },
  { id: 2, title: 'Build a Task Manager', priority: 'high', completed: false },
  { id: 3, title: 'Learn React', priority: 'medium', completed: false }
];

let nextId = 4;

// Validation middleware
const validateTask = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  
  next();
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

// POST - Create a new task
app.post('/api/tasks', validateTask, (req, res) => {
  const { title, priority = 'medium', completed = false } = req.body;
  
  const newTask = {
    id: nextId++,
    title: title.trim(),
    priority,
    completed
  };
  
  tasks.push(newTask);
  res.status(201).json({ message: 'Task created successfully', task: newTask });
});

// GET single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

// PATCH - Update a task
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  // Validate title if being updated
  if (req.body.title !== undefined) {
    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.trim() === '') {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    task.title = req.body.title.trim();
  }
  
  // Update other fields
  if (req.body.priority !== undefined) {
    task.priority = req.body.priority;
  }
  
  if (req.body.completed !== undefined) {
    task.completed = Boolean(req.body.completed);
  }
  
  res.json({ message: 'Task updated successfully', task });
});

// DELETE - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
