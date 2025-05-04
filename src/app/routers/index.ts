import express from "express";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.router";
import { foodSpotRouter } from "../modules/foodspot/foodspot.router";
import { CategoryRouter } from "../modules/category/category.router";
import { voteRouter } from "../modules/votes/votes.router";
import { CommentRouter } from "../modules/comments/comments.router";
import { ratingRouter } from "../modules/rating/rating.router";

const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/food-spot",
    route: foodSpotRouter,
  },
  {
    path: "/food-category",
    route: CategoryRouter,
  },
  {
    path: "/vote",
    route: voteRouter,
  },
  {
    path: "/comment",
    route: CommentRouter,
  },
  {
    path: "/review",
    route: ratingRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
