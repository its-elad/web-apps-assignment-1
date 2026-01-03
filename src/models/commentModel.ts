import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    message: { type: String, required: true },
    user: { type: String, required: true },
    postId: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const CommentModel = model("comment", commentSchema);

export default CommentModel;
