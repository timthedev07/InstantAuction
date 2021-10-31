import { buildSchema } from "type-graphql";
import { TmpResolvers } from "./resolvers/Tmp";
import { MeResolver } from "./resolvers/users/Me";
import { LogoutResolver } from "./resolvers/users/Logout";
import { OAuthResolver } from "./resolvers/users/OAuth";
import { DeleteAccountResolver } from "./resolvers/users/DeleteAccount";
import { UpdateCredentialsResolver } from "./resolvers/users/UpdateCredentials";
import { CreateItemResolver } from "./resolvers/items/createItem";
import { GetUserItemsResolver } from "./resolvers/items/getUserItems";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      // user resolvers
      TmpResolvers,
      MeResolver,
      OAuthResolver,
      LogoutResolver,
      DeleteAccountResolver,
      UpdateCredentialsResolver,
      // item resolvers
      CreateItemResolver,
      GetUserItemsResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
