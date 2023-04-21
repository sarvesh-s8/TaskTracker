import nc from "next-connect";
import connectDB from "@/Connection/connectDB";
import onError from "../../../Middleware/error.middleware";
import { authMiddleware } from "@/Middleware/auth.middleware";
import { createTask, getAllTasks } from "@/Controllers/tasks.controller";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(getAllTasks).post(createTask);
export default handler;
