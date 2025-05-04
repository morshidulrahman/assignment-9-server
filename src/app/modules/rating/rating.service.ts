import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ratingAddIntoDb = async (payload: any) => {
  const result = await prisma.rating.create({
    data: payload,
  });
  return result;
};

const getAllRatingIntoDb = async () => {
  const result = await prisma.rating.findMany({});
  return result;
};

const updateRatingIntoDb = async (id: string, payload: any) => {
  const result = await prisma.rating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteRatingIntoDb = async (id: string) => {
  const result = await prisma.rating.delete({
    where: {
      id,
    },
  });
  return result;
};
export const ratingService = {
  ratingAddIntoDb,
  getAllRatingIntoDb,
  updateRatingIntoDb,
  deleteRatingIntoDb,
};
