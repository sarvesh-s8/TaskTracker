import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const taskSchema = new Schema({
  taskTitle: {
    type: String,
    required: [true, "Title is Required"],
    trim: true,
  },
  // taskMembers: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   },
  // ],
  taskProgress: {
    type: String,
    enum: ["inprogress", "completed", "delayed"],
    default: "inprogress",
  },
  taskDueDate: {
    type: Date,
    required: [true, "Date is required"],
  },
  taskStartDate: {
    type: Date,
    default: Date.now,
  },
  taskDescription: {
    type: String,
    required: [true, "Description cannot be empty"],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default TaskModel;
