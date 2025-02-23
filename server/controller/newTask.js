import Task from "../models/schema.js";

// Controller to get all messages
export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).send("Task added successfully!");
  } catch (error) {
    res.status(400).send("Error adding task");
  }
  };
