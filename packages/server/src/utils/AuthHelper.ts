import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

const TOKEN_EXPIRATION_DURATION: string = "40min";
const COOKIE_EXPIRATION_DURATION: string = "10d";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: TOKEN_EXPIRATION_DURATION,
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: COOKIE_EXPIRATION_DURATION,
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jimrayd", token, { httpOnly: true });
};
