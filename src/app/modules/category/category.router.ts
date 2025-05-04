import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

router.post("/", categoryController.crateCategory);
router.get("/", categoryController.getAllCategory);

export const CategoryRouter = router;
