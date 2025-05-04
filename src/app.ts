import express, { Request, Response } from "express";
import cors from "cors";

import globalErrorHandler from "./app/middlewares/globalErrorhandeler";
import httpStatus from "http-status";
import router from "./app/routers";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "PH Health Server is Running",
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});
export default app;
