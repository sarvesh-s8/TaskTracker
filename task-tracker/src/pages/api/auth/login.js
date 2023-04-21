import nc from "next-connect";
import connectDB from "@/Connection/connectDB";
import { loginUser } from "@/Controllers/user.controller";
import onError from "../../../Middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.post(loginUser);
export default handler;
