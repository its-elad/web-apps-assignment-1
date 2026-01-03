import express from "express";
import mongoose from "mongoose";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";
import { env } from "./types/env.type";

const app = express();
app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

mongoose.connect(env.MONGO_URI);
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (error) => console.error(error));

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
