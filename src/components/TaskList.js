"use client";

import { useEffect, useState } from 'react';
import { FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import TaskForm from './TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task }]);
    Swal.fire('Add Task!', ' Add  Task Successfully.', 'success');
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    Swal.fire('Deleted!', 'Task has been deleted.', 'success');
  };

  // Toggle Task Completion
  const toggleComplete = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      Swal.fire('Error!', 'Task not found!', 'error');
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    if (task.completed) {
      Swal.fire('Info', 'Task marked as pending.', 'info');
    } else {
      Swal.fire('Success', 'Task marked as completed!', 'success');
    }
  };

  const sortTasks = () => {
    setTasks([...tasks].sort((a, b) => a.priority.localeCompare(b.priority)));
    Swal.fire('Sorted!', 'Tasks sorted by priority.', 'info');
  };

  // Clear All Tasks
  const clearTasks = () => {
    if (tasks.length === 0) {
      toast.error("No tasks to clear!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    localStorage.removeItem('tasks');
    setTasks([]);
    Swal.fire('Cleared!', 'All tasks have been cleared.', 'success');
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter((task) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      task.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Task Form */}
      <TaskForm onSave={addTask} />

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sort and Clear All Tasks Buttons */}
      <div className="flex justify-between mb-2">
        <button
          onClick={sortTasks}
          className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Sort by Priority
        </button>
        <button
          onClick={clearTasks}
          disabled={tasks.length === 0} // Disable button when no tasks
          className={`p-2 rounded-md shadow-md transition ${
            tasks.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Clear All Tasks
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 rounded-md shadow-md ${
                task.priority === 'high'
                  ? 'bg-red-100 border-l-4 border-red-500'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 border-l-4 border-yellow-500'
                  : 'bg-green-100 border-l-4 border-green-500'
              }`}
            >
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>

              {/* Task Actions */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`px-4 py-2 rounded-md shadow-md ${
                    task.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  } hover:bg-green-600 transition`}
                >
                  {task.completed ? <FaCheck /> : <FaUndo />}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">
            No tasks found matching your search.
          </li>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};




export default TaskList;
