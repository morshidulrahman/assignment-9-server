import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create or update a vote
const createOrUpdateVote = async (
  userId: string,
  postId: string,
  type: "UPVOTE" | "DOWNVOTE"
) => {
  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingVote) {
    if (existingVote.type === type) {
      await prisma.vote.delete({
        where: { id: existingVote.id },
      });
      return { message: "Vote removed UnVoted" };
    } else {
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type },
      });
      return { message: "Vote updated" };
    }
  } else {
    await prisma.vote.create({
      data: {
        userId,
        postId,
        type,
      },
    });
    return { message: "Vote created" };
  }
};

export const VoteService = {
  createOrUpdateVote,
};
