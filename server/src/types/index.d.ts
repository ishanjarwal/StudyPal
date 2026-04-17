import "express";
import { CustomValidationErrorsArray } from "./types";

declare global {
  namespace Express {
    interface Request {
      validationErrors?: CustomValidationErrorsArray;
      userId?: string;
    }
  }
}
