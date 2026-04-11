import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors: RequestHandler = (
  req,
  res,
  next,
): void => {
  const existingValidationErrors = req.validationErrors || [];
  const errors = validationResult(req).array();

  const validationErrors = [
    ...existingValidationErrors,
    ...errors.map((er) => ({ path: er.msg, message: er.msg })),
  ];

  if (validationErrors.length > 0) {
    res.status(400).json({
      code: "validation_error",
      errors: validationErrors,
      message: "Validation Failed",
    });
    return;
  }
  next();
};
