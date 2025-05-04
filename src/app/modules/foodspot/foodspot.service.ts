import { PrismaClient } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";

const prisma = new PrismaClient();

const foodSpotAddIntoDb = async (payload: any) => {
  const { data, file } = payload;
  let image = null;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    image = uploadToCloudinary?.secure_url;
  }

  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  if (data.postedById) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.postedById,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
  }

  const result = await prisma.foodPost.create({
    data: {
      ...data,
      ...(image && { image }),
    },
  });
  return result;
};

const getAllFoodIntoDb = async () => {
  const result = await prisma.foodPost.findMany({
    include: {
      votes: true,
    },
  });

  // Map through each post and count upvotes and downvotes
  const postsWithVoteCounts = result.map((post) => {
    const upvotes = post.votes.filter((vote) => vote.type === "UPVOTE").length;
    const downvotes = post.votes.filter(
      (vote) => vote.type === "DOWNVOTE"
    ).length;
    return {
      ...post,
      upvotes,
      downvotes,
    };
  });

  return postsWithVoteCounts;
};

const foodStatusUpdate = async (id: string, payload: any) => {
  const isExists = await prisma.foodPost.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExists) {
    throw new Error("Food not found");
  }
  const updateData = payload.status ? { status: payload.status } : {};

  const result = await prisma.foodPost.update({
    where: {
      id: id,
    },
    data: updateData,
  });

  return result;
};

export const foodSpotService = {
  foodSpotAddIntoDb,
  getAllFoodIntoDb,
  foodStatusUpdate,
};
