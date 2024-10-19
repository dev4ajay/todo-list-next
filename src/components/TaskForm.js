"use client";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const TaskForm = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

  
    let validationErrors = {};
    if (!title) validationErrors.title = "Task title is required.";
    if (!description) validationErrors.description = "Description is required.";
    if (!priority) validationErrors.priority = "Priority selection is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {

      setErrors({});
      setLoading(true);

      
      setTimeout(() => {
        onSave({ title, description, priority, completed: false });
        setLoading(false); 
        // toast.success('Task added successfully!'); 

     
        setTitle('');
        setDescription('');
        setPriority('medium');
      }, 1000);
    }
  };

  return (
    <div>
   
      <ToastContainer   />
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task Title"
            className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Task Description"
            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`w-full p-2 border ${errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
        </div>

        <div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading} 
          >
            {loading ? 'Adding Task...' : 'Add Task'} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
