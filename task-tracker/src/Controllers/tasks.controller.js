import mongoose from "mongoose";
import TaskModel from "@/Models/tasks.Model";
import tryCatchMiddleware from "@/Middleware/tryCatch.middleware";
import ErrorHandler from "@/Server-Utils/ErrorHandler";

const getAllTasks = tryCatchMiddleware(async (req, res, next) => {
  let tasks = await TaskModel.find({ userId: req.userId });

  let sortBy = req.query.sortBy;
  if (sortBy) {
    let sortDate;
    if (sortBy === "asc") {
      sortDate = 1;
    } else if (sortBy === "desc") {
      sortDate = -1;
    }
    tasks = await TaskModel.find({ userId: req.userId }).sort({
      taskDueDate: sortDate,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Tasks Fetched",
    data: tasks,
  });
});

const createTask = tryCatchMiddleware(async (req, res, next) => {
  let task = {};
  const taskTitle = req.body.taskTitle;
  const taskProgress = req.body.taskProgress;
  const taskDueDate = req.body.taskDueDate;
  const taskDescription = req.body.taskDescription;
  const taskStartDate = new Date();
  const userId = req.userId;
  task = {
    taskTitle,
    taskProgress,
    taskDueDate,
    taskStartDate,
    taskDescription,
    userId,
  };
  let savedTask = await new TaskModel(task).save();
  return res.status(200).json({
    success: true,
    message: "Task Created",
    data: savedTask,
  });
});

const updateTask = tryCatchMiddleware(async (req, res, next) => {
  let updateTaskModel = {};
  let taskId = req.query.taskId;
  const taskTitle = req.body.taskTitle;
  const taskProgress = req.body.taskProgress;
  const taskDueDate = req.body.taskDueDate;
  const taskStartDate = req.body.taskStartDate;
  const taskDescription = req.body.taskDescription;
  let task = await TaskModel.findById(taskId);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }
  if (task.userId.toString() !== req.userId) {
    return next(new ErrorHandler("Unauthorized", 404));
  }
  updateTaskModel = {
    taskTitle,
    taskDueDate,
    taskProgress,
    taskStartDate,
    taskDescription,
  };
  task = await TaskModel.findByIdAndUpdate(taskId, updateTaskModel, {
    new: true,
    runValidators: true,
  });
  task = await TaskModel.find({ userId: req.userId });
  return res.status(201).json({
    success: true,
    message: "Task Edited Successfully",
    data: task,
  });
});

const deleteTask = tryCatchMiddleware(async (req, res, next) => {
  const taskId = req.query.taskId;
  const task = await TaskModel.findById(taskId);
  if (!task) {
    return next(new ErrorHandler("Task not available", 404));
  }
  if (task.userId.toString() !== req.userId) {
    return next(new ErrorHandler("Unauthorized", 404));
  }
  await TaskModel.findByIdAndDelete(taskId);
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

const searchTask = tryCatchMiddleware(async (req, res, next) => {
  const taskQuery = req.query.task;
  const tasks = await TaskModel.find({
    taskTitle: {
      $regex: taskQuery,
      $options: "i",
    },
    userId: req.userId,
  });

  return res.status(200).json({
    success: true,
    message: "Tasks Fetched",
    data: tasks,
  });
});

export { createTask, updateTask, getAllTasks, deleteTask, searchTask };
