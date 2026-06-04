import { IUser } from "@/constants/UserTypes";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ user }, ACCESS_SECRET, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ user }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
