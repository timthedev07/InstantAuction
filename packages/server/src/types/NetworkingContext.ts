import { Response, Request } from "express";

export interface NetworkingContext {
  req: Request;
  res: Response;
}

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}
