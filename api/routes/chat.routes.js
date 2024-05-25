import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import {
  getChatsControllers,
  getSingleChatsControllers,
  addChatsControllers,
  readChatsControllers,
} from "../controllers/chats.controllers.js";

const router = Router();

router.get("/", verifyToken, getChatsControllers);
router.get("/:id", verifyToken, getSingleChatsControllers);
router.post("/", verifyToken, addChatsControllers);
router.put("/read/:id", verifyToken, readChatsControllers);

export default router;
