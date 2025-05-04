import { Prisma, PrismaClient, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../config";

const prisma = new PrismaClient();

const loginUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(payload.password, userData.password);

  if (!match) {
    throw new Error("Password not matched");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  console.log(accessToken);

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const reFreshTokenCreate = async (token: string) => {
  let decodedData;

  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      process.env.REFRESH_KEY as string
    );
    console.log(decodedData);
  } catch (err) {
    throw new Error("Invalid token");
  }

  const prisma = new PrismaClient();

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.SECRET_KEY as string,
    process.env.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
  };
};

const getAuthAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const AuthService = {
  loginUserIntoDb,
  reFreshTokenCreate,
  getAuthAllUser,
};
