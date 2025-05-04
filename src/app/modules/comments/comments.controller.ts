import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { CommentService } from "./comments.service";

const createComment = CatchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.commentAddIntoDb(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

export const commentController = {
  createComment,
};
