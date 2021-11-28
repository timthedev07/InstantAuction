import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { Auction } from "../../entity/Auction";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuth } from "../../utils/isAuthMiddleware";
import { AuctionsResponse } from "./allAuctions";

@Resolver(Auction)
export class AuctionsBidResolver {
  @Query(() => AuctionsResponse)
  @UseMiddleware(isAuth)
  async auctionsBid(@Ctx() { req }: NetworkingContext): Promise<
    AuctionsResponse
  > {
    const [auctions, count] = await Auction.findAndCount({
      relations: ["bids", "bids.bidder"],
      where: {
        "bids.bidder.id": req.session.userId,
      },
    });

    return {
      count,
      auctions,
    };
  }
}
