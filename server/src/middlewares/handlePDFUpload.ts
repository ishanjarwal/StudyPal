import { RequestHandler } from "express";
import multer from "multer";
import prisma from "../config/prisma";

const LOCATION = "./pdf-uploads";
const MAX_SIZE_LIMIT = 5; // IN MB
const FIELDNAME = "pdf";

const handlePDFUpload = (): RequestHandler => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, LOCATION);
    },
    filename: function (req, file, cb) {
      const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, prefix + file.originalname);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_SIZE_LIMIT * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        const message = "Only PDF files are supported";

        cb(new Error(message));
      }
    },
  }).single(FIELDNAME);

  return async (req, res, next) => {
    upload(req, res, async (err) => {
      try {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            req.validationErrors = [
              { path: FIELDNAME, message: `Upto ${MAX_SIZE_LIMIT}MB allowed` },
            ];
          } else {
            req.validationErrors = [{ path: FIELDNAME, message: err.message }];
          }
          return next();
        }

        if (err) {
          req.validationErrors = [{ path: FIELDNAME, message: err.message }];
          return next();
        }

        if (!req.file) {
          req.validationErrors = [
            { path: FIELDNAME, message: "File is required" },
          ];
          return next();
        }

        next();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", error });
      }
    });
  };
};

export default handlePDFUpload;
