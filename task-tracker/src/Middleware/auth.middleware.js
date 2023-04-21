import tryCatchMiddleware from "./tryCatch.middleware";
import Jwt from "jsonwebtoken";
import ErrorHandler from "@/Server-Utils/ErrorHandler";
// import { headers } from "next/headers";
const authMiddleware = tryCatchMiddleware(async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return next(new ErrorHandler("Denied Authorization"));
  }
  const decode = Jwt.verify(token, process.env.JWT_SECRET);
  if (!decode.userId) {
    return next(new ErrorHandler("Authorization Denied"));
  }
  req.userId = decode.userId;
  next();
});

export { authMiddleware };
