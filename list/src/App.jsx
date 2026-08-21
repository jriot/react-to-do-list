import { useState } from 'react';
import './App.css';

const INITIAL_TASKS = [
  { id: 1, text: 'Learn React', done: false },
  { id: 2, text: 'Build a to-do app', done: true },
];

let nextId = 3;

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (event) => {
    event.preventDefault();
    const text = draft.trim();

    if (!text) return;

    setTasks((prev) => [{ id: nextId++, text, done: false }, ...prev]);
    setDraft('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'completed') return task.done;
    return true;
  });

  const remainingCount = tasks.filter((task) => !task.done).length;

  return (
    <div className="app-shell">
      <div className="todo-card">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Today</p>
            <h1>To-Do List</h1>
          </div>
          <span className="badge">{remainingCount} left</span>
        </header>

        <form className="todo-form" onSubmit={addTask}>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          <button
            type="button"
            className={filter === 'all' ? 'filter active' : 'filter'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'active' ? 'filter active' : 'filter'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'filter active' : 'filter'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              <label className="task-main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button type="button" className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="todo-footer">
          <p>
            {tasks.length === 0
              ? 'No tasks yet.'
              : `${remainingCount} task${remainingCount === 1 ? '' : 's'} remaining`}
          </p>
          <button type="button" onClick={clearCompleted} disabled={tasks.every((task) => !task.done)}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
