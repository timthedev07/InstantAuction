import { MiddlewareFn } from "type-graphql";
import { redisClient } from "../redis";
import { NetworkingContext } from "../types/NetworkingContext";
import { promisifyRedis } from "./promisifyRedis";

export type RateLimitingFnType = (
  publicLimit?: number,
  limitForUser?: number,
  options?: {
    timeFrame?: number;
    errorMessage?: string;
  }
) => MiddlewareFn<NetworkingContext>;

const ONE_MIN = 60;

/**
 * Rate limiting middleware for type-graphql.
 *
 * **Attention**: this middleware is expected to be used after the isAuth middleware
 *
 * @param publicLimit Rate limit for anonymous users
 * @param limitForUser Rate limit for authenticated users
 * @param timeFrame Limit duration
 * @param errorMessage Custom error message
 * @returns
 */
export const rateLimit: RateLimitingFnType = (
  publicLimit = 12,
  limitForUser = 12,
  { timeFrame = ONE_MIN, errorMessage = "Rate limit reached." } = {}
) => async ({ info, context: { req } }, next) => {
  const auth = req.session && req.session.userId;
  const key = `rl:${info.fieldName}:${auth ? req.session.userId : req.ip}`;

  const incr = promisifyRedis(redisClient.incr);

  const newCount = await incr(key);

  if (newCount > (auth ? limitForUser : publicLimit)) {
    throw new Error(errorMessage);
  }

  if (newCount === 1) {
    redisClient.expire(key, timeFrame);
  }

  return next();
};
