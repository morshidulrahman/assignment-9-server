import express from "express";
import { commentController } from "./comments.controller";

const router = express.Router();

router.post("/", commentController.createComment);
router.delete("/:id", commentController.deleteComment);

export const CommentRouter = router;
