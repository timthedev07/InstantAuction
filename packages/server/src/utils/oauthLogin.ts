import { User } from "../entity/User";
import { Response } from "express";
import { OAuthResponse } from "../resolvers/UserResolvers";

export const loginOAuth = (user: User, response: Response) => {
  // TODO: Implement login logic with session
  return {
    user,
  } as OAuthResponse;
};
