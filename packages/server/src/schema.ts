import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolvers";
import { HelloResolver } from "./resolvers/Hello";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, HelloResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
