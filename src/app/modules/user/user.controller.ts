import { Request, Response } from "express";
import { UserService } from "./user.service";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";

const createAdmin = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserService.CreateAdminIntoDb(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserService.CreateUserIntoDb(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully!",
    data: result,
  });
});

const getAllUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserIntoDb();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All User successfully!",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createUser,
  getAllUser,
};
