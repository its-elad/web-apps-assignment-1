import { Request, Response } from "express";
import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";

const createComment = async (req: Request, res: Response) => {
  const commentData = req.body;

  if (!commentData.message || !commentData.user || !commentData.postId) {
    return res
      .status(400)
      .send("missing required fields (message, user, postId)");
  }

  try {
    const commentedPost = await PostModel.findById(commentData.postId);

    if (!commentedPost) {
      return res.status(404).send("post not found");
    }

    const newComment = await CommentModel.create(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating comment");
  }
};

const getComments = async (req: Request, res: Response) => {
  const postId = req.query.post;
  let queryFilter: Record<string, unknown> = {};

  try {
    if (postId) {
      const searchedPost = await PostModel.findById(postId);

      if (!searchedPost) {
        return res.status(404).send("post not found");
      } else {
        queryFilter = { postId };
      }
    }

    const comments = await CommentModel.find(queryFilter);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("error retrieving comments");
  }
};

const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const updatedData = req.body;

  if (!commentId) {
    return res.status(400).send("comment-id is required");
  }

  if (!updatedData.message || !updatedData.user || !updatedData.postId) {
    return res
      .status(400)
      .send("missing required fields (message, user, postId)");
  }

  try {
    const commentedPost = await PostModel.findById(updatedData.postId);

    if (!commentedPost) {
      return res.status(404).send("post not found");
    }

    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      updatedData,
      { new: true }
    );

    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).send("comment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error updating comment");
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  if (!commentId) {
    return res.status(400).send("comment-id is required");
  }

  try {
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    if (deletedComment) {
      res.status(200).json(deletedComment);
    } else {
      res.status(404).send("comment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error deleting comment");
  }
};

export default {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
