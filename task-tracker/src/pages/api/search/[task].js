import nc from "next-connect";
import connectDB from "@/Connection/connectDB";
import onError from "../../../Middleware/error.middleware";
import { authMiddleware } from "@/Middleware/auth.middleware";
import { searchTask } from "@/Controllers/tasks.controller";
connectDB();
const handler = nc({ onError });
handler.use(authMiddleware).get(searchTask);
export default handler;
