import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolvers";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { FRONTEND, PLAYGROUND } from "shared";
import session from "express-session";
import connectRedis from "connect-redis";
import { redisClient } from "./redis";
import { __prod__ } from "./constants/prod";

const PORT = parseInt(process.env.PORT || "4000");
const HOSTNAME = process.env.HOST || "0.0.0.0";

(async () => {
  // check for environment variables before anything
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret || sessionSecret.length < 1) {
    console.error("Session secret not specified");
    process.exit(1);
  }

  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND, PLAYGROUND],
    })
  );
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__, // cookie only works in https
        sameSite: "lax",
      },
      secret: sessionSecret,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });

  await createConnection();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
