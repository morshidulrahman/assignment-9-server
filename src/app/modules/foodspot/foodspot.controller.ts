import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { foodSpotService } from "./foodspot.service";

const createFoodSpot = CatchAsync(async (req: Request, res: Response) => {
  const payload = {
    data: req.body,
    file: req.file,
  };

  const result = await foodSpotService.foodSpotAddIntoDb(payload);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FoodSpot Created successfully",
    data: result,
  });
});

const getAllFoodSpot = CatchAsync(async (req: Request, res: Response) => {
  const result = await foodSpotService.getAllFoodIntoDb();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "FoodSpot Fetched successfully",
    data: result,
  });
});

export const foodSpotController = {
  createFoodSpot,
  getAllFoodSpot,
};
