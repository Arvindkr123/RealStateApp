import { Router } from "express";
import { verifyToken } from "./../middleware/verifyToken.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getProfilePostsController,
} from "../controllers/users.controllers.js";

const router = Router();

router.route("/").get(getUsers);
router.route("/profilePosts").get(verifyToken, getProfilePostsController);
router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
