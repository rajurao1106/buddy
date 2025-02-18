import express from "express";
import { allTasks } from "../controller/allTasks.js";
import { deleteTask } from "../controller/deleteTask.js";
import { newTask } from "../controller/newTask.js";
import { updateTask } from "../controller/updateTask.js";
import { signinForm } from "../controller/signin.js";
import { signupForm } from "../controller/signup.js";

export const router = express.Router();

router.get("/alltasks", allTasks);
router.post("/newtask", newTask);
router.delete("/deletetask", deleteTask);
router.patch("/updatetask", updateTask);
router.post("/signin", signinForm);
router.post("/signup", signupForm);


