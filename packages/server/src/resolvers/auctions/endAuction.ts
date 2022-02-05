import { Resolver, Mutation, UseMiddleware, Ctx, Arg, Int } from "type-graphql";
import {
  invalidAuction,
  invalidWinningBidId,
  unauthorizedErrorMessage,
} from "../../constants/errorMessages";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { Bid } from "../../entity/Bid";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";

@Resolver()
export class EndAuctionResolver {
  @Mutation(() => Auction)
  @UseMiddleware(isAuth)
  async endAuction(
    @Arg("auctionId", () => String) auctionId: string,
    @Arg("winningBidId", () => Int) winningBidId: number,
    @Ctx() { req }: NetworkingContext
  ) {
    const auction = await Auction.findOne(auctionId, {
      relations: ["seller", "bids", "bids.bidder", "bids.item"],
    });

    if (!auction) {
      throw new Error(invalidAuction);
    }

    if (auction.seller.id !== req.session.userId) {
      throw new Error(unauthorizedErrorMessage);
    }

    // if the winningBidId is not found in the list of bids
    const winningBidIndex = auction.bids.findIndex(bid => {
      return bid.id === winningBidId;
    });

    if (winningBidIndex === -1) {
      throw new Error(invalidWinningBidId);
    }

    // closing the auction and declaring the winner
    await Auction.update(auction.id, {
      dateUpdated: new Date(),
      status: "closed",
      winner: auction.bids[winningBidIndex].bidder,
    });

    await Bid.update(auction.bids[winningBidIndex].id, {
      won: true,
    });

    return await Auction.findOne(auction.id, {
      relations: auctionExposedRelations,
    });
  }
}
