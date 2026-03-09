import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError('Error fetching tasks: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTask,
          priority: newPriority,
          completed: false
        })
      });

      if (!response.ok) throw new Error('Failed to create task');
      const data = await response.json();
      setTasks([...tasks, data.task]);
      setNewTask('');
      setNewPriority('medium');
    } catch (err) {
      setError('Error creating task: ' + err.message);
      console.error(err);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });

      if (!response.ok) throw new Error('Failed to update task');
      const data = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? data.task : t));
    } catch (err) {
      setError('Error updating task: ' + err.message);
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Error deleting task: ' + err.message);
      console.error(err);
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="add-btn">Add Task</button>
      </form>

      {loading && <div className="loading">Loading tasks...</div>}

      {!loading && tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Create one to get started!</p>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed)}
                  className="task-checkbox"
                />
                <div className="task-details">
                  <h3 className="task-title">{task.title}</h3>
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="task-stats">
        <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;
