import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Name is Required"],
    trim: true,
  },
  email: {
    unique: true,
    required: [true, "Email is a required field"],
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  type: {
    type: String,
    select: false,
    default: "user",
    enum: ["user", "admin"],
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
