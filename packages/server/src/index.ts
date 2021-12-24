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
import { msRouter } from "./routes/microsoft";

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
        client: redisClient as any,
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
  app.use("/microsoft", msRouter);

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  // retry 5 times
  let retries = 5;
  while (retries > 0) {
    try {
      await createConnection();
      break;
    } catch (err) {
      console.error(err);
      retries--;
      console.log(`${retries} Retries left`);
      // wait 3 seconds before next try
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
