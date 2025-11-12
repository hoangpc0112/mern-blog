import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  addCommentToPost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.post("/:id/comments", addCommentToPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
