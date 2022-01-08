import { Resolver, Query, Arg } from "type-graphql";
import {
  auctionExposedRelations,
  bidExposedRelations,
} from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";

@Resolver()
export class GetAuctionResolver {
  @Query(() => Auction, { nullable: true })
  async getAuction(@Arg("auctionId", () => String) auctionId: string) {
    return await Auction.findOne(auctionId, {
      relations: [
        ...auctionExposedRelations,
        "bids",
        ...bidExposedRelations.map(each => "bids." + each),
      ],
    });
  }
}
