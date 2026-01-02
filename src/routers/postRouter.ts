import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", postController.updatePost);

export default router;
