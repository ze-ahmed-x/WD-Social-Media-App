import express from "express";
import { varifyToken } from "../middleware/auth.js";
import {
    getFeedPosts,
    getUserPosts,
    likePosts
} from "../controllers/posts.js"

const router = express.Router();

// varify token first
router.use(varifyToken);

// Read
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

// Update
router.patch("/:id/like", likePosts);

export default router;
