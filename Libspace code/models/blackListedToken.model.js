// models/blackListedToken.model.js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // auto-delete after 1 hour
});

export default mongoose.model("BlackList", blacklistSchema);