import { createClient } from "redis";
import { __prod__ } from "./constants/prod";

const REDIS_URL = process.env.REDIS_URL;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (__prod__) {
  if (!REDIS_URL) {
    console.warn("Redis url not specified.");
  }
  if (!REDIS_PASSWORD) {
    console.warn("Redis password not specified.");
  }
}

export const redisClient = createClient(
  __prod__
    ? {
        url: REDIS_URL,
        password: REDIS_PASSWORD,
      }
    : undefined
);
