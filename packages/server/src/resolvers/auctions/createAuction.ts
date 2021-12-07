import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import {
  invalidItem,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { Item } from "../../entity/Item";
import { User } from "../../entity/User";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateAuctionResolver {
  @Mutation(() => Auction)
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
    const seller = await User.findOne(req.session.userId);
    if (!seller) {
      throw new Error(unauthorizedErrorMessage);
    }

    const item = await Item.findOne(itemId, { relations: ["owner"] });

    if (!item) {
      throw new Error(invalidItem);
    }

    if (item.owner.id !== seller.id) {
      throw new Error(unauthorizedErrorMessage);
    }

    let id: number;
    try {
      const { raw } = await Auction.insert({
        bids: [],
        description,
        title,
        seller,
        item,
      });
      id = raw[0].id;

      // mark the selected item as actioned off
      await Item.update(item.id, { participating: true });
    } catch (err) {
      throw new Error(
        "The selected item is already participating in another auction."
      );
    }

    return await Auction.findOne(id, { relations: auctionExposedRelations });
  }
}
