import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
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

      // Immediately update the state to include the new task
      setData((prevData) => [...prevData, response.data]);

      // Clear the input fields
      setTaskTitle("");
      setTaskDescription("");

      // Scroll to the bottom to show the newly added task
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 100);
      window.location.reload()
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="w-full h-screen p-5 bg-blue-500">
      <div className="w-full h-full rounded shadow-md flex max-md:flex-col-reverse bg-white">
        {/* Task Submission Form */}
        <div className="w-full h-full">
          <form onSubmit={handleSubmit} className="flex flex-col w-full items-center h-full">
            <div className="w-full p-10 max-md:p-5 flex flex-col gap-5">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter Task Title"
                type="text"
                className="w-full h-[60px] max-md:h-[50px] pl-5 border-gray-500 border-2 rounded-xl"
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter Task Description"
                className="w-full h-[250px] max-md:h-[70px] p-5 border-gray-500 border-2 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-[40%] p-2 rounded-md text-white font-semibold text-xl max-md:mb-5"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task List Display */}
        <div className="w-full h-full overflow-y-auto p-1" ref={listRef}>
          <ul>
            {data.map((item) => (
              <li key={item._id} className="p-2 border-b bg-blue-500 m-5 text-white rounded-xl rounded-es-sm">
                <h3 className="text-lg font-semibold pl-5">{item.title}</h3>
                <p className="pl-5">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
