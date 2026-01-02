import { Request, Response } from "express";
import PostModel from "../models/postModel";

const createPost = async (req: Request, res: Response) => {
  const postBody = req.body;

  if (!postBody.title || !postBody.content || !postBody.sender) {
    return res
      .status(400)
      .send("missing required fields (title, content, sender)");
  }

  try {
    const post = await PostModel.create(postBody);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating post");
  }
};

const getPosts = async (req: Request, res: Response) => {
  const sender = req.query.sender;

  try {
    const posts = await PostModel.find(sender ? { sender } : {});
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("error retrieving posts");
  }
};

const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).send("post-id is required");
  }

  try {
    const post = await PostModel.findById(postId);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error retrieving posts");
  }
};

const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const postBody = req.body;

  if (!postId) {
    return res.status(400).send("post-id is required");
  }

  if (!postBody.title || !postBody.content || !postBody.sender) {
    return res
      .status(400)
      .send("missing required fields (title, content, sender)");
  }

  try {
    const post = await PostModel.findByIdAndUpdate(postId, postBody, {
      new: true,
    });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error updating post");
  }
};

export default {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};
