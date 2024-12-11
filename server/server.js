const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./config/db')
const taskmanager = require('./routes/routes')

app.use(cors())
app.use(express.json()); 

connectDB()

app.use('/taskmanager', taskmanager);

app.listen(3002, () => {
    console.log('Server is running on port 3002')
})