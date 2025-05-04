import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";

const crateCategory = CatchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.categoryIntoDb(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategory = CatchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategoryIntoDb();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category fetched successfully",
    data: result,
  });
});

export const categoryController = {
  crateCategory,
  getAllCategory,
};
