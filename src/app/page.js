import TaskList from '../components/TaskList';

async function fetchTasks() {
  return [
    { id: 1, title: 'Task One', description: 'Description One', priority: 'high', completed: false },
    { id: 2, title: 'Task Two', description: 'Description Two', priority: 'medium', completed: false },
  ];
}

export default async function Home() {
  const initialTasks = await fetchTasks(); // Fetch tasks

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Task Manager</h1>
      <TaskList initialTasks={initialTasks} />
    </div>
  );
}
