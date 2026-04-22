import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import uploadPdf from "./controllers/uploadPdf";
import {
  getChat,
  createMessage,
  getUserChats,
  deleteChat,
} from "./controllers/chat";
import handlePDFUpload from "./middlewares/handlePDFUpload";
import { handleValidationErrors } from "./middlewares/handleValidationErrors";
import { requireAuth } from "./middlewares/requireAuth";

// Config ENV
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Hardcoded as per user request to fetch from 8080

// Middlewares
app.use(express.json()); // to read the request body
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("StudyPal Express API");
});

// Chat Routes
app.get("/chats", requireAuth, getUserChats);
app.get("/chat/:id", getChat);
app.delete("/chat/:id", requireAuth, deleteChat);
app.post("/chat/:id/message", createMessage);

app.post(
  "/pdf-upload",
  requireAuth,
  handlePDFUpload(),
  handleValidationErrors,
  uploadPdf,
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
