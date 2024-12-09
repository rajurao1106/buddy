import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setData] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the list whenever data changes
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]); // Dependency on data to trigger on data change


  // Function to fetch tasks
  const fetchTasks = () => {
    axios
      .get("http://192.168.29.118:3000/taskmanager/alltasks") // Change to your backend IP
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTasks();

    // Load taskTitle from localStorage if available
    const savedTaskTitle = localStorage.getItem("taskTitle");
    if (savedTaskTitle) {
      setTaskTitle(savedTaskTitle);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      await axios.post("http://192.168.29.118:3000/taskmanager/newtask", task); // Change to your backend IP
      setTaskDescription("");
      localStorage.removeItem("taskTitle"); // Optionally remove title from localStorage

      // Reload tasks after adding a new one
      fetchTasks();
    } catch (error) {
      console.error("There was an error adding the task!", error);
    }
  };

  const handleTaskTitleChange = (e) => {
    const newTaskTitle = e.target.value;
    setTaskTitle(newTaskTitle);
    localStorage.setItem("taskTitle", newTaskTitle); // Save taskTitle to localStorage
  };

  return (
    <div className="w-full h-screen p-5 bg-blue-500">
      <div className="w-full h-[100%] rounded shadow-md flex max-md:flex-col-reverse bg-white">
        <div className="w-full h-[100%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center h-[100%]"
          >
            <div className="w-full p-10 max-md:p-5 flex flex-col gap-5">
              <input
                value={taskTitle}
                onChange={handleTaskTitleChange} // Use handleTaskTitleChange to update state and localStorage
                placeholder="Enter Your Name"
                type="text"
                className="w-full h-[60px] max-md:h-[50px] pl-5 border-gray-500 border-2 rounded-xl"
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter Your Message"
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
        <div className="w-full h-[100%] overflow-y-auto py-5" ref={listRef}>
          <ul>
            {data.map((item) => (
              <li key={item._id} className="p-2 border-b">
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
