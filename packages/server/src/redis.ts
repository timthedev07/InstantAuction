import { createClient } from "redis";

export const redisClient = createClient(
  process.env.NODE_ENV === "production"
    ? Math.random() < 0.5
      ? {
          host: process.env.REDIS_HOST!,
          port: parseInt(process.env.REDIS_PORT!),
          password: process.env.REDIS_PASSWORD!
        }
      : {
          host: process.env.REDIS_HOST2!,
          port: parseInt(process.env.REDIS_PORT2!),
          password: process.env.REDIS_PASSWORD2!
        }
    : undefined
);
