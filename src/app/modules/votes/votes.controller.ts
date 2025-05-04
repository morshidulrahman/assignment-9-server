import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { VoteService } from "./votes.service";

const voteCreated = CatchAsync(async (req: Request, res: Response) => {
  const { userId, postId, type } = req.body;
  const result = await VoteService.createOrUpdateVote(userId, postId, type);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote Created successfully!",
    data: result,
  });
});

export const voteController = {
  voteCreated,
};
