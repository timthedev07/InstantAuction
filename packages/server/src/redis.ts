import { createClient } from "redis";

const ON_DOCKER = process.env.ON_DOCKER === "true";

export const redisClient = createClient(
  ON_DOCKER
    ? {
        host: "host.docker.internal",
      }
    : process.env.NODE_ENV === "production"
    ? {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!),
        password: process.env.REDIS_PASSWORD!,
      }
    : undefined
);
