import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolvers";
export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
