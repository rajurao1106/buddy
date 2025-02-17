import mongoose from "mongoose";

const newAuth = new mongoose.Schema({
    email: String,
    password: String
})

export default mongoose.model('authentications', newAuth)