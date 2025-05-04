import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { FoodPostCreateSchema } from "../../schema";
import { foodSpotController } from "./foodspot.controller";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = FoodPostCreateSchema.parse(JSON.parse(req.body.data));
    return foodSpotController.createFoodSpot(req, res, next);
  }
);

router.get("/", foodSpotController.getAllFoodSpot);
router.get("/update/:id", foodSpotController.foodSpotUpdate);

export const foodSpotRouter = router;
