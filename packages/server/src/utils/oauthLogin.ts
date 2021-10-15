import { User } from "../entity/User";
import { Request, Response } from "express";
import { OAuthResponse } from "../resolvers/UserResolvers";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export const loginOAuth = (
  user: User,
  request: Request,
  response: Response
) => {
  // TODO: Implement login logic with session
  request.session.userId = user.id;

  response;

  return {
    user,
  } as OAuthResponse;
};
