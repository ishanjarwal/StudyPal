import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import uploadPdf from "./controllers/uploadPdf";
import handlePDFUpload from "./middlewares/handlePDFUpload";
import { handleValidationErrors } from "./middlewares/handleValidationErrors";
import { requireAuth } from "./middlewares/requireAuth";

// Config ENV
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json()); // to read the request body
app.use(cors({ origin: ["http://localhost:3000"] }));

// Routes
app.get("/", (req, res) => {
  res.send("Simple Express server with TS");
});

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
