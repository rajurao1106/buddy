import Task from "../models/schema.js";

// Controller to update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is sent in the request params
    const { title, description } = req.body; // Extract updated fields

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

