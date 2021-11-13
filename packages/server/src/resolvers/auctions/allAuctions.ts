import { Resolver, Query, ObjectType, Field, Int } from "type-graphql";
import { auctionExposedRelations } from "../../constants/exposed-relations";
import { Auction } from "../../entity/Auction";

@ObjectType()
export class AuctionsResponse {
  @Field(() => Int)
  count: number;

  @Field(() => [Auction])
  auctions: Auction[];
}

@Resolver()
export class AllAuctionsResolver {
  @Query(() => AuctionsResponse)
  async allAuctions(): Promise<AuctionsResponse> {
    const queryResult = await Auction.findAndCount({
      relations: auctionExposedRelations
    });
    // TODO: might need to add some filtering/sorting feature in the future
    return {
      auctions: queryResult[0],
      count: queryResult[1]
    };
  }
}
