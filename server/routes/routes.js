const express = require('express');
const { allTasks } = require('../controller/allTasks');
const { deleteTask } = require('../controller/deleteTask');
const { newTask } = require('../controller/newTask');
const { updateTask } = require('../controller/updateTask');
const { signinForm } = require('../controller/signin');
const { signupForm } = require('../controller/signup');
const router = express.Router();

router.get('/alltasks', allTasks);
router.post('/newtask', newTask);
router.delete('/deletetask', deleteTask);
router.patch('/updatetask', updateTask);
router.post('/signin', signinForm);
router.post('/signup', signupForm);

module.exports = router;