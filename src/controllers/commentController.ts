import { Request, Response } from "express";
import CommentModel from "../models/commentModel";

const createComment = async (req: Request, res: Response) => {
  const commentData = req.body;

  if (!commentData.message || !commentData.user || !commentData.postId) {
    return res
      .status(400)
      .send("missing required fields (message, user, postId)");
  }

  try {
    const newComment = await CommentModel.create(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("error creating comment");
  }
};

const getComments = async (req: Request, res: Response) => {
  const postId = req.query.post;

  try {
    const comments = await CommentModel.find(postId ? { postId } : {});
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
