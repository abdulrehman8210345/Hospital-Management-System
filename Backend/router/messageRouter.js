import  express  from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.post("/send",sendMessage);
router.get("/getallmessages",isAdminAuthorized,getAllMessages);

export default router;