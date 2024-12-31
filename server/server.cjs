const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./config/db')
const taskmanager = require('./routes/routes');
const path = require('path');
const port = 3002

app.use(cors())
app.use(express.json()); 

connectDB()

app.use('/taskmanager', taskmanager);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})