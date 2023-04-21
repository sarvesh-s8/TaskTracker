import UserModel from "@/Models/user.Model";
import ErrorHandler from "@/Server-Utils/ErrorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const {
  default: tryCatchMiddleware,
} = require("@/Middleware/tryCatch.middleware");

const getUserInfo = tryCatchMiddleware(async (req, res, next) => {
  const user = await UserModel.findById(req.query.id);
  if (!user) {
    return next(new ErrorHandler("User not available", 404));
  }
  return res.status(200).json({
    success: true,
    message: "User data fetched",
    data: user,
  });
});

const registerUser = tryCatchMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  let user = await UserModel.findOne({
    email: email.toLowerCase(),
  });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }
  user = new UserModel({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) {
        return next(new ErrorHandler("Registration Error", 404));
      }
      return res.status(200).json({
        success: true,
        message: "User registered",
        data: {
          token,
          user,
        },
      });
    }
  );
});

const loginUser = tryCatchMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All Fields are required", 400));
  }
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not available", 404));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new ErrorHandler("Invalid Credentials", 404));
  }
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return next(new ErrorHandler("Something Went Wrong", 400));
    }
    return res.status(200).json({
      success: true,
      message: "User Logged In",
      data: {
        token,
        user,
      },
    });
  });
});

export { registerUser, loginUser, getUserInfo };
