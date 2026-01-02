import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/my-app");
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (error) => console.error(error));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
