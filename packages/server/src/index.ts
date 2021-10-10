import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolvers";
import { buildSchema } from "type-graphql";
import { router as AuthRouter } from "./routes/AuthRoute";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { FRONTEND, PLAYGROUND } from "shared";

const PORT = parseInt(process.env.PORT || "4000");
const HOSTNAME = process.env.HOST || "0.0.0.0";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND, PLAYGROUND],
    })
  );
  app.use("/auth", AuthRouter);

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
