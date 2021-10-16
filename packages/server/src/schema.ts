import { buildSchema } from "type-graphql";
import { TmpResolvers } from "./resolvers/Tmp";
import { MeResolver } from "./resolvers/users/Me";
import { LogoutResolver } from "./resolvers/users/Logout";
import { OAuthResolver } from "./resolvers/users/OAuth";
import { DeleteAccountResolver } from "./resolvers/users/DeleteAccount";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      TmpResolvers,
      MeResolver,
      OAuthResolver,
      LogoutResolver,
      DeleteAccountResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
