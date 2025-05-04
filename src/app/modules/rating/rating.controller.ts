import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { ratingService } from "./rating.service";

const createRating = CatchAsync(async (req: Request, res: Response) => {
  const result = await ratingService.ratingAddIntoDb(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating add successfully",
    data: result,
  });
});

const getAllRating = CatchAsync(async (req: Request, res: Response) => {
  const result = await ratingService.getAllRatingIntoDb();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating Fetched successfully",
    data: result,
  });
});

const updateRating = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ratingService.updateRatingIntoDb(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating updated successfully",
    data: result,
  });
});

const deleteRating = CatchAsync(async (req: Request, res: Response) => {
  const result = await ratingService.ratingAddIntoDb(req.params.id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating deleted successfully",
    data: result,
  });
});

export const ratingController = {
  createRating,
  getAllRating,
  updateRating,
  deleteRating,
};
