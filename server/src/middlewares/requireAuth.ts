import { verifyToken } from "@clerk/backend";
import { RequestHandler } from "express";

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    req.userId = payload.sub;

    next();
  } catch (error: unknown) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
