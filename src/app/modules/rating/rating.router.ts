import express from "express";
import { ratingController } from "./rating.controller";

const router = express.Router();

router.post("/", ratingController.createRating);
router.get("/", ratingController.getAllRating);
router.put("/update/:id", ratingController.updateRating);
router.delete("/:id", ratingController.deleteRating);

export const ratingRouter = router;
