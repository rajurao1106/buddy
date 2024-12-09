const express = require('express');
const { allTasks } = require('../controller/allTasks');
const { deleteTask } = require('../controller/deleteTask');
const { newTask } = require('../controller/newTask');
const { updateTask } = require('../controller/updateTask');
const router = express.Router();

router.get('/alltasks', allTasks);
router.post('/newtask', newTask);
router.delete('/deletetask', deleteTask);
router.patch('/updatetask', updateTask);

module.exports = router;