import { v4 } from "uuid";
import { FRONTEND } from "../constants/global";
import { prefixMap } from "../constants/email";
import { redisClient } from "../redis";

export const createActionUrl = async (userId: number, action: string) => {
  const token = v4();

  const prefixedToken = (prefixMap[action] || "dG9rZW4=:") + token;

  redisClient.set(prefixedToken, `${userId}`, "ex", 60 * 60 * 8); // expires in 8 hours
  return `${FRONTEND}/auth/${action}/${prefixedToken}`;
};
