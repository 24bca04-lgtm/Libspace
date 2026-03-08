import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

export default connectionDB;