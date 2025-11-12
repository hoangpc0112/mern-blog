import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  addCommentToPost,
  deletePost,
  getPostCount,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.post("/:id/comments", addCommentToPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/stats/count", getPostCount);

export default router;
