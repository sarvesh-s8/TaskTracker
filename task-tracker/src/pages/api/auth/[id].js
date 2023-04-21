import nc from "next-connect";
import connectDB from "@/Connection/connectDB";
import { getUserInfo } from "@/Controllers/user.controller";
import onError from "../../../Middleware/error.middleware";
connectDB();
const handler = nc({ onError });
handler.get(getUserInfo);
export default handler;
