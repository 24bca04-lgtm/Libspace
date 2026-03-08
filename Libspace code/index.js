import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected to mongoDB"))
  .catch(err => console.error("Database connection error:", err));

// Routes
app.use("/api/auth", userRouter);
app.use("/api/book", bookRouter);

app.get("/", (req, res) => {
  res.send("LibSpace API running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));