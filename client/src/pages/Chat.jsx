import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

// Connect to the socket server (replace with your server URL)
const socket = io("https://your-socket-server.com");

export default function Chat() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setData] = useState([]);
  const listRef = useRef(null);

  // Fetch existing tasks on mount
  useEffect(() => {
    axios
      .get("https://buddy-5ext.onrender.com/taskmanager/alltasks")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));

    // Listen for new tasks via socket
    socket.on("new_task", (task) => {
      // Update state directly when a new task is received
      setData((prevData) => [...prevData, task]);
    });

    return () => {
      socket.off("new_task"); // Clean up the listener on unmount
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert("Both fields are required!");
      return;
    }

    try {
      // Send a POST request to add a new task
      const response = await axios.post("https://buddy-5ext.onrender.com/taskmanager/newtask", {
        title: taskTitle,
        description: taskDescription,
      });

      // Emit the new task to the server (which will broadcast to other clients)
      socket.emit("new_task", response.data);

      // Clear the input fields
      setTaskTitle("");
      setTaskDescription("");

      // Scroll to the bottom to show the newly added task
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="w-full h-screen p-5 bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full h-full rounded-xl shadow-xl flex flex-col max-md:flex-row bg-white p-5 space-x-5">
        
        {/* Task Submission Form */}
        <div className="w-full max-w-md mx-auto p-5 rounded-xl bg-white shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter Task Title"
              type="text"
              className="w-full h-12 p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter Task Description"
              className="w-full h-40 p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white w-40 p-3 rounded-md text-xl font-semibold mt-5 hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task List Display */}
        <div className="w-full h-full overflow-y-auto p-2 bg-gray-100 rounded-xl" ref={listRef}>
          <ul>
            {data.map((item) => (
              <li key={item._id} className="p-4 border-b bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl mb-4 shadow-lg">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
