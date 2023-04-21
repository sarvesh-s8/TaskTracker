import nc from "next-connect";
import connectDB from "@/Connection/connectDB";
import { registerUser } from "@/Controllers/user.controller";
import onError from "../../../Middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.post(registerUser);
export default handler;
