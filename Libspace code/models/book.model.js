// models/book.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String }, // optional
  user: { type: String }, // optional, you can make this a reference to User if needed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Book", bookSchema);