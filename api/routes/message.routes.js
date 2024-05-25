import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { addMessagesControllers } from "../controllers/messages.controllers.js";

const router = Router();

router.post("/:chatId", verifyToken, addMessagesControllers);

export default router;
