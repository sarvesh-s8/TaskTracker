import tryCatchMiddleware from "./tryCatch.middleware";
import ErrorHandler from "@/Server-Utils/ErrorHandler";
import UserModel from "@/Models/user.Model";
const isAdminMiddleware = tryCatchMiddleware(async (req, res, next) => {
  let userId = req.userId;
  if (!userId) {
    return next(new ErrorHandler("Authorization Denied"));
  }
  let user = await UserModel.findById(req.userId);
  if (user.userType !== "admin") {
    return next("Authorization Denied");
  }
  next();
});

export { isAdminMiddleware };
