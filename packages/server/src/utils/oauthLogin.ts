import { User } from "../entity/User";
import { Request } from "express";
import { OAuthResponse } from "../types/OAuthResponse";

export const loginOAuth = (user: User, request: Request) => {
  request.session.userId = user.id;

  return {
    user,
  } as OAuthResponse;
};
