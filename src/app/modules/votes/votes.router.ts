import express from "express";
import { voteController } from "./votes.controller";

const router = express.Router();

router.post("/create-vote", voteController.voteCreated);

export const voteRouter = router;
