import { NextFunction, Request, Response } from "express";
import { ZodIssue, ZodSchema } from "zod";
import httpStatus from "http-status";
import CatchAsync from "../shared/CatchAsync";
import SendResponse from "../shared/SendResponse";

export const formatZodErrors = (errors: ZodIssue[]) => {
  return errors.map((err: ZodIssue) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });
};

const validateZodSchema = (schema: ZodSchema) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = schema.safeParse(req.body);

    if (!success || error) {
      SendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Validation error",
        data: {
          errors: error ? formatZodErrors(error.errors) : [],
        },
      });
      return;
    }
    res.locals.body = data;
    next();
  });
};

export default validateZodSchema;
