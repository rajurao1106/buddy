import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2008/taskmanager/alltasks');
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Task List</h1>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <span className="text-sm text-gray-500">{task.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
