import { Request, Response } from "express";
import PostModel from "../models/postModel";

const createPost = async (req: Request, res: Response) => {
  const postBody = req.body;
  if (!postBody.title || !postBody.content || !postBody.sender) {
    return res
      .status(400)
      .send("Missing required fields - title, content, sender");
  }
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).send("Post ID is required");
  }
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostBySender = async (req: Request, res: Response) => {
  const postSender = req.params.sender;
  if (!postSender) {
    return res.status(400).send("Post sender is required");
  }
  try {
    const post = await PostModel.find({ sender: postSender });
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const postBody = req.body;
  if (!postId) {
    return res.status(400).send("Post ID is required");
  }
  if (!postBody.title || !postBody.content || !postBody.sender) {
    return res
      .status(400)
      .send("Missing required fields - title, content, sender");
  }
  try {
    const post = await PostModel.findByIdAndUpdate(postId, postBody, {
      new: true,
    });
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  getPostBySender,
  updatePost,
};
