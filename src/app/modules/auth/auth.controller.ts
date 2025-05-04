import { Request, Response } from "express";
import CatchAsync from "../../../shared/CatchAsync";
import SendResponse from "../../../shared/SendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const loginUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUserIntoDb(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: true,
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const reFreshTokenCreate = CatchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.reFreshTokenCreate(refreshToken);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generate successfully",
    data: result,
  });
});

const getAllUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getAuthAllUser();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Fetched successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  reFreshTokenCreate,
  getAllUser,
};
