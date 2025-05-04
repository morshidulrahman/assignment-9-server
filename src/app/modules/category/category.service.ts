import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryIntoDb = async (payload: any) => {
  const result = await prisma.category.create({
    data: {
      ...payload,
    },
  });
  return result;
};

const getAllCategoryIntoDb = async () => {
  const result = await prisma.category.findMany();
  return result;
};

export const CategoryService = {
  categoryIntoDb,
  getAllCategoryIntoDb,
};
