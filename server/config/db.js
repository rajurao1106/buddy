import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/taskmanager");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
