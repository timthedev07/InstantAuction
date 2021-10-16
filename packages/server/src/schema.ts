import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolvers";
import { HelloResolver } from "./resolvers/Hello";
import { GetProfileResolver } from "./resolvers/users/GetProfile";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, HelloResolver, GetProfileResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
