import { MiddlewareFn } from "type-graphql";
import { redisClient } from "../redis";
import { NetworkingContext } from "../types/NetworkingContext";

export type RateLimitingFnType = (
  limit?: number
) => MiddlewareFn<NetworkingContext>;

const FIVE_MIN = 60 * 5;

export const rateLimit: RateLimitingFnType = (limit = 50) => async (
  { info, context: { req } },
  next
) => {
  const key = `rl:${info.fieldName}:${req.ip}`;

  const newCount = await redisClient.incr(key);

  console.log({ newCount });

  if (newCount > limit) {
    console.log("LIMIT REACHED");
    throw new Error("Rate limit reached.");
  }

  if (newCount === 1) {
    redisClient.expire(key, FIVE_MIN);
  }

  return next();
};
