import { RequestHandler } from "express";
import { pdfQueue } from "../config/queues";

const uploadPdf: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(401).json({ message: "No file was uploaded" });
    }

    pdfQueue.add(
      "pdf-ready",
      JSON.stringify({
        fileName: req.file.filename,
        source: req.file.destination,
        path: req.file.path,
      }),
    );

    // await prisma.uploads.create({
    //   data: {
    //     filename: req.file.filename,
    //     path: req.file.path,
    //     mimetype: req.file.mimetype,
    //     size: req.file.size,
    //     originalName: req.file.originalname,
    //   },
    // });

    // create a new chat and return its id

    return res.status(200).json({ message: "File Uploaded and Queued" });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default uploadPdf;
