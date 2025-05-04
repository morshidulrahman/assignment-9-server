import { Prisma, PrismaClient } from "@prisma/client";
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

const getAllFoodIntoDb = async (data: any) => {
  const {
    searchTerm,
    categoryName,
    priceMin,
    priceMax,
    categories,
    sortByPopularity,
  } = data;

  const where: any = {};

  // Search by title or category name
  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { category: { name: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }

  if (categoryName) {
    where.category = { name: { equals: categoryName, mode: "insensitive" } };
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    where.category = { name: { in: categories } };
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    where.priceRange = {};
    if (priceMin !== undefined) where.priceRange.gte = priceMin;
    if (priceMax !== undefined) where.priceRange.lte = priceMax;
  }

  const result = await prisma.foodPost.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      priceRange: true,
      votes: true,
      comments: { select: { content: true } },
      category: { select: { name: true } },
      ratings: { select: { value: true } },
    },
  });

  let postsWithVoteCounts = result.map((post) => {
    const upVotes = post.votes.filter((vote) => vote.type === "UPVOTE").length;
    const downVotes = post.votes.filter(
      (vote) => vote.type === "DOWNVOTE"
    ).length;
    return { ...post, upVotes, downVotes };
  });

  if (sortByPopularity) {
    postsWithVoteCounts = postsWithVoteCounts.sort(
      (a, b) => b.upVotes - a.upVotes
    );
  }

  return postsWithVoteCounts;
};

const foodSpotUpdate = async (id: string, payload: any) => {
  const isExists = await prisma.foodPost.findFirst({
    where: {
      id: id,
    },
  });
  if (!isExists) {
    throw new Error("Food not found");
  }

  const result = await prisma.foodPost.update({
    where: {
      id: id,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

export const foodSpotService = {
  foodSpotAddIntoDb,
  getAllFoodIntoDb,
  foodSpotUpdate,
};
