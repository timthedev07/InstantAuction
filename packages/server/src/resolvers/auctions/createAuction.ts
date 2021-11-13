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
    let seller;
    try {
      seller = await User.findOne(req.session.userId);
    } catch (err) {
      console.error(err);
      throw new Error(unauthorizedErrorMessage);
    }

    let item;
    try {
      item = await Item.findOne(itemId, { relations: ["owner"] });
    } catch (err) {
      throw new Error("Couldn't find item.");
    }

    console.log({ itemOwner: item.owner, seller });
    if (item.owner.id !== seller.id) {
      throw new Error(unauthorizedErrorMessage);
    }

    try {
      await Auction.insert({
        bids: [],
        description,
        title,
        status: "open",
        seller,
        item
      });
    } catch (err) {
      throw new Error("Failed to create item.");
    }
    return true;
  }
}
