import { User } from "../entity/User";
import { Request, Response } from "express";
import { OAuthResponse } from "../resolvers/UserResolvers";

export const loginOAuth = (
  user: User,
  request: Request,
  response: Response
) => {
  // TODO: Implement login logic with session
  request.session.cookie;

  return {
    user,
  } as OAuthResponse;
};
