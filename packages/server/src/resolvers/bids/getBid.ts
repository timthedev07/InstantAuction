import { Resolver, Query, UseMiddleware, Ctx, Arg } from "type-graphql";
import { bidExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";
import { Bid } from "../../entity/Bid";
import { NetworkingContext } from "../../types/NetworkingContext";
import { isAuthStrict } from "../../utils/isAuthMiddleware";

@Resolver()
export class GetBidResolver {
  @Query(() => Bid, { nullable: true })
  @UseMiddleware(isAuthStrict)
  async getBid(
    @Ctx() { req }: NetworkingContext,
    @Arg("auctionId") auctionId: string
  ) {
    const auction = await Auction.findOne(auctionId, {
      relations: ["bids", ...bidExposedRelations.map(each => "bids." + each)],
    });

    let resBid: Bid = undefined;
    for (const bid of auction.bids) {
      if (bid.bidder.id === req.session.userId) {
        resBid = bid;
      }
    }
    return resBid;
  }
}
