import express from "express";
import { commentController } from "./comments.controller";

const router = express.Router();

router.post("/", commentController.createComment);

export const CommentRouter = router;
