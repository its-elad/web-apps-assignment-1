import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);

export default router;
