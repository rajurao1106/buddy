import Task from "../models/schema.js";

// Controller to get all tasks
export const allTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
