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

const commentDeleteIntoDb = async (id: string) => {
  const result = await prisma.comment.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CommentService = {
  commentAddIntoDb,
  commentDeleteIntoDb,
};
