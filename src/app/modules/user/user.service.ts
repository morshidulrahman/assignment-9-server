import { PrismaClient, UserRole, Prisma, UserStatus } from "@prisma/client";
import { Request } from "express";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const CreateAdminIntoDb = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    email: payload.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    status: UserStatus.PREMIUM,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

const CreateUserIntoDb = async (payload: any) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = {
    email: payload.email,
    password: hashedPassword,
    role: UserRole.USER,
  };

  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

const getAllUserIntoDb = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = {
  CreateAdminIntoDb,
  CreateUserIntoDb,
  getAllUserIntoDb,
};
