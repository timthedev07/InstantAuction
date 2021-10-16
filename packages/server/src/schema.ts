import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/Hello";
import { GetProfileResolver } from "./resolvers/users/GetProfile";
import { LogoutResolver } from "./resolvers/users/Logout";
import { OAuthResolver } from "./resolvers/users/OAuth";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      GetProfileResolver,
      OAuthResolver,
      LogoutResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
