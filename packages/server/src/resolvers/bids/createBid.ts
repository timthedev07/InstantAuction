import { Resolver, Mutation, UseMiddleware, Ctx, Int, Arg } from "type-graphql";
import {
  invalidItem,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { bidExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { Bid } from "../../entity/Bid";
import { Item } from "../../entity/Item";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

export const notYourOwnAuctionMessage = "You can't bid at your own auction.";
export const alreadyParticipating =
  "Item is already participating in an auction";
export const cannotRebid = "You cannot rebid.";

@Resolver()
export class CreateBidResolver {
  @Mutation(() => Bid)
  @UseMiddleware(isAuth)
  async createBid(
    @Arg("auctionId", () => Int) auctionId: number,
    @Arg("itemId", () => Int) itemId: number,
    @Ctx() { req }: NetworkingContext
  ) {
    const auction = await Auction.findOne(auctionId, {
      relations: ["seller", "bids", "bids.bidder"],
    });

    if (!auction) {
      throw new Error("Invalid auction");
    }

    const userId = req.session.userId;

    if (auction.seller.id === userId) {
      throw new Error(notYourOwnAuctionMessage);
    }

    const item = await Item.findOne(itemId, { relations: ["owner"] });

    if (!item) {
      throw new Error(invalidItem);
    }

    if (item.owner.id !== userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    if (item.participating) {
      throw new Error(alreadyParticipating);
    }

    if (auction.bids.find(val => val.bidder.id === item.owner.id)) {
      throw new Error(cannotRebid);
    }

    const { raw } = await Bid.insert({
      auction: auction,
      item,
      bidder: { id: userId },
    });
    (await Bid.findOne()).bidder;

    await Item.update(item.id, {
      participating: true,
    });

    return await Bid.findOne(raw[0].id, { relations: bidExposedRelations });
  }
}
