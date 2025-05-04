import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const commentAddIntoDb = async (payload: any) => {
  const result = await prisma.comment.create({
    data: {
      ...payload,
    },
  });
  return result;
};

export const CommentService = {
  commentAddIntoDb,
};
