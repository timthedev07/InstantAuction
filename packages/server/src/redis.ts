import Redis from "ioredis";

export const redisClient = new Redis(
  process.env.NODE_ENV === "production"
    ? {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
        password: process.env.REDIS_PASSWORD!,
      } // in production, use the given configuration to connect to a redis lab database
    : undefined
);
