import { buildSchema } from "type-graphql";
import { TmpResolvers } from "./resolvers/Tmp";
import { MeResolver } from "./resolvers/users/Me";
import { LogoutResolver } from "./resolvers/users/Logout";
import { OAuthResolver } from "./resolvers/users/OAuth";
import { DeleteAccountResolver } from "./resolvers/users/DeleteAccount";
import { UpdateCredentialsResolver } from "./resolvers/users/UpdateCredentials";
import { CreateItemResolver } from "./resolvers/items/createItem";
import { GetUserItemsResolver } from "./resolvers/items/getUserItems";
import { DeleteItemResolver } from "./resolvers/items/deleteItem";
import { ModifyItemResolver } from "./resolvers/items/modifyItem";
import { CreateAuctionResolver } from "./resolvers/auctions/createAuction";
import { AllAuctionsResolver } from "./resolvers/auctions/allAuctions";
import { DeleteAuctionResolver } from "./resolvers/auctions/deleteAuction";

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
      GetUserItemsResolver,
      DeleteItemResolver,
      ModifyItemResolver,

      // auction resolvers
      CreateAuctionResolver,
      AllAuctionsResolver,
      DeleteAuctionResolver
    ]
  });
