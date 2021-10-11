import { Response, Request } from "express";

export interface NetworkingContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
