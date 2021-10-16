import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { GetProfileResolver } from "./resolvers/users/GetProfile";
import { OAuthResolver } from "./resolvers/users/OAuth";

export const createSchema = () =>
  buildSchema({
    resolvers: [HelloResolver, GetProfileResolver, OAuthResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
