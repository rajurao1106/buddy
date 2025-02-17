import Task from "../models/schema.js";

// Controller to get all tasks
export const allTasks = async (req, res) => {
  try {
    const data = await Task.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};
