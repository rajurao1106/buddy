const mongoose = require('mongoose')

const newAuth = new mongoose.Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('authentications', newAuth)