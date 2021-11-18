import { Resolver, Mutation, UseMiddleware, Ctx, Int, Arg } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { Bid } from "../../entity/Bid";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class CreateBidResolver {
  @Mutation(() => Bid)
  @UseMiddleware(isAuth)
  async createBid(
    @Arg("auctionId", () => Int) auctionId: number,
    @Arg("itemId", () => Int) itemId: number,
    @Ctx() { req }: NetworkingContext
  ) {
    const auction = await Auction.findOne(auctionId, { relations: ["seller"] });
    if (!auction) {
      throw new Error("Invalid auction");
    }

    const userId = req.session.userId;

    if (auction.seller.id === userId) {
      throw new Error("You can't bid at your own auction.");
    }

    const item = await Item.findOne(itemId);

    if (item.participating) {
      throw new Error("Item is already participating in an auction");
    }

    const { raw } = await Bid.insert({
      auction: auction,
      item,
      bidder: { id: userId }
    });

    await Item.update(item.id, {
      participating: true
    });

    return await Bid.findOne(raw[0].id);
  }
}
