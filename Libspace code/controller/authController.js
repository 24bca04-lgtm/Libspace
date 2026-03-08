import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlackList from "../models/blackListedToken.model.js";

const authController = {

  // REGISTER
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All details are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Account already exists" });
      }

      // Ensure password is a string and hash it
      const hashedPassword = await bcrypt.hash(password.toString(), 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "Account doesn't exist" });

      // Ensure both are strings before comparing
      const match = await bcrypt.compare(password.toString(), user.password.toString());
      if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: "JWT secret not configured" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user
      });

    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // LOGOUT
  logoutUser: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(400).json({ success: false, message: "Token required" });

      const exists = await BlackList.findOne({ token });
      if (exists) return res.status(401).json({ success: false, message: "Already logged out" });

      const blackListed = new BlackList({ token });
      await blackListed.save();

      return res.status(200).json({ success: true, message: "Logged out successfully" });

    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      await User.findByIdAndDelete(userId);
      return res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};

export default authController;