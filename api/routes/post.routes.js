import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  savePost,
} from "../controllers/post.controllers.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);
router.post("/save", verifyToken, savePost);

export default router;
