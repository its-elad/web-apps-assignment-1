import { InferSchemaType, Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const PostModel = model('post', postSchema);

export type Post = InferSchemaType<typeof postSchema>

export default PostModel;
