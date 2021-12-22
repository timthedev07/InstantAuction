import { createClient } from "redis";

export const redisClient = createClient(
  process.env.NODE_ENV === "production"
    ? {
        password: process.env.REDIS_PASSWORD!,
      }
    : undefined
);
