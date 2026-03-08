import express from "express";
import bookController from "../controller/bookController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Add Book (POST)
router.post("/addbook", authMiddleware, bookController.addBook);

// Get all books (GET)
router.get("/getbooks", authMiddleware, bookController.getAllBooks);

// Get single book by ID (GET)
router.get("/:bookId", authMiddleware, bookController.getBookById);

// Update Book (PUT)
router.put("/updatebooks/:bookId", authMiddleware, bookController.updateBook);

// Delete Book (DELETE)
router.delete("/deletebooks/:bookId", authMiddleware, bookController.deleteBook);

export default router;