import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { MeResolver } from "./resolvers/users/Me";
import { LogoutResolver } from "./resolvers/users/Logout";
import { OAuthResolver } from "./resolvers/users/OAuth";

export const createSchema = () =>
  buildSchema({
    resolvers: [HelloResolver, MeResolver, OAuthResolver, LogoutResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
