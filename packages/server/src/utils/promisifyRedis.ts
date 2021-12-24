import { promisify } from "util";
import { redisClient } from "../redis";

export const promisifyRedis = (redisMethod: Function) => {
  return promisify(redisMethod).bind(redisClient);
};
