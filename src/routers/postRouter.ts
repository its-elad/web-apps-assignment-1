import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.get("/sender/:sender", postController.getPostBySender);

export default router;
