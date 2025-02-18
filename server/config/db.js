import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rajurao1107:raoraju1337@cluster0.zjucb.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);  // Exit the process if database connection fails
  }
};


