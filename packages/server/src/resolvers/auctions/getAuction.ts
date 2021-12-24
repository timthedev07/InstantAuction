import { Resolver, Query, Arg, Int } from "type-graphql";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";

@Resolver()
export class GetAuctionResolver {
  @Query(() => Auction)
  async getAuction(@Arg("auctionId", () => Int) auctionId: number) {
    return await Auction.findOne(auctionId, {
      relations: auctionExposedRelations,
    });
  }
}
