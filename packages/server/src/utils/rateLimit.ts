import { MiddlewareFn } from "type-graphql";
import { redisClient } from "../redis";
import { NetworkingContext } from "../types/NetworkingContext";

export type RateLimitingFnType = (
  publicLimit?: number,
  limitForUser?: number,
  timeFrame?: number,
  errorMessage?: string
) => MiddlewareFn<NetworkingContext>;

const ONE_MIN = 60;

export const rateLimit: RateLimitingFnType = (
  publicLimit = 12,
  limitForUser = 12,
  timeFrame = ONE_MIN,
  errorMessage = "Rate limit reached."
) => async ({ info, context: { req } }, next) => {
  const auth = req.session && req.session.userId;
  const key = `rl:${info.fieldName}:${auth ? req.session.userId : req.ip}`;

  const newCount = await redisClient.incr(key);

  if (newCount > (auth ? limitForUser : publicLimit)) {
    throw new Error(errorMessage);
  }

  if (newCount === 1) {
    redisClient.expire(key, timeFrame);
  }

  return next();
};
