import Task from "../models/schema.js";

// Controller to delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Assuming ID is sent in the request params

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};



