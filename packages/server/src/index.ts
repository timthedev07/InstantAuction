import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redisClient } from "./redis";
import { __prod__ } from "./constants/prod";
import { createSchema } from "./schema";
import { sessionCookieName } from "./constants/session";
import { graphqlUploadExpress } from "graphql-upload";
import { FRONTEND, PLAYGROUND, PORT, HOSTNAME } from "./constants/app";

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
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  const RedisStore = connectRedis(session);
  app.use(
    session({
      name: sessionCookieName,
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
      saveUninitialized: false,
    })
  );

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await createConnection();

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
