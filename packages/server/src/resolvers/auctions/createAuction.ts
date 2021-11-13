import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import { unauthorizedErrorMessage } from "../../constants/errorMessages";
import { Auction } from "../../entity/Auction";
import { Item } from "../../entity/Item";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateAuctionResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createAuction(
    @Arg("title")
    title: string,
    @Arg("description")
    description: string,
    @Arg("itemId", () => Int)
    itemId: number,
    @Ctx() { req }: NetworkingContext
  ) {
    try {
      const seller = await User.findOne(req.session.userId);
      const item = await Item.findOne(itemId, { relations: ["owner"] });

      if (item.owner !== seller) {
        throw new Error(unauthorizedErrorMessage);
      }

      await Auction.insert({
        bids: [],
        description,
        title,
        status: "open",
        seller,
        item
      });
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
}
