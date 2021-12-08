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
import { FRONTEND, PLAYGROUND, PORT, HOSTNAME, BACKEND } from "./constants/app";
import passport from "passport";
import { Strategy } from "passport-twitter";
import { authRouter } from "./routes/auth";
import { User } from "./entity/User";
import { isTwitterId } from "./utils/formatTwitterId";
import { getTwitterUserEmail } from "./utils/twitterOAuth";

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
  app.use(authRouter);

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

  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${BACKEND}/auth/twitter/callback`,
      },
      async (token, tokenSecret, profile, cb) => {
        const { id: twitterId } = profile;
        twitterId;

        const email = await getTwitterUserEmail(token);

        console.log(email);

        return cb(null, null);

        // find a user with the same email
        let user = await User.findOne({
          where: {
            email,
          },
        });

        if (user) {
          if (isTwitterId(user.externalId) && user.provider === "Twitter") {
            // login this twitter user
          }
        }

        // if this twitter account is already linked with an account

        // is user does not exist
        if (user) {
          // create the user
          await User.insert({});
        }

        // await User.findOne({ twitterId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        [token, tokenSecret, profile, cb];
      }
    )
  );
  app.use(passport.initialize());

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`server up and running at http://${HOSTNAME}:${PORT}`);
  });
})();
