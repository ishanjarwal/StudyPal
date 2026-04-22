import { RequestHandler } from "express";
import { pdfQueue } from "../config/queues";
import prisma from "../config/prisma";

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

    // create a new chat and return its id
    const newChat = await prisma.chat.create({
      data: {
        userId: req.userId as string,
        isReady: false,
        linkedFilename: req.file.filename,
        linkedFilePath: req.file.path,
        linkedFileSize: req.file.size,
        linkedFileOriginalName: req.file.originalname,
      },
    });

    return res.status(200).json({
      message: "File Uploaded and Queued for processing.",
      id: newChat.id,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default uploadPdf;
