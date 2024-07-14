import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  likeUnlikePost,
  commentOnPost,
  getAllPost,
  getLikedPosts,
  getFollowingPost,
  getUserPost
} from "../controller/post.controller.js";
const router = express.Router();

router.get("/following", protectRoute, getFollowingPost);
router.get("/user/:username", protectRoute, getUserPost);
router.get("/all", protectRoute, getAllPost);
router.get("/likes/:id", protectRoute, getLikedPosts);

router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);

router.delete("/:id", protectRoute, deletePost);

export default router;
