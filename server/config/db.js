import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rajurao1107:raoraju1337@cluster0.zjucb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
